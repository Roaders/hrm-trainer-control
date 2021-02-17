import { Injectable } from '@angular/core';
import { from, merge, Observable, of } from 'rxjs';
import { filter, map, mergeMap, share, switchMap, takeUntil, tap } from 'rxjs/operators';

import { HeartRateResult, ProgressMessage } from '../contracts';
import {
    connectServer,
    deviceDisconnectionStream,
    getNotifications,
    getService,
    handleProgress,
    HEART_RATE_CHARACTERISTIC,
    HEART_RATE_SERVICE,
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
        return requestDevice([HEART_RATE_SERVICE]).pipe(
            mergeMap(
                handleProgress((device) => {
                    const updatesStream = this.subscribeToUpdates(device).pipe(share());

                    return merge(
                        updatesStream,
                        timeOutStream<HeartRateResult>(60000).pipe(
                            takeUntil(updatesStream.pipe(filter((v) => !isProgressMessage(v)))),
                        ),
                    );
                }),
            ),
        );
    }

    public async disconnect(): Promise<boolean> {
        if (this.characteristic != null && this.server?.connected) {
            try {
                await this.characteristic.stopNotifications();
            } catch (e) {
                console.log(`Error stopping notifications: `, e);
            }
        }

        if (this.server) {
            this.server.disconnect();
        }

        this.server = undefined;
        this.characteristic = undefined;

        return true;
    }

    private subscribeToUpdates(device: BluetoothDevice) {
        return merge(of(device), deviceDisconnectionStream(device)).pipe(
            switchMap(handleProgress((device) => connectServer(device))),
            switchMap(handleProgress((server) => getService(server, HEART_RATE_SERVICE))),
            switchMap(handleProgress((service) => from(service.getCharacteristic(HEART_RATE_CHARACTERISTIC)))),
            tap((value) => {
                if (!isProgressMessage(value)) {
                    this.characteristic = value;
                }
            }),
            switchMap(handleProgress((characteristic) => getNotifications(characteristic))),
            map((data) => (isProgressMessage(data) ? data : parseHeartRate(data))),
        );
    }
}
