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

/***/ "3IcY":
/*!********************************************!*\
  !*** ./src/app/helpers/messages.helper.ts ***!
  \********************************************/
/*! exports provided: createProgress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProgress", function() { return createProgress; });
function createProgress(message) {
    return { message, type: 'progressMessage' };
}


/***/ }),

/***/ "6rF9":
/*!**********************************!*\
  !*** ./src/app/helpers/index.ts ***!
  \**********************************/
/*! exports provided: requestDevice, timeOutStream, deviceDisconnectionStream, connectServer, getService, getNotifications, parseHeartRate, isDataView, isProgressMessage, maintainWakeLock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bluetooth.helper */ "cJ4H");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestDevice", function() { return _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__["requestDevice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeOutStream", function() { return _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__["timeOutStream"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deviceDisconnectionStream", function() { return _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__["deviceDisconnectionStream"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "connectServer", function() { return _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__["connectServer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getService", function() { return _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__["getService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNotifications", function() { return _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__["getNotifications"]; });

/* harmony import */ var _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heart-rate.helper */ "+/Iz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseHeartRate", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["parseHeartRate"]; });

/* harmony import */ var _type_guards_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type-guards.helper */ "VPBO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDataView", function() { return _type_guards_helper__WEBPACK_IMPORTED_MODULE_2__["isDataView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isProgressMessage", function() { return _type_guards_helper__WEBPACK_IMPORTED_MODULE_2__["isProgressMessage"]; });

/* harmony import */ var _wakelock_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wakelock.helper */ "a7Nh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maintainWakeLock", function() { return _wakelock_helper__WEBPACK_IMPORTED_MODULE_3__["maintainWakeLock"]; });







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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class HeartRateDevice {
    connect() {
        return Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["requestDevice"])(['heart_rate']).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((server) => {
            if (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(server)) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(server);
            }
            console.log(`DEVICE CONNECTED`);
            const updatesStream = this.subscribeToUpdates(server).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
            const deviceDisconnection = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["deviceDisconnectionStream"])(server).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
            const reconnectionStream = deviceDisconnection.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["skipUntil"])(updatesStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((v) => !Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(v)))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => console.log(`DEVICE DISCONNECTED`)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(() => this.subscribeToUpdates(server)));
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(updatesStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(deviceDisconnection)), reconnectionStream);
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
            const updatesStream = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["connectServer"])(server).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((v) => (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(v) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(v) : Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getService"])(v, 'heart_rate'))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((v) => (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(v) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(v) : v.getCharacteristic('heart_rate_measurement'))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((v) => {
                if (!Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(v)) {
                    this.characteristic = v;
                }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((v) => (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(v) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(v) : Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["getNotifications"])(v))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((v) => (Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(v) ? v : Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["parseHeartRate"])(v))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(updatesStream, Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["timeOutStream"])(60000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(updatesStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((v) => !Object(_helpers__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(v))))));
        });
    }
}
HeartRateDevice.ɵfac = function HeartRateDevice_Factory(t) { return new (t || HeartRateDevice)(); };
HeartRateDevice.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: HeartRateDevice, factory: HeartRateDevice.ɵfac });


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
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../package.json */ "kiQV");
var _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../../package.json */ "kiQV", 1);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _heart_rate_heart_rate_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../heart-rate/heart-rate.component */ "YfhS");
/* harmony import */ var _trainer_trainer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trainer/trainer.component */ "jI5g");




class AppComponent {
    constructor() {
        document.title = `HRM Trainer Control ${_package_json__WEBPACK_IMPORTED_MODULE_0__["version"]}`;
    }
    get version() {
        return _package_json__WEBPACK_IMPORTED_MODULE_0__["version"];
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 5, vars: 1, consts: [[1, "version-display", "text-muted"], [1, "container", "d-flex", "flex-column", "h-100"], [1, "flex-grow-1"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "small", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "heart-rate", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "trainer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.version);
    } }, directives: [_heart_rate_heart_rate_component__WEBPACK_IMPORTED_MODULE_2__["HeartRateComponent"], _trainer_trainer_component__WEBPACK_IMPORTED_MODULE_3__["TrainerComponent"]], styles: [".version-display[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.5rem;\n  top: 0.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7QUFBSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi52ZXJzaW9uLWRpc3BsYXl7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAwLjVyZW07XG4gICAgdG9wOiAwLjVyZW07XG59XG4iXX0= */"] });


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
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../devices */ "YudN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






function HeartRateComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeartRateComponent_div_1_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r5.dismissMessages(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 12);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeartRateComponent_div_2_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r7.dismissMessages(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 12);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "button", 15);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r3.heartRate, " ");
} }
function HeartRateComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HeartRateComponent_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r11.disconnect(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span", 12);
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
        const wakeLockSubscription = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["maintainWakeLock"])().subscribe((result) => this.handleUpdate(result, false));
        this.subscription.add(wakeLockSubscription);
    }
    reset() {
        this._buttonEnabled = true;
        this._buttonText = connectButtonText;
        this._warningMessage = undefined;
        this._errorMessage = undefined;
        this._heartRate = undefined;
    }
    handleUpdate(result, updateButton = true) {
        this.log(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["isProgressMessage"])(result) ? result : { heartRate: result.heartRate });
        if (Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["isProgressMessage"])(result)) {
            if (updateButton) {
                this._buttonText = result.message;
            }
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
HeartRateComponent.ɵfac = function HeartRateComponent_Factory(t) { return new (t || HeartRateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_devices__WEBPACK_IMPORTED_MODULE_4__["HeartRateDevice"])); };
HeartRateComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: HeartRateComponent, selectors: [["heart-rate"]], decls: 11, vars: 6, consts: [[1, "d-flex", "flex-column", "h-100"], ["class", "alert alert-warning alert-dismissible mt-3", 4, "ngIf"], ["class", "alert alert-danger alert-dismissible mt-3", 4, "ngIf"], [1, "center-content", "position-relative"], ["class", "button-overlay center-content", 4, "ngIf"], ["class", "button-overlay center-content heart-rate", 4, "ngIf"], [1, "bi-heart-fill"], ["type", "button", "class", "close close-button", "aria-label", "Close", 3, "click", 4, "ngIf"], [1, "flex-grow-1"], [1, "w-100", "h-100", 3, "value"], [1, "alert", "alert-warning", "alert-dismissible", "mt-3"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "alert", "alert-danger", "alert-dismissible", "mt-3"], [1, "button-overlay", "center-content"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], [1, "button-overlay", "center-content", "heart-rate"], ["type", "button", "aria-label", "Close", 1, "close", "close-button", 3, "click"]], template: function HeartRateComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "textarea", 9);
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

/***/ "YudN":
/*!**********************************!*\
  !*** ./src/app/devices/index.ts ***!
  \**********************************/
/*! exports provided: HeartRateDevice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _heart_rate_device__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heart-rate.device */ "PdRg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeartRateDevice", function() { return _heart_rate_device__WEBPACK_IMPORTED_MODULE_0__["HeartRateDevice"]; });




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

/***/ "a7Nh":
/*!********************************************!*\
  !*** ./src/app/helpers/wakelock.helper.ts ***!
  \********************************************/
/*! exports provided: maintainWakeLock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maintainWakeLock", function() { return maintainWakeLock; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _type_guards_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type-guards.helper */ "VPBO");



