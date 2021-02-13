import { Injectable } from '@angular/core';
import { combineLatest, from, Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { SensorLocation } from '../contracts';
import { isDataView } from '../helpers';

@Injectable()
export class BluetoothDeviceFactory {
    public create(): HeartRateSensor {
        return new HeartRateSensor();
    }
}

const retryCount = 3;

function requestDevice(
    services: [BluetoothServiceUUID, ...BluetoothServiceUUID[]],
    retries = 0,
): Observable<BluetoothRemoteGATTServer> {
    console.log(`requestDevice(${retries})...`, services);
    return from(navigator.bluetooth.requestDevice({ filters: [{ services }] })).pipe(
        tap((device) => console.log(`Device Connected:`, device.name)),
        map((device) => {
            if (device.gatt == null) {
                throw new Error(`gatt is not defined on device`);
            }
            return device.gatt;
        }),
        catchError((err) => {
            console.log(`Error connecting to device`, err);
            if (retries < retryCount) {
                return requestDevice(services, ++retries);
            } else {
                throw err;
            }
        }),
    );
}

function connectServer(server: BluetoothRemoteGATTServer, retries = 0): Observable<BluetoothRemoteGATTServer> {
    console.log(`connectServer(${retries})...`);
    return from(server.connect()).pipe(
        tap(() => console.log(`Server Connected`)),
        catchError((err) => {
            console.log(`Error connecting to server`, err);
            if (retries < retryCount) {
                return connectServer(server, ++retries);
            } else {
                throw err;
            }
        }),
    );
}

function getService(
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
                return connectServer(server).pipe(mergeMap(() => getService(server, service)));
            } else if (retries < 0) {
                return getService(server, service, ++retries);
            } else {
                throw err;
            }
        }),
    );
}

export class HeartRateSensor {
    private device?: BluetoothDevice;
    private server?: BluetoothRemoteGATTServer;
    private _characteristics = new Map<string, BluetoothRemoteGATTCharacteristic>();

    public connect(): Promise<boolean> {
        return requestDevice(['heart_rate'])
            .pipe(
                switchMap(connectServer),
                switchMap((server) => getService(server, 'heart_rate')),
                switchMap((service) =>
                    combineLatest([
                        from(this._cacheCharacteristic(service, 'body_sensor_location')),
                        from(this._cacheCharacteristic(service, 'heart_rate_measurement')),
                    ]),
                ),
                map(() => true),
            )
            .toPromise();
    }

    /* Heart Rate Service */

    public getBodySensorLocation(): Promise<SensorLocation> {
        return this._readCharacteristicValue('body_sensor_location').then((data: DataView) => {
            console.log(`getBodySensorLocation: `, data);

            const sensorLocation = data.getUint8(0);
            switch (sensorLocation) {
                case 0:
                    return 'Other';
                case 1:
                    return 'Chest';
                case 2:
                    return 'Wrist';
                case 3:
                    return 'Finger';
                case 4:
                    return 'Hand';
                case 5:
                    return 'Ear Lobe';
                case 6:
                    return 'Foot';
                default:
                    return 'Unknown';
            }
        });
    }

    public startNotificationsHeartRateMeasurement(): Promise<BluetoothRemoteGATTCharacteristic> {
        return this._startNotifications('heart_rate_measurement');
    }

    public stopNotificationsHeartRateMeasurement(): Promise<BluetoothRemoteGATTCharacteristic> {
        return this._stopNotifications('heart_rate_measurement');
    }

    /* Utils */

    private _cacheCharacteristic(service: BluetoothRemoteGATTService, characteristicUuid: string): Promise<void> {
        return service.getCharacteristic(characteristicUuid).then((characteristic) => {
            console.log(`Characteristic`, characteristicUuid, characteristic);
            this._characteristics.set(characteristicUuid, characteristic);
        });
    }

    private _readCharacteristicValue(characteristicUuid: string): Promise<DataView> {
        const characteristic = this._characteristics.get(characteristicUuid);

        if (characteristic == null) {
            throw new Error(`Could not read charactersitc '${characteristicUuid}'`);
        }

        return characteristic.readValue().then((value) => {
            value = isDataView(value) ? value : new DataView(value);
            return value;
        });
    }

    private _writeCharacteristicValue(characteristicUuid: string, value: BufferSource): Promise<void> {
        const characteristic = this._characteristics.get(characteristicUuid);

        if (characteristic == null) {
            throw new Error(`Could not find charactersitc '${characteristicUuid}'`);
        }

        return characteristic.writeValue(value);
    }

    private _startNotifications(characteristicUuid: string): Promise<BluetoothRemoteGATTCharacteristic> {
        const characteristic = this._characteristics.get(characteristicUuid);

        if (characteristic == null) {
            throw new Error(`Could not find charactersitc '${characteristicUuid}'`);
        }

        // Returns characteristic to set up characteristicvaluechanged event
        // handlers in the resolved promise.
        return characteristic.startNotifications().then(() => characteristic);
    }

    private _stopNotifications(characteristicUuid: string): Promise<BluetoothRemoteGATTCharacteristic> {
        const characteristic = this._characteristics.get(characteristicUuid);

        if (characteristic == null) {
            throw new Error(`Could not find charactersitc '${characteristicUuid}'`);
        }

        // Returns characteristic to remove characteristicvaluechanged event
        // handlers in the resolved promise.
        return characteristic.stopNotifications().then(() => characteristic);
    }
}
