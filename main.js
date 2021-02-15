(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+/Iz":
/*!**********************************************!*\
  !*** ./src/app/helpers/heart-rate.helper.ts ***!
  \**********************************************/
/*! exports provided: parseHeartRate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHeartRate", function() { return parseHeartRate; });
/* harmony import */ var _type_guards_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type-guards.helper */ "VPBO");

function parseHeartRate(value) {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = Object(_type_guards_helper__WEBPACK_IMPORTED_MODULE_0__["isDataView"])(value) ? value : new DataView(value);
    const flags = value.getUint8(0);
    const rate16Bits = flags & 0x1;
    const result = {};
    let index = 1;
    let heartRate;
    if (rate16Bits) {
        heartRate = value.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    }
    else {
        heartRate = value.getUint8(index);
        index += 1;
    }
    const contactDetected = flags & 0x2;
    const contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
        result.contactDetected = !!contactDetected;
    }
    const energyPresent = flags & 0x8;
    if (energyPresent) {
        result.energyExpended = value.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    }
    const rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
        result.rrIntervals = [];
        for (; index + 1 < value.byteLength; index += 2) {
            result.rrIntervals.push(value.getUint16(index, /*littleEndian=*/ true));
        }
    }
    return Object.assign({ heartRate }, result);
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/hrm-trainer-control/hrm-trainer-control/src/main.ts */"zUnb");


/***/ }),

/***/ "6rF9":
/*!**********************************!*\
  !*** ./src/app/helpers/index.ts ***!
  \**********************************/
/*! exports provided: parseHeartRate, isDataView, isProgressMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _heart_rate_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heart-rate.helper */ "+/Iz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseHeartRate", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_0__["parseHeartRate"]; });

/* harmony import */ var _type_guards_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type-guards.helper */ "VPBO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDataView", function() { return _type_guards_helper__WEBPACK_IMPORTED_MODULE_1__["isDataView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isProgressMessage", function() { return _type_guards_helper__WEBPACK_IMPORTED_MODULE_1__["isProgressMessage"]; });





/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "PdRg":
/*!**********************************************!*\
  !*** ./src/app/devices/heart-rate.device.ts ***!
  \**********************************************/
/*! exports provided: HeartRateDevice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeartRateDevice", function() { return HeartRateDevice; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "6rF9");
/* harmony import */ var _helpers_bluetooth_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/bluetooth.helper */ "cJ4H");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class HeartRateDevice {
    connect() {
        return Object(_helpers_bluetooth_helper__WEBPACK_IMPORTED_MODULE_4__["requestDevice"])(['heart_rate']).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((server) => {
            if (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(server)) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(server);
            }
            console.log(`DEVICE CONNECTED`);
            const updatesStream = this.subscribeToUpdates(server).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => console.log(`UPDATE`)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
            const reconnectionStream = Object(_helpers_bluetooth_helper__WEBPACK_IMPORTED_MODULE_4__["deviceDisconnectionStream"])(server).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["skipUntil"])(updatesStream), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => console.log(`DEVICE DISCONNECTED`)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(() => this.subscribeToUpdates(server)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(updatesStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(reconnectionStream)), reconnectionStream);
        }));
    }
    disconnect() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.characteristic != null && ((_a = this.server) === null || _a === void 0 ? void 0 : _a.connected)) {
                console.log(`Stopping notifications`, this.characteristic);
                try {
                    yield this.characteristic.stopNotifications();
                }
                catch (e) {
                    console.log(`Error stopping notifications: `, e);
                }
            }
            if (this.server) {
                console.log(`Stopping server`, this.server);
                this.server.disconnect();
            }
            this.server = undefined;
            this.characteristic = undefined;
            return true;
        });
    }
    subscribeToUpdates(server) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["defer"])(() => {
            console.log(`HeartRateDevice.subscribeToUpdates`);
            this.server = server;
            const updatesStream = Object(_helpers_bluetooth_helper__WEBPACK_IMPORTED_MODULE_4__["connectServer"])(server).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((data) => (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(data) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(data) : Object(_helpers_bluetooth_helper__WEBPACK_IMPORTED_MODULE_4__["getService"])(data, 'heart_rate'))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((data) => Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(data) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(data) : data.getCharacteristic('heart_rate_measurement')), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
                if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(data)) {
                    this.characteristic = data;
                }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((data) => (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(data) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(data) : Object(_helpers_bluetooth_helper__WEBPACK_IMPORTED_MODULE_4__["getNotifications"])(data))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((data) => (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(data) ? data : Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["parseHeartRate"])(data))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(Object(_helpers_bluetooth_helper__WEBPACK_IMPORTED_MODULE_4__["timeOutStream"])(60000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(updatesStream)), updatesStream);
        });
    }
}
HeartRateDevice.ɵfac = function HeartRateDevice_Factory(t) { return new (t || HeartRateDevice)(); };
HeartRateDevice.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: HeartRateDevice, factory: HeartRateDevice.ɵfac });


