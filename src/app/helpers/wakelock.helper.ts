import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Logger } from './logger';

@Injectable()
export class WakelockHelper {
    constructor(private logger: Logger) {}

    public maintainWakeLock(): Observable<WakeLockSentinel> {
        return this.requestWakeLock().pipe(
            switchMap((v) => this.listenForRelease(v)),
            switchMap(() => this.requestWakeLock()),
        );
    }

    private requestWakeLock(): Observable<WakeLockSentinel> {
        return new Observable((observer) => {
            let _sentinel: WakeLockSentinel | undefined;

            navigator.wakeLock.request('screen').then(
                (sentinel) => {
                    this.logger.info('Wake Lock Obtained', sentinel);
                    _sentinel = sentinel;
                    observer.next(sentinel);
                },
                (error) => observer.error(error),
            );

            return {
                unsubscribe: () => {
                    if (_sentinel != null) {
                        this.logger.info(`Releasing wakelock`);
                        _sentinel.release();
                    }
                },
            };
        });
    }

    private listenForRelease(sentinel: WakeLockSentinel): Observable<Event> {
        return new Observable((observer) => {
            this.logger.info(`Listening for wake lock release`);

            sentinel.addEventListener('onrelease', (event) => {
                this.logger.warn(`Wake Lock Released`);
                observer.next(event);
            });
        });
    }
}
