import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeartRateComponent } from './components/heart-rate/heart-rate.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { HeartRateDevice } from './devices/heart-rate.device';
import { BluetoothHelper, Logger, WakelockHelper } from './helpers';

@NgModule({
    declarations: [AppComponent, HeartRateComponent, TrainerComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [HeartRateDevice, Logger, BluetoothHelper, WakelockHelper],
    bootstrap: [AppComponent],
})
export class AppModule {}
