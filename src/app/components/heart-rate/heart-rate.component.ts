import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { NOT_FOUND_ERROR } from '../../constants';
import { HeartRateResult } from '../../contracts';
import { HeartRateDevice } from '../../devices';
import { Logger, WakelockHelper } from '../../helpers';

const connectButtonText = 'Connect HRM';

@Component({
    selector: 'heart-rate',
    templateUrl: './heart-rate.component.html',
    styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent {
    constructor(
        private heartRateDevice: HeartRateDevice,
        private wakelockHelper: WakelockHelper,
        private logger: Logger,
    ) {}

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
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }

        this.reset();
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

        this.subscription.add(this.wakelockHelper.maintainWakeLock().subscribe());
    }

    private reset(): void {
        this._buttonEnabled = true;
        this._buttonText = connectButtonText;
        this._warningMessage = undefined;
        this._errorMessage = undefined;
        this._heartRate = undefined;
    }

    private handleUpdate(result: HeartRateResult) {
        this.reset();
        this._buttonEnabled = false;
        this._buttonText = undefined;
        this._heartRate = result.heartRate;
        this.logger.trace(`Heart Rate Result`, result);
    }

    private handleError(error: unknown, message?: string) {
        this.disconnect();

        if (error instanceof DOMException && error.name === NOT_FOUND_ERROR) {
            this._warningMessage = `No Device Selected`;
        } else {
            this._errorMessage = `${message ? message + ': ' : ''}${error}`;
        }
    }
}
