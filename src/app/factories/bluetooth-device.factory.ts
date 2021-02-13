import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { HeartRateResult } from '../contracts';
import { parseHeartRate } from '../helpers';
import { connectServer, getNotifications, getService, requestDevice } from '../helpers/bluetooth.helper';

@Injectable()
export class BluetoothDeviceFactory {
    public create(): HeartRateSensor {
        return new HeartRateSensor();
    }
}

export class HeartRateSensor {
    private server?: BluetoothRemoteGATTServer;
    private characteristic?: BluetoothRemoteGATTCharacteristic;

    public connect(): Observable<HeartRateResult> {
        return requestDevice(['heart_rate']).pipe(
            tap(({ server }) => {
                this.server = server;
            }),
            map(({ server }) => server),
            switchMap(connectServer),
            switchMap((server) => getService(server, 'heart_rate')),
            switchMap((service) => service.getCharacteristic('heart_rate_measurement')),
            tap((characteristic) => {
                this.characteristic = characteristic;
            }),
            switchMap((characteristic) => getNotifications(characteristic)),
            map(parseHeartRate),
        );
    }

    public async disconnect(): Promise<boolean> {
        if (this.characteristic != null) {
            console.log(`Stopping notifications`, this.characteristic);
            try {
                await this.characteristic.stopNotifications();
            } catch (e) {
                console.log(`Error stopping notifications: `, e);
            }
        }

        if (this.server) {
            console.log(`Stopping server`, this.server);
            this.server.disconnect();
        }

        this.server = undefined;
        this.characteristic = undefined;

        return true;
    }
}
