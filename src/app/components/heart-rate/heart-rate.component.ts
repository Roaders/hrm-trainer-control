import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { NOT_FOUND_ERROR } from '../../constants';
import { HeartRateResult } from '../../contracts';
import { HeartRateDevice } from '../../devices/heart-rate.device';

const connectButtonText = 'Connect HRM';

@Component({
    selector: 'heart-rate',
    templateUrl: './heart-rate.component.html',
    styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent {
    constructor(private heartRateDevice: HeartRateDevice) {}

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

    public async disconnect(): Promise<void> {
        this.reset();

        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
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
            (result) => this.handleHeartRate(result),
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

    private handleHeartRate(result: HeartRateResult) {
        this.reset();
        this._buttonEnabled = false;
        this._buttonText = undefined;
        this._heartRate = result.heartRate;
        console.log(`Heart Rate Result`, result);
    }

    private handleError(error: unknown, message?: string) {
        this.reset();
        if (error instanceof DOMException && error.name === NOT_FOUND_ERROR) {
            this._warningMessage = `No Device Selected`;
        } else {
            this._errorMessage = `${message ? message + ': ' : ''}${error}`;
        }
    }
}