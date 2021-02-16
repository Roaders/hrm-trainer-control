import { Component } from '@angular/core';

import { version } from '../../../../package.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor() {
        document.title = `HRM Trainer Control ${version}`;
    }

    public get version(): string {
        return version;
    }
}