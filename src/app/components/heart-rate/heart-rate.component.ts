import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { BluetoothDeviceFactory, HeartRateSensor } from '../../factories/';

@Component({
    selector: 'heart-rate',
    templateUrl: './heart-rate.component.html',
    styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent {
    constructor(private sensorFactory: BluetoothDeviceFactory) {}

    private sensor?: HeartRateSensor;
    private subscription?: Subscription;

    public async disconnect(): Promise<void> {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.sensor) {
            await this.sensor.disconnect();
        }
    }

    public connectSensor(): void {
        console.log(`Connecting...`);
        const sensor = this.sensor || this.sensorFactory.create();
        this.subscription = sensor.connect().subscribe(
            (measurement) => console.log(`Result`, measurement),
            (error) => {
                console.log(`Error connecting to sensor`, error);
            },
        );

        this.sensor = sensor;
    }
}
