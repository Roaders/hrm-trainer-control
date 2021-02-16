import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { NOT_FOUND_ERROR } from '../../constants';
import { ProgressMessage, TrainerResult } from '../../contracts';
import { TrainerDevice } from '../../devices';
import { isProgressMessage } from '../../helpers';

const connectButtonText = 'Connect Trainer';

@Component({
    selector: 'trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.scss'],
})
export class TrainerComponent {
    constructor(private trainerDevice: TrainerDevice) {}

    private _warningMessage?: string;

    public get warningMessage(): string | undefined {
        return this._warningMessage;
    }

    private _errorMessage?: string;

    public get errorMessage(): string | undefined {
        return this._errorMessage;
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

        await this.trainerDevice.disconnect();
    }

    public dismissMessages(): void {
        this._warningMessage = undefined;
        this._errorMessage = undefined;
    }

    public connectSensor(): void {
        this.reset();

        this._buttonEnabled = false;
        this._buttonText = 'Connecting...';
        this.subscription = this.trainerDevice.connect().subscribe(
            (result) => this.handleUpdate(result),
            (error) => this.handleError(error, 'Error connecting to sensor'),
        );
    }

    private reset(): void {
        this._buttonEnabled = true;
        this._buttonText = connectButtonText;
        this._warningMessage = undefined;
        this._errorMessage = undefined;
    }

    private handleUpdate(result: TrainerResult | ProgressMessage, updateButton = true) {
        if (isProgressMessage(result)) {
            if (updateButton) {
                this._buttonText = result.message;
            }
            console.log(`Trainer Progress`, result);
            return;
        }

        console.log(`TRAINER UPDATE`, result);

        this.reset();
        this._buttonEnabled = false;
        this._buttonText = undefined;
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
