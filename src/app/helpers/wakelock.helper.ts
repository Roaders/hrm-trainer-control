import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { ProgressMessage } from '../contracts';
import { createProgress } from './messages.helper';
import { isProgressMessage } from './type-guards.helper';

export function maintainWakeLock(): Observable<ProgressMessage> {
    return requestWakeLock().pipe(
        switchMap((v) => (isProgressMessage(v) ? of(v) : listenForRelease(v))),
        switchMap((v) => (isProgressMessage(v) ? of(v) : requestWakeLock())),
        filter(isProgressMessage),
    );
}

function requestWakeLock(): Observable<WakeLockSentinel | ProgressMessage> {
    return new Observable((observer) => {
        let _sentinel: WakeLockSentinel | undefined;

        navigator.wakeLock.request('screen').then(
            (sentinel) => {
                observer.next(createProgress('Wake Lock Obtained', sentinel));
                _sentinel = sentinel;
                observer.next(sentinel);
            },
            (error) => observer.error(error),
        );

        return {
            unsubscribe: () => {
                if (_sentinel != null) {
                    console.log(`Releasing wakelock`);
                    _sentinel.release();
                }
            },
        };
    });
}

function listenForRelease(sentinel: WakeLockSentinel): Observable<Event | ProgressMessage> {
    return new Observable((observer) => {
        observer.next({ type: 'progressMessage', message: 'Listening for wake lock release' });
        sentinel.addEventListener('onrelease', (event) => {
            observer.next({ type: 'progressMessage', message: 'Wake Lock Released' });
            console.log(`Wake Lock Released`);
            observer.next(event);
        });
    });
}