function maintainWakeLock() {
    return requestWakeLock().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((v) => (Object(_type_guards_helper__WEBPACK_IMPORTED_MODULE_2__["isProgressMessage"])(v) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(v) : listenForRelease(v))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((v) => (Object(_type_guards_helper__WEBPACK_IMPORTED_MODULE_2__["isProgressMessage"])(v) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(v) : requestWakeLock())), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(_type_guards_helper__WEBPACK_IMPORTED_MODULE_2__["isProgressMessage"]));
}
function requestWakeLock() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
        let _sentinel;
        navigator.wakeLock.request('screen').then((sentinel) => {
            console.log(`Wake Lock Obtained`);
            observer.next({ type: 'progressMessage', message: 'Wake Lock Obtained' });
            _sentinel = sentinel;
            observer.next(sentinel);
        }, (error) => observer.error(error));
        return {
            unsubscribe: () => {
                if (_sentinel != null) {
                    console.log(`Releasing wakelock`);
                    _sentinel.release();
                }
            },
        };
    });
}
function listenForRelease(sentinel) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
        observer.next({ type: 'progressMessage', message: 'Listening for wake lock release' });
        sentinel.addEventListener('onrelease', (event) => {
            observer.next({ type: 'progressMessage', message: 'Wake Lock Released' });
            console.log(`Wake Lock Released`);
            observer.next(event);
        });
    });
}


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
/* harmony import */ var _messages_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messages.helper */ "3IcY");
/* harmony import */ var _type_guards_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type-guards.helper */ "VPBO");




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
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(Object(_messages_helper__WEBPACK_IMPORTED_MODULE_2__["createProgress"])('Requesting Device...')), requestStream);
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
        let unsubscribed = false;
        observer.next(Object(_messages_helper__WEBPACK_IMPORTED_MODULE_2__["createProgress"])(`Connecting to Server...`));
        server.connect().then(() => {
            console.log(`Server Connected (unsubscribed: ${unsubscribed})`, server);
            if (unsubscribed) {
                server.disconnect();
            }
            else {
                observer.next(server);
            }
        }, (error) => observer.error(error));
        return {
            unsubscribe: () => {
                unsubscribed = true;
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
        console.log(`Error getting service: '${service}' (${retries})`, server, err);
        if (!server.connected) {
            return connectServer(server, retries + 1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((v) => (Object(_type_guards_helper__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"])(v) ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(v) : getService(server, service, retries + 1))));
        }
        else if (retries < 3) {
            return getService(server, service, retries + 1);
        }
        else {
            throw err;
        }
    }));
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(Object(_messages_helper__WEBPACK_IMPORTED_MODULE_2__["createProgress"])('Getting Service...')), getServiceStream);
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

/***/ "kiQV":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, scripts, private, dependencies, devDependencies, description, main, repository, keywords, author, license, bugs, homepage, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"hrm-trainer-control\",\"version\":\"0.1.3\",\"scripts\":{\"start\":\"ng serve --open\",\"build\":\"ng build\",\"lint\":\"eslint . --ext .ts,.js\",\"lint:fix\":\"eslint . --ext .ts,.js --fix\",\"prepublishOnly\":\"npm run verify-release\",\"test\":\"karma start --singleRun --browsers ChromeHeadless\",\"test:watch\":\"karma start\",\"verify-release\":\"concurrently --kill-others-on-fail npm:build npm:lint\"},\"private\":true,\"dependencies\":{\"@angular/animations\":\"~11.1.2\",\"@angular/common\":\"~11.1.2\",\"@angular/compiler\":\"~11.1.2\",\"@angular/core\":\"~11.1.2\",\"@angular/forms\":\"~11.1.2\",\"@angular/platform-browser\":\"~11.1.2\",\"@angular/platform-browser-dynamic\":\"~11.1.2\",\"@angular/router\":\"~11.1.2\",\"bootstrap\":\"^4.6.0\",\"bootstrap-icons\":\"^1.3.0\",\"jquery\":\"^3.5.1\",\"rxjs\":\"~6.6.0\",\"zone.js\":\"~0.11.3\"},\"devDependencies\":{\"@angular-devkit/build-angular\":\"~0.1101.4\",\"@angular/cli\":\"~11.1.4\",\"@angular/compiler-cli\":\"~11.1.2\",\"@types/dom-screen-wake-lock\":\"^1.0.0\",\"@types/jasmine\":\"^3.6.3\",\"@types/node\":\"^12.11.1\",\"@types/web-bluetooth\":\"0.0.9\",\"@typescript-eslint/eslint-plugin\":\"^4.15.0\",\"@typescript-eslint/parser\":\"^4.15.0\",\"concurrently\":\"^5.3.0\",\"eslint\":\"^7.2.0\",\"eslint-config-prettier\":\"^7.2.0\",\"eslint-config-standard\":\"^14.1.1\",\"eslint-plugin-import\":\"^2.22.1\",\"eslint-plugin-node\":\"^11.1.0\",\"eslint-plugin-prettier\":\"^3.3.1\",\"eslint-plugin-promise\":\"^4.3.1\",\"eslint-plugin-simple-import-sort\":\"^7.0.0\",\"eslint-plugin-standard\":\"^5.0.0\",\"jasmine\":\"^3.6.4\",\"karma\":\"^6.1.1\",\"karma-chrome-launcher\":\"^3.1.0\",\"karma-coverage-istanbul-reporter\":\"^3.0.3\",\"karma-jasmine\":\"^4.0.1\",\"karma-jasmine-html-reporter\":\"^1.5.4\",\"karma-source-map-support\":\"^1.4.0\",\"karma-sourcemap-loader\":\"^0.3.8\",\"karma-webpack\":\"^4.0.2\",\"popper.js\":\"^1.16.1\",\"prettier\":\"^2.2.1\",\"puppeteer\":\"^7.1.0\",\"ts-loader\":\"^8.0.17\",\"typescript\":\"~4.1.2\",\"webpack\":\"^4.46.0\"},\"description\":\"This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.\",\"main\":\".eslintrc.js\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Roaders/hrm-trainer-control.git\"},\"keywords\":[],\"author\":\"\",\"license\":\"ISC\",\"bugs\":{\"url\":\"https://github.com/Roaders/hrm-trainer-control/issues\"},\"homepage\":\"https://github.com/Roaders/hrm-trainer-control#readme\"}");

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