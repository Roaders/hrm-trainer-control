import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { NOT_FOUND_ERROR } from '../../constants';
import { HeartRateResult, ProgressMessage } from '../../contracts';
import { HeartRateDevice } from '../../devices/heart-rate.device';
import { isProgressMessage } from '../../helpers';

const connectButtonText = 'Connect HRM';

@Component({
    selector: 'heart-rate',
    templateUrl: './heart-rate.component.html',
    styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent {
    private wakeLockSentinel: WakeLockSentinel | undefined;

    constructor(private heartRateDevice: HeartRateDevice) {}

    private _logOutput = '';

    public get logOutput(): string {
        return `[
${this._logOutput}]`;
    }

    private _warningMessage?: string;

    public get warningMessage(): string | undefined {
        return this._warningMessage;
    }

    private _errorMessage?: string;

    public get errorMessage(): string | undefined {
        return this._errorMessage;
    }

    private _heartRate?: number;

    public get heartRate(): number | undefined {
        return this._heartRate;
    }

    private _buttonText: string | undefined = connectButtonText;

    public get buttonText(): string | undefined {
        return this._buttonText;
    }

    private _buttonEnabled = true;

    public get buttonEnabled(): boolean {
        return this._buttonEnabled;
    }

    private subscription?: Subscription;

    public get canDisconnect(): boolean {
        return this.subscription != null;
    }

    public async disconnect(): Promise<void> {
        this.reset();

        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }

        if (this.wakeLockSentinel) {
            this.wakeLockSentinel.release();
            this.wakeLockSentinel = undefined;
        }

        await this.heartRateDevice.disconnect();
    }

    public dismissMessages(): void {
        this._warningMessage = undefined;
        this._errorMessage = undefined;
    }

    public connectSensor(): void {
        this.reset();
        this._buttonEnabled = false;
        this._buttonText = 'Connecting...';
        this.subscription = this.heartRateDevice.connect().subscribe(
            (result) => this.handleUpdate(result),
            (error) => this.handleError(error, 'Error connecting to sensor'),
        );
    }

    private reset(): void {
        this._buttonEnabled = true;
        this._buttonText = connectButtonText;
        this._warningMessage = undefined;
        this._errorMessage = undefined;
        this._heartRate = undefined;
    }

    private handleUpdate(result: HeartRateResult | ProgressMessage) {
        try {
            navigator.wakeLock.request('screen').then((sentinel) => {
                this.log({ message: 'Wakelog obtained' });
                this.wakeLockSentinel = sentinel;
            });
        } catch (err) {
            this._warningMessage = `Could not obtain wakelock: ${err}`;
        }

        this.log(isProgressMessage(result) ? result : { heartRate: result.heartRate });

        if (isProgressMessage(result)) {
            this._buttonText = result.message;
            return;
        }

        this.reset();
        this._buttonEnabled = false;
        this._buttonText = undefined;
        this._heartRate = result.heartRate;
        console.log(`Heart Rate Result`, result);
    }

    private handleError(error: unknown, message?: string) {
        this.disconnect();

        if (error instanceof DOMException && error.name === NOT_FOUND_ERROR) {
            this._warningMessage = `No Device Selected`;
        } else {
            this._errorMessage = `${message ? message + ': ' : ''}${error}`;
        }
    }

    private log(data: Record<string, string | number | boolean | undefined>) {
        this._logOutput = `${JSON.stringify({ ...data, at: Date.now() })},\n${this._logOutput}`;
    }
}
