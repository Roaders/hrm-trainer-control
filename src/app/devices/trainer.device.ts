import { Injectable } from '@angular/core';
import { defer, EMPTY, merge, Observable, of } from 'rxjs';
import { filter, mergeMap, share, skipUntil, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ProgressMessage, TrainerResult } from '../contracts';
import {
    connectServer,
    deviceDisconnectionStream,
    getService,
    isProgressMessage,
    requestDevice,
    timeOutStream,
} from '../helpers';

// const serviceUUID = 'a026ee07-0a7d-4ab3-97fa-f1500f9feb8b'; // wahoo equipment service
// const characteristicUUID = 'a026e01e-0a7d-4ab3-97faf1500f9feb8b'; // wahoo equipment state

const services: [BluetoothServiceUUID, ...BluetoothServiceUUID[]] = [
    `a026ee01-0a7d-4ab3-97fa-f1500f9feb8b`,
    `a026ee03-0a7d-4ab3-97fa-f1500f9feb8b`,
    `a026ee0b-0a7d-4ab3-97fa-f1500f9feb8b`,
    `a026ee06-0a7d-4ab3-97fa-f1500f9feb8b`,
];

@Injectable()
export class TrainerDevice {
    private server?: BluetoothRemoteGATTServer;
    private characteristic?: BluetoothRemoteGATTCharacteristic;

    public connect(): Observable<TrainerResult | ProgressMessage> {
        return requestDevice(services).pipe(
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

    private subscribeToUpdates(server: BluetoothRemoteGATTServer): Observable<TrainerResult | ProgressMessage> {
        return defer(() => {
            console.log(`HeartRateDevice.subscribeToUpdates`);
            this.server = server;

            const updatesStream: Observable<TrainerResult | ProgressMessage> = connectServer(server).pipe(
                switchMap((server) => {
                    if (isProgressMessage(server)) {
                        return of(server);
                    }

                    return merge(
                        services.map((serviceUUID) =>
                            getService(server, serviceUUID).pipe(
                                tap((service) => console.log(`SERVICE CONNECTED ${serviceUUID}`, service)),
                            ),
                        ),
                    ).pipe(mergeMap(() => EMPTY));
                }),
                // switchMap((v) => (isProgressMessage(v) ? of(v) : v.getCharacteristic(characteristicUUID))),
                // tap((v) => {
                //     if (!isProgressMessage(v)) {
                //         this.characteristic = v;
                //     }
                // }),
                // switchMap((v) => (isProgressMessage(v) ? of(v) : getNotifications(v))),
                // map((v) => (isProgressMessage(v) ? v : parseTrainerData(v))),
                share(),
            );

            return merge(
                updatesStream,
                timeOutStream<TrainerResult>(60000).pipe(
                    takeUntil(updatesStream.pipe(filter((v) => !isProgressMessage(v)))),
                ),
            );
        });
    }
}
