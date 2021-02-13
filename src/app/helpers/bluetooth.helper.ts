import { from, Observable } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

const retryCount = 3;

export function requestDevice(
    services: [BluetoothServiceUUID, ...BluetoothServiceUUID[]],
    retries = 0,
): Observable<{ device: BluetoothDevice; server: BluetoothRemoteGATTServer }> {
    console.log(`requestDevice(${retries})...`, services);
    return from(navigator.bluetooth.requestDevice({ filters: [{ services }] })).pipe(
        tap((device) => console.log(`Device Connected:`, device.name)),
        map((device) => {
            if (device.gatt == null) {
                throw new Error(`gatt is not defined on device`);
            }
            return { device, server: device.gatt };
        }),
        catchError((err) => {
            console.log(`Error connecting to device`, err);
            if (retries >= retryCount || err.name === 'NotFoundError') {
                throw err;
            } else {
                return requestDevice(services, retries + 1);
            }
        }),
    );
}

export function connectServer(server: BluetoothRemoteGATTServer, retries = 0): Observable<BluetoothRemoteGATTServer> {
    console.log(`connectServer(${retries})...`);
    return from(server.connect()).pipe(
        tap(() => console.log(`Server Connected`)),
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
): Observable<BluetoothRemoteGATTService> {
    console.log(`getService(${retries}) '${service}'...`, server);
    return from(server.getPrimaryService(service)).pipe(
        tap(() => console.log(`Service returned`)),
        catchError((err) => {
            console.log(`Error getting service: '${service}'`, server, err);
            if (!server.connected) {
                return connectServer(server, retries + 1).pipe(
                    mergeMap(() => getService(server, service, retries + 1)),
                );
            } else if (retries < 3) {
                return getService(server, service, retries + 1);
            } else {
                throw err;
            }
        }),
    );
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
