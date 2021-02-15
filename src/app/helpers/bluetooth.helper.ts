import { from, interval, merge, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { ProgressMessage } from '../contracts';

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

    const progressMessage: ProgressMessage = { message: 'Requesting Device...', type: 'progressMessage' };

    return merge(of(progressMessage), requestStream);
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
        console.log(`Connecting to server...`);
        server.connect().then(
            () => {
                console.log(`Server Connected`, server);
                observer.next(server);
            },
            (error) => observer.error(error),
        );

        observer.next({ message: 'Connecting to Server...', type: 'progressMessage' });

        return {
            unsubscribe: () => {
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
            console.log(`Error getting service: '${service}'`, server, err);
            if (!server.connected) {
                return connectServer(server, retries + 1).pipe(
                    switchMap(() => getService(server, service, retries + 1)),
                );
            } else if (retries < 3) {
                return getService(server, service, retries + 1);
            } else {
                throw err;
            }
        }),
    );

    const progressMessage: ProgressMessage = { message: 'Getting Service...', type: 'progressMessage' };

    return merge(of(progressMessage), getServiceStream);
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
