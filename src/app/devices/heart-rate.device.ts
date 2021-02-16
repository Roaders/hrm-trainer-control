import { Injectable } from '@angular/core';
import { defer, merge, Observable, of } from 'rxjs';
import { filter, map, share, skipUntil, switchMap, takeUntil, tap } from 'rxjs/operators';

import { HeartRateResult, ProgressMessage } from '../contracts';
import {
    connectServer,
    deviceDisconnectionStream,
    getNotifications,
    getService,
    isProgressMessage,
    parseHeartRate,
    requestDevice,
    timeOutStream,
} from '../helpers';

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
                const updatesStream = this.subscribeToUpdates(server).pipe(share());

                const deviceDisconnection = deviceDisconnectionStream(server).pipe(share());

                const reconnectionStream = deviceDisconnection.pipe(
                    skipUntil(updatesStream.pipe(filter((v) => !isProgressMessage(v)))),
                    tap(() => console.log(`DEVICE DISCONNECTED`)),
                    switchMap(() => this.subscribeToUpdates(server)),
                );

                return merge(updatesStream.pipe(takeUntil(deviceDisconnection)), reconnectionStream);
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

            const updatesStream: Observable<HeartRateResult | ProgressMessage> = connectServer(server).pipe(
                switchMap((v) => (isProgressMessage(v) ? of(v) : getService(v, 'heart_rate'))),
                switchMap((v) => (isProgressMessage(v) ? of(v) : v.getCharacteristic('heart_rate_measurement'))),
                tap((v) => {
                    if (!isProgressMessage(v)) {
                        this.characteristic = v;
                    }
                }),
                switchMap((v) => (isProgressMessage(v) ? of(v) : getNotifications(v))),
                map((v) => (isProgressMessage(v) ? v : parseHeartRate(v))),
                share(),
            );

            return merge(
                updatesStream,
                timeOutStream<HeartRateResult>(60000).pipe(
                    takeUntil(updatesStream.pipe(filter((v) => !isProgressMessage(v)))),
                ),
            );
        });
    }
}
