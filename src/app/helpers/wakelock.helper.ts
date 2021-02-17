import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { createProgress } from './messages.helper';

export function maintainWakeLock(): Observable<WakeLockSentinel> {
    return requestWakeLock().pipe(
        switchMap((v) => listenForRelease(v)),
        switchMap(() => requestWakeLock()),
    );
}

function requestWakeLock(): Observable<WakeLockSentinel> {
    return new Observable((observer) => {
        let _sentinel: WakeLockSentinel | undefined;

        navigator.wakeLock.request('screen').then(
            (sentinel) => {
                createProgress('Wake Lock Obtained', sentinel);
                _sentinel = sentinel;
                observer.next(sentinel);
            },
            (error) => observer.error(error),
        );

        return {
            unsubscribe: () => {
                if (_sentinel != null) {
                    createProgress(`Releasing wakelock`);
                    _sentinel.release();
                }
            },
        };
    });
}

function listenForRelease(sentinel: WakeLockSentinel): Observable<Event> {
    return new Observable((observer) => {
        createProgress(`Listening for wake lock release`);

        sentinel.addEventListener('onrelease', (event) => {
            createProgress(`Wake Lock Released`);
            observer.next(event);
        });
    });
}
