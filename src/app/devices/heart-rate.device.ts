import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, share, switchMap, takeUntil, tap } from 'rxjs/operators';

import { HeartRateResult } from '../contracts';
import { parseHeartRate } from '../helpers';
import { connectServer, getNotifications, getService, requestDevice, timeOutStream } from '../helpers/bluetooth.helper';

@Injectable()
export class HeartRateDevice {
    private server?: BluetoothRemoteGATTServer;
    private characteristic?: BluetoothRemoteGATTCharacteristic;

    public connect(): Observable<HeartRateResult> {
        return requestDevice(['heart_rate']).pipe(switchMap((server) => this.subscribeToUpdates(server)));
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

    private subscribeToUpdates(server: BluetoothRemoteGATTServer) {
        this.server = server;

        const updatesStream = connectServer(server).pipe(
            switchMap((server) => getService(server, 'heart_rate')),
            switchMap((service) => service.getCharacteristic('heart_rate_measurement')),
            tap((characteristic) => {
                this.characteristic = characteristic;
            }),
            switchMap((characteristic) => getNotifications(characteristic)),
            map(parseHeartRate),
            share(),
        );

        return merge(timeOutStream<HeartRateResult>(60000).pipe(takeUntil(updatesStream)), updatesStream);
    }
}
