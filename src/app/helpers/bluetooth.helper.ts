import { from, interval, merge, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { ProgressMessage } from '../contracts';
import { createProgress } from './messages.helper';
import { isProgressMessage } from './type-guards.helper';

const retryCount = 5;

export function requestDevice(
    services: [BluetoothServiceUUID, ...BluetoothServiceUUID[]],
    retries = 0,
): Observable<BluetoothRemoteGATTServer | ProgressMessage> {
    console.log(`requestDevice(${retries})...`, services);
    const requestStream = from(navigator.bluetooth.requestDevice({ filters: [{ services }] })).pipe(
        tap((device) => console.log(`Device Selected:`, device.name)),
        map((device) => {
            if (device.gatt == null) {
                throw new Error(`gatt is not defined on device`);
            }
            return device.gatt;
        }),
        catchError((err) => {
            console.log(`Error selecting device`, err);
            if (retries >= retryCount || err.name === 'NotFoundError') {
                throw err;
            } else {
                return requestDevice(services, retries + 1);
            }
        }),
    );

    return merge(of(createProgress('Requesting Device...')), requestStream);
}

export function timeOutStream<T>(timeInMs: number): Observable<T> {
    console.log(`Starting timeout...`, timeInMs);

    return interval(timeInMs).pipe(
        take(1),
        map(() => {
            throw new Error(`Timeout waiting for device connection.`);
        }),
    );
}

export function deviceDisconnectionStream(server: BluetoothRemoteGATTServer): Observable<BluetoothRemoteGATTServer> {
    return new Observable<BluetoothRemoteGATTServer>((observer) => {
        function handleEvent(event: Event) {
            console.log(`Gatt server disconnected`, event);
            observer.next(server);
        }
        console.log(`Add event listener: gattserverdisconnected`);
        server.device.addEventListener('gattserverdisconnected', handleEvent);

        return {
            unsubscribe: () => {
                console.log(`Remove Event Listener: gattserverdisconnected`);
                server.device.removeEventListener('gattserverdisconnected', handleEvent);
            },
        };
    });
}

export function connectServer(
    server: BluetoothRemoteGATTServer,
    retries = 0,
): Observable<BluetoothRemoteGATTServer | ProgressMessage> {
    console.log(`connectServer(${retries})...`);

    return new Observable<BluetoothRemoteGATTServer | ProgressMessage>((observer) => {
        let unsubscribed = false;
        observer.next(createProgress(`Connecting to Server...`));

        server.connect().then(
            () => {
                console.log(`Server Connected (unsubscribed: ${unsubscribed})`, server);
                if (unsubscribed) {
                    server.disconnect();
                } else {
                    observer.next(server);
                }
            },
            (error) => observer.error(error),
        );

        return {
            unsubscribe: () => {
                unsubscribed = true;
                if (server.connected) {
                    console.log(`connectServer.unsubscribe: Disconnecting from server...`, server);
                    server.disconnect();
                } else {
                    console.log(`connectServer.unsubscribe: Server already disconnected`, server);
                }
            },
        };
    }).pipe(
        catchError((err) => {
            console.log(`Error connecting to server`, err);
            if (retries < retryCount) {
                return connectServer(server, retries + 1);
            } else {
                throw err;
            }
        }),
    );
}

export function getService(
    server: BluetoothRemoteGATTServer,
    service: BluetoothServiceUUID,
    retries = 0,
): Observable<BluetoothRemoteGATTService | ProgressMessage> {
    console.log(`getService(${retries}) '${service}'...`, server);

    const getServiceStream = from(server.getPrimaryService(service)).pipe(
        tap(() => console.log(`Service returned`)),
        catchError((err) => {
            console.log(`Error getting service: '${service}' (${retries})`, server, err);
            if (!server.connected) {
                return connectServer(server, retries + 1).pipe(
                    switchMap((v) => (isProgressMessage(v) ? of(v) : getService(server, service, retries + 1))),
                );
            } else if (retries < 3) {
                return getService(server, service, retries + 1);
            } else {
                throw err;
            }
        }),
    );

    return merge(of(createProgress('Getting Service...')), getServiceStream);
}

export function getNotifications(characteristic: BluetoothRemoteGATTCharacteristic): Observable<DataView> {
    console.log(`starting notifications`, characteristic);
    characteristic.startNotifications();

    return new Observable((observer) => {
        function handleEvent() {
            if (characteristic.value != null) {
                observer.next(characteristic.value);
            }
        }
        characteristic.addEventListener('characteristicvaluechanged', handleEvent);

        return {
            unsubscribe: () => {
                characteristic.removeEventListener('characteristicvaluechanged', handleEvent);
            },
        };
    });
}
