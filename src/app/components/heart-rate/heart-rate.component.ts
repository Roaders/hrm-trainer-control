import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { HeartRateDevice } from '../../devices/heart-rate.device';

@Component({
    selector: 'heart-rate',
    templateUrl: './heart-rate.component.html',
    styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent {
    constructor(private heartRate: HeartRateDevice) {}

    private subscription?: Subscription;

    public async disconnect(): Promise<void> {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
        await this.heartRate.disconnect();
    }

    public connectSensor(): void {
        console.log(`Connecting...`);
        this.subscription = this.heartRate.connect().subscribe(
            (measurement) => console.log(`Result`, measurement),
            (error) => {
                console.log(`Error connecting to sensor`, error);
            },
        );
    }
}
