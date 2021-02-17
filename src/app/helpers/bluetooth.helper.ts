import { from, interval, merge, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';

import { ProgressMessage } from '../contracts';
import { createProgress } from './messages.helper';
import { isProgressMessage } from './type-guards.helper';

const retryCount = 5;

export function requestDevice(
    services: [BluetoothServiceUUID, ...BluetoothServiceUUID[]],
    retries = 0,
): Observable<BluetoothDevice | ProgressMessage> {
    const requestStream = from(navigator.bluetooth.requestDevice({ filters: [{ services }] })).pipe(
        mergeMap((device) => merge(of(createProgress(`Device Selected: ${device.name}`, device)), of(device))),
        catchError((err) => {
            if (retries >= retryCount || err.name === 'NotFoundError') {
                throw err;
            } else {
                return merge(of(createProgress(`Error selecting device`, err)), requestDevice(services, retries + 1));
            }
        }),
    );

    return merge(of(createProgress('Requesting Device...', services)), requestStream);
}

export function connectServer(
    device: BluetoothDevice,
    retries = 0,
): Observable<BluetoothRemoteGATTServer | ProgressMessage> {
    if (device.gatt == null) {
        throw new Error(`gatt is not defined on device`);
    }

    const server = device.gatt;

    return new Observable<BluetoothRemoteGATTServer | ProgressMessage>((observer) => {
        let unsubscribed = false;
        observer.next(createProgress(`Connecting to Server...`));

        server.connect().then(
            () => {
                if (unsubscribed) {
                    server.disconnect();
                } else {
                    observer.next(createProgress(`Server Connected...`, server));
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
            if (retries < retryCount) {
                return merge(of(createProgress(`Error connecting to server`, err)), connectServer(device, retries + 1));
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
    console.log(`getService ${service}`, server);

    const getServiceStream = from(server.getPrimaryService(service)).pipe(
        mergeMap((service) => merge(of(createProgress(`Service Connected`, service)), of(service))),
        catchError((err) => {
            let returnObservable: Observable<BluetoothRemoteGATTService | ProgressMessage>;

            if (!server.connected) {
                returnObservable = connectServer(server.device, retries + 1).pipe(
                    switchMap((v) => (isProgressMessage(v) ? of(v) : getService(server, service, retries + 1))),
                );
            } else if (retries < 3) {
                returnObservable = getService(server, service, retries + 1);
            } else {
                throw err;
            }

            return merge(of(createProgress(`Error getting service '${service}' (${retries})`, err)), returnObservable);
        }),
    );

    return merge(of(createProgress(`Getting Service '${service}'...`, server)), getServiceStream);
}

export function getNotifications(
    characteristic: BluetoothRemoteGATTCharacteristic,
): Observable<DataView | ProgressMessage> {
    characteristic.startNotifications();

    return new Observable((observer) => {
        function handleEvent() {
            if (characteristic.value != null) {
                observer.next(characteristic.value);
            }
        }
        observer.next(createProgress(`Starting Notifications`, characteristic));
        characteristic.addEventListener('characteristicvaluechanged', handleEvent);

        return {
            unsubscribe: () => {
                characteristic.removeEventListener('characteristicvaluechanged', handleEvent);
            },
        };
    });
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

export function deviceDisconnectionStream(device: BluetoothDevice): Observable<BluetoothDevice | ProgressMessage> {
    return new Observable<BluetoothDevice | ProgressMessage>((observer) => {
        function handleEvent() {
            observer.next(device);
        }

        observer.next(createProgress(`Add event listener: gattserverdisconnected`, device));
        device.addEventListener('gattserverdisconnected', handleEvent);

        return {
            unsubscribe: () => {
                console.log(`Remove Event Listener: gattserverdisconnected`);
                device.removeEventListener('gattserverdisconnected', handleEvent);
            },
        };
    });
}

export function handleProgress<T, R>(
    func: (value: T) => Observable<R>,
): (value: T | ProgressMessage) => Observable<R | ProgressMessage> {
    return (value: T | ProgressMessage) => {
        if (isProgressMessage(value)) {
            return of(value);
        }

        return func(value);
    };
}