/***/ }),

/***/ "VPBO":
/*!***********************************************!*\
  !*** ./src/app/helpers/type-guards.helper.ts ***!
  \***********************************************/
/*! exports provided: isDataView, isProgressMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDataView", function() { return isDataView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProgressMessage", function() { return isProgressMessage; });
function isDataView(value) {
    return value != null && value.buffer instanceof ArrayBuffer;
}
function isProgressMessage(value) {
    return value != null && value.type === 'progressMessage';
}


/***/ }),

/***/ "WfQD":
/*!*************************************************!*\
  !*** ./src/app/components/app/app.component.ts ***!
  \*************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _heart_rate_heart_rate_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../heart-rate/heart-rate.component */ "YfhS");
/* harmony import */ var _trainer_trainer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trainer/trainer.component */ "jI5g");



class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, consts: [[1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "heart-rate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "trainer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_heart_rate_heart_rate_component__WEBPACK_IMPORTED_MODULE_1__["HeartRateComponent"], _trainer_trainer_component__WEBPACK_IMPORTED_MODULE_2__["TrainerComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ "YfhS":
/*!***************************************************************!*\
  !*** ./src/app/components/heart-rate/heart-rate.component.ts ***!
  \***************************************************************/
/*! exports provided: HeartRateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeartRateComponent", function() { return HeartRateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "l207");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers */ "6rF9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _devices_heart_rate_device__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../devices/heart-rate.device */ "PdRg");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






function HeartRateComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeartRateComponent_div_1_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r5.dismissMessages(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r0.warningMessage, " ");
} }
function HeartRateComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeartRateComponent_div_2_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r7.dismissMessages(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.errorMessage, " ");
} }
function HeartRateComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeartRateComponent_div_4_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r9.connectSensor(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx_r2.buttonEnabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r2.buttonText);
} }
function HeartRateComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r3.heartRate, " ");
} }
function HeartRateComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeartRateComponent_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r11.disconnect(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
const connectButtonText = 'Connect HRM';
class HeartRateComponent {
    constructor(heartRateDevice) {
        this.heartRateDevice = heartRateDevice;
        this._logOutput = '';
        this._buttonText = connectButtonText;
        this._buttonEnabled = true;
    }
    get logOutput() {
        return `[
${this._logOutput}]`;
    }
    get warningMessage() {
        return this._warningMessage;
    }
    get errorMessage() {
        return this._errorMessage;
    }
    get heartRate() {
        return this._heartRate;
    }
    get buttonText() {
        return this._buttonText;
    }
    get buttonEnabled() {
        return this._buttonEnabled;
    }
    get canDisconnect() {
        return this.subscription != null;
    }
    disconnect() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.reset();
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = undefined;
            }
            if (this.wakeLockSentinel) {
                this.wakeLockSentinel.release();
                this.wakeLockSentinel = undefined;
            }
            yield this.heartRateDevice.disconnect();
        });
    }
    dismissMessages() {
        this._warningMessage = undefined;
        this._errorMessage = undefined;
    }
    connectSensor() {
        this.reset();
        this._buttonEnabled = false;
        this._buttonText = 'Connecting...';
        this.subscription = this.heartRateDevice.connect().subscribe((result) => this.handleUpdate(result), (error) => this.handleError(error, 'Error connecting to sensor'));
    }
    reset() {
        this._buttonEnabled = true;
        this._buttonText = connectButtonText;
        this._warningMessage = undefined;
        this._errorMessage = undefined;
        this._heartRate = undefined;
    }
    handleUpdate(result) {
        try {
            navigator.wakeLock.request('screen').then((sentinel) => {
                this.log({ message: 'Wakelog obtained' });
                this.wakeLockSentinel = sentinel;
            });
        }
        catch (err) {
            this._warningMessage = `Could not obtain wakelock: ${err}`;
        }
        this.log(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["isProgressMessage"])(result) ? result : { heartRate: result.heartRate });
        if (Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["isProgressMessage"])(result)) {
            this._buttonText = result.message;
            return;
        }
        this.reset();
        this._buttonEnabled = false;
        this._buttonText = undefined;
        this._heartRate = result.heartRate;
        console.log(`Heart Rate Result`, result);
    }
    handleError(error, message) {
        this.disconnect();
        if (error instanceof DOMException && error.name === _constants__WEBPACK_IMPORTED_MODULE_1__["NOT_FOUND_ERROR"]) {
            this._warningMessage = `No Device Selected`;
        }
        else {
            this._errorMessage = `${message ? message + ': ' : ''}${error}`;
        }
    }
    log(data) {
        this._logOutput = `${JSON.stringify(Object.assign(Object.assign({}, data), { at: Date.now() }))},\n${this._logOutput}`;
    }
}
HeartRateComponent.ɵfac = function HeartRateComponent_Factory(t) { return new (t || HeartRateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_devices_heart_rate_device__WEBPACK_IMPORTED_MODULE_4__["HeartRateDevice"])); };
HeartRateComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: HeartRateComponent, selectors: [["heart-rate"]], decls: 11, vars: 6, consts: [[1, "col-sm", "m-auto"], ["class", "alert alert-warning alert-dismissible mt-3", 4, "ngIf"], ["class", "alert alert-danger alert-dismissible mt-3", 4, "ngIf"], [1, "center-content", "position-relative"], ["class", "button-overlay center-content", 4, "ngIf"], ["class", "button-overlay center-content heart-rate", 4, "ngIf"], [1, "bi-heart-fill"], ["type", "button", "class", "close close-button", "aria-label", "Close", 3, "click", 4, "ngIf"], [1, "w-100", 3, "value"], [1, "alert", "alert-warning", "alert-dismissible", "mt-3"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "alert", "alert-danger", "alert-dismissible", "mt-3"], [1, "button-overlay", "center-content"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], [1, "button-overlay", "center-content", "heart-rate"], ["type", "button", "aria-label", "Close", 1, "close", "close-button", 3, "click"]], template: function HeartRateComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, HeartRateComponent_div_1_Template, 5, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, HeartRateComponent_div_2_Template, 5, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, HeartRateComponent_div_4_Template, 3, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, HeartRateComponent_div_5_Template, 2, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, HeartRateComponent_button_8_Template, 3, 0, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "textarea", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.warningMessage != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.errorMessage != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.buttonText != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.heartRate != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.canDisconnect);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx.logOutput);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], styles: [".bi-heart-fill[_ngcontent-%COMP%] {\n  color: red;\n  font-size: 5rem;\n}\n\n.heart-rate[_ngcontent-%COMP%] {\n  font-size: 3rem;\n}\n\n.button-overlay[_ngcontent-%COMP%] {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n\n.close-button[_ngcontent-%COMP%] {\n  top: 0;\n  right: 0;\n  position: absolute;\n}\n\n.center-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.btn.disabled[_ngcontent-%COMP%], .btn[_ngcontent-%COMP%]:disabled {\n  opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2hlYXJ0LXJhdGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxVQUFBO0VBQ0EsZUFBQTtBQUFKOztBQUdBO0VBQ0ksZUFBQTtBQUFKOztBQUdBO0VBQ0ksTUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0E7RUFDSSxNQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0E7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUlJO0VBRUksVUFBQTtBQUZSIiwiZmlsZSI6ImhlYXJ0LXJhdGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5iaS1oZWFydC1maWxse1xuICAgIGNvbG9yOiByZWQ7XG4gICAgZm9udC1zaXplOiA1cmVtO1xufVxuXG4uaGVhcnQtcmF0ZXtcbiAgICBmb250LXNpemU6IDNyZW07XG59XG5cbi5idXR0b24tb3ZlcmxheXtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4uY2xvc2UtYnV0dG9ue1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5jZW50ZXItY29udGVudCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYnRuIHtcbiAgICAmLmRpc2FibGVkLFxuICAgICY6ZGlzYWJsZWQge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _components_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/app/app.component */ "WfQD");
/* harmony import */ var _components_heart_rate_heart_rate_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/heart-rate/heart-rate.component */ "YfhS");
/* harmony import */ var _components_trainer_trainer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/trainer/trainer.component */ "jI5g");
/* harmony import */ var _devices_heart_rate_device__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./devices/heart-rate.device */ "PdRg");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_devices_heart_rate_device__WEBPACK_IMPORTED_MODULE_5__["HeartRateDevice"]], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], _components_heart_rate_heart_rate_component__WEBPACK_IMPORTED_MODULE_3__["HeartRateComponent"], _components_trainer_trainer_component__WEBPACK_IMPORTED_MODULE_4__["TrainerComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]] }); })();


/***/ }),

