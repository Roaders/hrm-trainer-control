import { Injectable } from '@angular/core';
import { defer, merge, Observable, of } from 'rxjs';
import { map, share, skipUntil, switchMap, takeUntil, tap } from 'rxjs/operators';

import { HeartRateResult, ProgressMessage } from '../contracts';
import { isProgressMessage, parseHeartRate } from '../helpers';
import {
    connectServer,
    deviceDisconnectionStream,
    getNotifications,
    getService,
    requestDevice,
    timeOutStream,
} from '../helpers/bluetooth.helper';

@Injectable()
export class HeartRateDevice {
    private server?: BluetoothRemoteGATTServer;
    private characteristic?: BluetoothRemoteGATTCharacteristic;

    public connect(): Observable<HeartRateResult | ProgressMessage> {
        return requestDevice(['heart_rate']).pipe(
            switchMap((server) => {
                if (isProgressMessage(server)) {
                    return of(server);
                }

                console.log(`DEVICE CONNECTED`);
                const updatesStream = this.subscribeToUpdates(server).pipe(
                    tap(() => console.log(`UPDATE`)),
                    share(),
                );

                const reconnectionStream = deviceDisconnectionStream(server).pipe(
                    skipUntil(updatesStream),
                    tap(() => console.log(`DEVICE DISCONNECTED`)),
                    switchMap(() => this.subscribeToUpdates(server)),
                    share(),
                );

                return merge(updatesStream.pipe(takeUntil(reconnectionStream)), reconnectionStream);
            }),
        );
    }

    public async disconnect(): Promise<boolean> {
        if (this.characteristic != null && this.server?.connected) {
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

    private subscribeToUpdates(server: BluetoothRemoteGATTServer): Observable<HeartRateResult | ProgressMessage> {
        return defer(() => {
            console.log(`HeartRateDevice.subscribeToUpdates`);
            this.server = server;

            const updatesStream = connectServer(server).pipe(
                switchMap((data) => (isProgressMessage(data) ? of(data) : getService(data, 'heart_rate'))),
                switchMap((data) =>
                    isProgressMessage(data) ? of(data) : data.getCharacteristic('heart_rate_measurement'),
                ),
                tap((data) => {
                    if (!isProgressMessage(data)) {
                        this.characteristic = data;
                    }
                }),
                switchMap((data) => (isProgressMessage(data) ? of(data) : getNotifications(data))),
                map((data) => (isProgressMessage(data) ? data : parseHeartRate(data))),
                share(),
            );

            return merge(timeOutStream<HeartRateResult>(60000).pipe(takeUntil(updatesStream)), updatesStream);
        });
    }
}
