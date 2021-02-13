import { Component } from '@angular/core';

import { BluetoothDeviceFactory } from '../../factories/';
import { parseHeartRate } from '../../helpers';

@Component({
    selector: 'heart-rate',
    templateUrl: './heart-rate.component.html',
    styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent {
    constructor(private sensorFactory: BluetoothDeviceFactory) {}

    public connectSensor(): void {
        console.log(`Connecting...`);
        const sensor = this.sensorFactory.create();
        sensor
            .connect()
            .then(() =>
                sensor
                    .startNotificationsHeartRateMeasurement()
                    .then((measurement) => this.handleHeartRate(measurement)),
            )
            .catch((error) => {
                console.log(`Error connecting to sensor`, error);
            });
    }

    private handleHeartRate(heartRateMeasurement: BluetoothRemoteGATTCharacteristic) {
        heartRateMeasurement.addEventListener('characteristicvaluechanged', (event) => {
            const characteristic = event.target as BluetoothRemoteGATTCharacteristic;

            if (characteristic.value != null) {
                const heartRateMeasurement = parseHeartRate(characteristic.value);

                console.log(`HeartRate:`, heartRateMeasurement);
            } else {
                console.log(`'value' not defined on characteristic`);
            }
        });
    }
}