/***/ "cJ4H":
/*!*********************************************!*\
  !*** ./src/app/helpers/bluetooth.helper.ts ***!
  \*********************************************/
/*! exports provided: requestDevice, timeOutStream, deviceDisconnectionStream, connectServer, getService, getNotifications */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestDevice", function() { return requestDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeOutStream", function() { return timeOutStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceDisconnectionStream", function() { return deviceDisconnectionStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectServer", function() { return connectServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getService", function() { return getService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNotifications", function() { return getNotifications; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");


const retryCount = 5;
function requestDevice(services, retries = 0) {
    console.log(`requestDevice(${retries})...`, services);
    const requestStream = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(navigator.bluetooth.requestDevice({ filters: [{ services }] })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((device) => console.log(`Device Selected:`, device.name)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((device) => {
        if (device.gatt == null) {
            throw new Error(`gatt is not defined on device`);
        }
        return device.gatt;
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((err) => {
        console.log(`Error selecting device`, err);
        if (retries >= retryCount || err.name === 'NotFoundError') {
            throw err;
        }
        else {
            return requestDevice(services, retries + 1);
        }
    }));
    const progressMessage = { message: 'Requesting Device...', type: 'progressMessage' };
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(progressMessage), requestStream);
}
function timeOutStream(timeInMs) {
    console.log(`Starting timeout...`, timeInMs);
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["interval"])(timeInMs).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => {
        throw new Error(`Timeout waiting for device connection.`);
    }));
}
function deviceDisconnectionStream(server) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
        function handleEvent(event) {
            console.log(`Gatt server disconnected`, event);
            observer.next(server);
        }
        console.log(`Add event listener: gattserverdisconnected`);
        server.device.addEventListener('gattserverdisconnected', handleEvent);
        return {
            unsubscribe: () => {
                console.log(`Remove Event Listener: gattserverdisconnected`);
                server.device.removeEventListener('gattserverdisconnected', handleEvent);
            },
        };
    });
}
function connectServer(server, retries = 0) {
    console.log(`connectServer(${retries})...`);
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
        console.log(`Connecting to server...`);
        server.connect().then(() => {
            console.log(`Server Connected`, server);
            observer.next(server);
        }, (error) => observer.error(error));
        observer.next({ message: 'Connecting to Server...', type: 'progressMessage' });
        return {
            unsubscribe: () => {
                if (server.connected) {
                    console.log(`connectServer.unsubscribe: Disconnecting from server...`, server);
                    server.disconnect();
                }
                else {
                    console.log(`connectServer.unsubscribe: Server already disconnected`, server);
                }
            },
        };
    }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((err) => {
        console.log(`Error connecting to server`, err);
        if (retries < retryCount) {
            return connectServer(server, retries + 1);
        }
        else {
            throw err;
        }
    }));
}
function getService(server, service, retries = 0) {
    console.log(`getService(${retries}) '${service}'...`, server);
    const getServiceStream = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(server.getPrimaryService(service)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => console.log(`Service returned`)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((err) => {
        console.log(`Error getting service: '${service}'`, server, err);
        if (!server.connected) {
            return connectServer(server, retries + 1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(() => getService(server, service, retries + 1)));
        }
        else if (retries < 3) {
            return getService(server, service, retries + 1);
        }
        else {
            throw err;
        }
    }));
    const progressMessage = { message: 'Getting Service...', type: 'progressMessage' };
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(progressMessage), getServiceStream);
}
function getNotifications(characteristic) {
    console.log(`starting notifications`, characteristic);
    characteristic.startNotifications();
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
        function handleEvent() {
            if (characteristic.value != null) {
                observer.next(characteristic.value);
            }
        }
        characteristic.addEventListener('characteristicvaluechanged', handleEvent);
        return {
            unsubscribe: () => {
                characteristic.removeEventListener('characteristicvaluechanged', handleEvent);
            },
        };
    });
}


/***/ }),

/***/ "jI5g":
/*!*********************************************************!*\
  !*** ./src/app/components/trainer/trainer.component.ts ***!
  \*********************************************************/
/*! exports provided: TrainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrainerComponent", function() { return TrainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class TrainerComponent {
}
TrainerComponent.ɵfac = function TrainerComponent_Factory(t) { return new (t || TrainerComponent)(); };
TrainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TrainerComponent, selectors: [["trainer"]], decls: 2, vars: 0, template: function TrainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "trainer.component works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmFpbmVyLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "l207":
/*!******************************!*\
  !*** ./src/app/constants.ts ***!
  \******************************/
/*! exports provided: NOT_FOUND_ERROR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_FOUND_ERROR", function() { return NOT_FOUND_ERROR; });
const NOT_FOUND_ERROR = 'NotFoundError';


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map