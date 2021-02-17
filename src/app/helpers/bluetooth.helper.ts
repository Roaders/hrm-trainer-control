import { Injectable } from '@angular/core';
import { from, interval, Observable } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { createProgress } from './messages.helper';

@Injectable()
export class BluetoothHelper {
    public requestDevice(
        services: [BluetoothServiceUUID, ...BluetoothServiceUUID[]],
        maxRetries = 5,
        retries = 0,
    ): Observable<BluetoothDevice> {
        createProgress('Requesting Device...', services);
        const requestStream = from(navigator.bluetooth.requestDevice({ filters: [{ services }] })).pipe(
            tap((device) => createProgress(`Device Selected: ${device.name}`, device)),
            catchError((err) => {
                if (retries >= maxRetries || err.name === 'NotFoundError') {
                    throw err;
                } else {
                    createProgress(`Error selecting device`, err);
                    return this.requestDevice(services, maxRetries, retries + 1);
                }
            }),
        );

        return requestStream;
    }

    public connectServer(device: BluetoothDevice, maxRetries = 5, retries = 0): Observable<BluetoothRemoteGATTServer> {
        if (device.gatt == null) {
            throw new Error(`gatt is not defined on device`);
        }

        const server = device.gatt;

        return new Observable<BluetoothRemoteGATTServer>((observer) => {
            let unsubscribed = false;
            createProgress(`Connecting to Server...`);

            server.connect().then(
                () => {
                    if (unsubscribed) {
                        server.disconnect();
                    } else {
                        createProgress(`Server Connected...`, server);
                        observer.next(server);
                    }
                },
                (error) => observer.error(error),
            );

            return {
                unsubscribe: () => {
                    unsubscribed = true;
                    if (server.connected) {
                        createProgress(`connectServer.unsubscribe: Disconnecting from server...`, server);
                        server.disconnect();
                    } else {
                        createProgress(`connectServer.unsubscribe: Server already disconnected`, server);
                    }
                },
            };
        }).pipe(
            catchError((err) => {
                if (retries < maxRetries) {
                    createProgress(`Error connecting to server`, err);
                    return this.connectServer(device, maxRetries, retries + 1);
                } else {
                    throw err;
                }
            }),
        );
    }

    public getService(
        server: BluetoothRemoteGATTServer,
        service: BluetoothServiceUUID,
        maxRetries = 5,
        retries = 0,
    ): Observable<BluetoothRemoteGATTService> {
        createProgress(`Getting Service '${service}'...`, server);

        return from(server.getPrimaryService(service)).pipe(
            tap((service) => createProgress(`Service Connected`, service)),
            catchError((err) => {
                createProgress(`Error getting service '${service}' (${retries})`, err);

                if (!server.connected) {
                    return this.connectServer(server.device, maxRetries, retries + 1).pipe(
                        switchMap((newConnectionServer) =>
                            this.getService(newConnectionServer, service, maxRetries, retries + 1),
                        ),
                    );
                } else if (retries < maxRetries) {
                    return this.getService(server, service, maxRetries, retries + 1);
                } else {
                    throw err;
                }
            }),
        );
    }

    public getNotifications(characteristic: BluetoothRemoteGATTCharacteristic): Observable<DataView> {
        characteristic.startNotifications();

        return new Observable((observer) => {
            function handleEvent() {
                if (characteristic.value != null) {
                    observer.next(characteristic.value);
                }
            }
            createProgress(`Starting Notifications`, characteristic);
            characteristic.addEventListener('characteristicvaluechanged', handleEvent);

            return {
                unsubscribe: () => {
                    characteristic.removeEventListener('characteristicvaluechanged', handleEvent);
                },
            };
        });
    }

    public createTimeOutStream<T>(timeInMs: number): Observable<T> {
        createProgress(`Starting timeout...`, timeInMs);

        return interval(timeInMs).pipe(
            take(1),
            map(() => {
                throw new Error(`Timeout waiting for device connection.`);
            }),
        );
    }

    public createDeviceDisconnectionStream(device: BluetoothDevice): Observable<BluetoothDevice> {
        return new Observable<BluetoothDevice>((observer) => {
            function handleEvent() {
                createProgress(`Device '${device.name}' disconnected`, device);
                observer.next(device);
            }
            createProgress(`Add event listener: gattserverdisconnected`, device);
            device.addEventListener('gattserverdisconnected', handleEvent);

            return {
                unsubscribe: () => {
                    createProgress(`Remove Event Listener: gattserverdisconnected`);
                    device.removeEventListener('gattserverdisconnected', handleEvent);
                },
            };
        });
    }
}
