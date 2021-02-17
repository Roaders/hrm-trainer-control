import { Injectable } from '@angular/core';
import { from, merge, Observable, of } from 'rxjs';
import { filter, map, mergeMap, share, switchMap, takeUntil, tap } from 'rxjs/operators';

import { HeartRateResult } from '../contracts';
import {
    connectServer,
    deviceDisconnectionStream,
    getNotifications,
    getService,
    HEART_RATE_CHARACTERISTIC,
    HEART_RATE_SERVICE,
    parseHeartRate,
    requestDevice,
    timeOutStream,
} from '../helpers';
import { createProgress } from '../helpers/messages.helper';

@Injectable()
export class HeartRateDevice {
    private server?: BluetoothRemoteGATTServer;
    private characteristic?: BluetoothRemoteGATTCharacteristic;

    public connect(connectionRetries = 5): Observable<HeartRateResult> {
        return requestDevice([HEART_RATE_SERVICE]).pipe(
            mergeMap((device) => {
                const updatesStream = this.subscribeToUpdates(device, connectionRetries).pipe(share());

                return merge(updatesStream, timeOutStream<HeartRateResult>(60000).pipe(takeUntil(updatesStream)));
            }),
        );
    }

    public async disconnect(): Promise<boolean> {
        if (this.characteristic != null && this.server?.connected) {
            try {
                await this.characteristic.stopNotifications();
            } catch (e) {
                createProgress(`Error stopping notifications: `, e);
            }
        }

        if (this.server) {
            this.server.disconnect();
        }

        this.server = undefined;
        this.characteristic = undefined;

        return true;
    }

    private subscribeToUpdates(device: BluetoothDevice, connectionRetries: number): Observable<HeartRateResult> {
        let retries = 0;

        return merge(of(device), deviceDisconnectionStream(device)).pipe(
            filter(() => retries++ < connectionRetries),
            switchMap((device) => connectServer(device)),
            switchMap((server) => getService(server, HEART_RATE_SERVICE)),
            switchMap((service) => from(service.getCharacteristic(HEART_RATE_CHARACTERISTIC))),
            tap((value) => (this.characteristic = value)),
            switchMap((characteristic) => getNotifications(characteristic)),
            tap(() => (retries = 0)),
            map((data) => parseHeartRate(data)),
        );
    }
}
