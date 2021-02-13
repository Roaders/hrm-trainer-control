import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeartRateComponent } from './components/heart-rate/heart-rate.component';
import { BluetoothDeviceFactory } from './factories';

@NgModule({
    declarations: [AppComponent, HeartRateComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [BluetoothDeviceFactory],
    bootstrap: [AppComponent],
})
export class AppModule {}
