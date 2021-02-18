(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+/Iz":
/*!**********************************************!*\
  !*** ./src/app/helpers/heart-rate.helper.ts ***!
  \**********************************************/
/*! exports provided: HEART_RATE_SERVICE, HEART_RATE_CHARACTERISTIC, rate16Bits, contactDetected, contactSensorPresent, energyPresent, rrIntervalPresent, parseHeartRate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEART_RATE_SERVICE", function() { return HEART_RATE_SERVICE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEART_RATE_CHARACTERISTIC", function() { return HEART_RATE_CHARACTERISTIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rate16Bits", function() { return rate16Bits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactDetected", function() { return contactDetected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactSensorPresent", function() { return contactSensorPresent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "energyPresent", function() { return energyPresent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rrIntervalPresent", function() { return rrIntervalPresent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHeartRate", function() { return parseHeartRate; });
/* harmony import */ var _type_guards_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type-guards.helper */ "VPBO");

const HEART_RATE_SERVICE = 'heart_rate';
const HEART_RATE_CHARACTERISTIC = `heart_rate_measurement`;
const rate16Bits = 0x1;
const contactDetected = 0x2;
const contactSensorPresent = 0x4;
const energyPresent = 0x8;
const rrIntervalPresent = 0x10;
function parseHeartRate(value) {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = Object(_type_guards_helper__WEBPACK_IMPORTED_MODULE_0__["isDataView"])(value) ? value : new DataView(value);
    const flags = value.getUint8(0);
    const rate16BitsFlag = flags & rate16Bits;
    const result = {};
    let index = 1;
    let heartRate;
    if (rate16BitsFlag) {
        heartRate = value.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    }
    else {
        heartRate = value.getUint8(index);
        index += 1;
    }
    const contactDetectedFlag = flags & contactDetected;
    const contactSensorPresentFlag = flags & contactSensorPresent;
    if (contactSensorPresentFlag) {
        result.contactDetected = !!contactDetectedFlag;
    }
    const energyPresentFlag = flags & energyPresent;
    if (energyPresentFlag) {
        result.energyExpended = value.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    }
    const rrIntervalPresentFlag = flags & rrIntervalPresent;
    if (rrIntervalPresentFlag) {
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
/*! exports provided: BluetoothHelper, HEART_RATE_SERVICE, HEART_RATE_CHARACTERISTIC, rate16Bits, contactDetected, contactSensorPresent, energyPresent, rrIntervalPresent, parseHeartRate, LogLevel, Logger, isDataView, isProgressMessage, WakelockHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bluetooth.helper */ "cJ4H");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BluetoothHelper", function() { return _bluetooth_helper__WEBPACK_IMPORTED_MODULE_0__["BluetoothHelper"]; });

/* harmony import */ var _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heart-rate.helper */ "+/Iz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HEART_RATE_SERVICE", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["HEART_RATE_SERVICE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HEART_RATE_CHARACTERISTIC", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["HEART_RATE_CHARACTERISTIC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rate16Bits", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["rate16Bits"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contactDetected", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["contactDetected"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contactSensorPresent", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["contactSensorPresent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "energyPresent", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["energyPresent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rrIntervalPresent", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["rrIntervalPresent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseHeartRate", function() { return _heart_rate_helper__WEBPACK_IMPORTED_MODULE_1__["parseHeartRate"]; });

/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "Dw+o");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return _logger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _logger__WEBPACK_IMPORTED_MODULE_2__["Logger"]; });

/* harmony import */ var _type_guards_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./type-guards.helper */ "VPBO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDataView", function() { return _type_guards_helper__WEBPACK_IMPORTED_MODULE_3__["isDataView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isProgressMessage", function() { return _type_guards_helper__WEBPACK_IMPORTED_MODULE_3__["isProgressMessage"]; });

/* harmony import */ var _wakelock_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wakelock.helper */ "a7Nh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WakelockHelper", function() { return _wakelock_helper__WEBPACK_IMPORTED_MODULE_4__["WakelockHelper"]; });








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

/***/ "Dw+o":
/*!***********************************!*\
  !*** ./src/app/helpers/logger.ts ***!
  \***********************************/
/*! exports provided: LogLevel, Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["fatal"] = 5] = "fatal";
    LogLevel[LogLevel["error"] = 4] = "error";
    LogLevel[LogLevel["warn"] = 3] = "warn";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["debug"] = 1] = "debug";
    LogLevel[LogLevel["trace"] = 0] = "trace";
})(LogLevel || (LogLevel = {}));
class Logger {
    constructor() {
        this._logs = [];
    }
    log(level, message, ...meta) {
        console.log(`[${level.toUpperCase()}] ${message}`, ...meta);
        this._logs.push({ level: LogLevel[level], message, meta });
    }
    fatal(message, ...meta) {
        this.log('fatal', message, ...meta);
    }
    error(message, ...meta) {
        this.log('error', message, ...meta);
    }
    warn(message, ...meta) {
        this.log('warn', message, ...meta);
    }
    info(message, ...meta) {
        this.log('info', message, ...meta);
    }
    debug(message, ...meta) {
        this.log('debug', message, ...meta);
    }
    trace(message, ...meta) {
        this.log('trace', message, ...meta);
    }
}


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
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "6rF9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class HeartRateDevice {
    constructor(helper) {
        this.helper = helper;
    }
    connect(connectionRetries = 5) {
        return this.helper.requestDevice([_helpers__WEBPACK_IMPORTED_MODULE_2__["HEART_RATE_SERVICE"]]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeMap"])((device) => {
            const updatesStream = this.subscribeToUpdates(device, connectionRetries).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(updatesStream, this.helper.createTimeOutStream(60000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(updatesStream)));
        }));
    }
    subscribeToUpdates(device, connectionRetries) {
        let retries = 0;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(device), this.helper.createDeviceDisconnectionStream(device)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(() => retries++ < connectionRetries), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((device) => this.helper.connectServer(device)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((server) => this.helper.getService(server, _helpers__WEBPACK_IMPORTED_MODULE_2__["HEART_RATE_SERVICE"])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((service) => Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(service.getCharacteristic(_helpers__WEBPACK_IMPORTED_MODULE_2__["HEART_RATE_CHARACTERISTIC"]))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((characteristic) => this.helper.getNotifications(characteristic)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => (retries = 0)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((data) => Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["parseHeartRate"])(data)));
    }
}
HeartRateDevice.ɵfac = function HeartRateDevice_Factory(t) { return new (t || HeartRateDevice)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_helpers__WEBPACK_IMPORTED_MODULE_2__["BluetoothHelper"])); };
HeartRateDevice.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: HeartRateDevice, factory: HeartRateDevice.ɵfac });


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



class AppComponent {
    constructor() {
        document.title = `HRM Trainer Control ${_package_json__WEBPACK_IMPORTED_MODULE_0__["version"]}`;
    }
    get version() {
        return _package_json__WEBPACK_IMPORTED_MODULE_0__["version"];
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 1, consts: [[1, "version-display", "text-muted"], [1, "container", "d-flex", "flex-column", "h-100", "pb-3"], [1, "flex-grow-1"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "small", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "heart-rate", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.version);
    } }, directives: [_heart_rate_heart_rate_component__WEBPACK_IMPORTED_MODULE_2__["HeartRateComponent"]], styles: [".version-display[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.5rem;\n  top: 1.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7QUFBSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi52ZXJzaW9uLWRpc3BsYXl7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAwLjVyZW07XG4gICAgdG9wOiAxLjVyZW07XG59XG4iXX0= */"] });


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _devices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../devices */ "YudN");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers */ "6rF9");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






function HeartRateComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeartRateComponent_div_1_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r5.dismissMessages(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.warningMessage, " ");
} }
function HeartRateComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeartRateComponent_div_2_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r7.dismissMessages(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.errorMessage, " ");
} }
function HeartRateComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeartRateComponent_div_4_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r9.connectSensor(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx_r2.buttonEnabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r2.buttonText);
} }
function HeartRateComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r3.heartRate, " ");
} }
function HeartRateComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeartRateComponent_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.disconnect(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const connectButtonText = 'Connect HRM';
class HeartRateComponent {
    constructor(heartRateDevice, wakelockHelper, logger) {
        this.heartRateDevice = heartRateDevice;
        this.wakelockHelper = wakelockHelper;
        this.logger = logger;
        this._buttonText = connectButtonText;
        this._buttonEnabled = true;
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
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = undefined;
            }
            this.reset();
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
        this.subscription.add(this.wakelockHelper.maintainWakeLock().subscribe());
    }
    reset() {
        this._buttonEnabled = true;
        this._buttonText = connectButtonText;
        this._warningMessage = undefined;
        this._errorMessage = undefined;
        this._heartRate = undefined;
    }
    handleUpdate(result) {
        this.reset();
        this._buttonEnabled = false;
        this._buttonText = undefined;
        this._heartRate = result.heartRate;
        this.logger.trace(`Heart Rate Result`, result);
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
}
HeartRateComponent.ɵfac = function HeartRateComponent_Factory(t) { return new (t || HeartRateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_devices__WEBPACK_IMPORTED_MODULE_3__["HeartRateDevice"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_helpers__WEBPACK_IMPORTED_MODULE_4__["WakelockHelper"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_helpers__WEBPACK_IMPORTED_MODULE_4__["Logger"])); };
HeartRateComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HeartRateComponent, selectors: [["heart-rate"]], decls: 9, vars: 5, consts: [[1, "d-flex", "flex-column", "h-100"], ["class", "alert alert-warning alert-dismissible mt-3", 4, "ngIf"], ["class", "alert alert-danger alert-dismissible mt-3", 4, "ngIf"], [1, "center-content", "position-relative"], ["class", "button-overlay center-content", 4, "ngIf"], ["class", "button-overlay center-content heart-rate", 4, "ngIf"], [1, "bi-heart-fill"], ["type", "button", "class", "close close-button", "aria-label", "Close", 3, "click", 4, "ngIf"], [1, "alert", "alert-warning", "alert-dismissible", "mt-3"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "alert", "alert-danger", "alert-dismissible", "mt-3"], [1, "button-overlay", "center-content"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], [1, "button-overlay", "center-content", "heart-rate"], ["type", "button", "aria-label", "Close", 1, "close", "close-button", 3, "click"]], template: function HeartRateComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, HeartRateComponent_div_1_Template, 5, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, HeartRateComponent_div_2_Template, 5, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, HeartRateComponent_div_4_Template, 3, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, HeartRateComponent_div_5_Template, 2, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, HeartRateComponent_button_8_Template, 3, 0, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.warningMessage != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.errorMessage != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.buttonText != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.heartRate != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.canDisconnect);
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
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers */ "6rF9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_devices_heart_rate_device__WEBPACK_IMPORTED_MODULE_5__["HeartRateDevice"], _helpers__WEBPACK_IMPORTED_MODULE_6__["Logger"], _helpers__WEBPACK_IMPORTED_MODULE_6__["BluetoothHelper"], _helpers__WEBPACK_IMPORTED_MODULE_6__["WakelockHelper"]], imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"], _components_heart_rate_heart_rate_component__WEBPACK_IMPORTED_MODULE_3__["HeartRateComponent"], _components_trainer_trainer_component__WEBPACK_IMPORTED_MODULE_4__["TrainerComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]] }); })();


/***/ }),

/***/ "a7Nh":
/*!********************************************!*\
  !*** ./src/app/helpers/wakelock.helper.ts ***!
  \********************************************/
/*! exports provided: WakelockHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WakelockHelper", function() { return WakelockHelper; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger */ "Dw+o");




class WakelockHelper {
    constructor(logger) {
        this.logger = logger;
    }
    maintainWakeLock() {
        return this.requestWakeLock().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((v) => this.listenForRelease(v)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(() => this.requestWakeLock()));
    }
    requestWakeLock() {
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
            let _sentinel;
            navigator.wakeLock.request('screen').then((sentinel) => {
                this.logger.info('Wake Lock Obtained', sentinel);
                _sentinel = sentinel;
                observer.next(sentinel);
            }, (error) => observer.error(error));
            return {
                unsubscribe: () => {
                    if (_sentinel != null) {
                        this.logger.info(`Releasing wakelock`);
                        _sentinel.release();
                    }
                },
            };
        });
    }
    listenForRelease(sentinel) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
            this.logger.info(`Listening for wake lock release`);
            sentinel.addEventListener('onrelease', (event) => {
                this.logger.warn(`Wake Lock Released`);
                observer.next(event);
            });
        });
    }
}
WakelockHelper.ɵfac = function WakelockHelper_Factory(t) { return new (t || WakelockHelper)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"])); };
WakelockHelper.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: WakelockHelper, factory: WakelockHelper.ɵfac });


/***/ }),

/***/ "cJ4H":
/*!*********************************************!*\
  !*** ./src/app/helpers/bluetooth.helper.ts ***!
  \*********************************************/
/*! exports provided: BluetoothHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BluetoothHelper", function() { return BluetoothHelper; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger */ "Dw+o");




class BluetoothHelper {
    constructor(logger) {
        this.logger = logger;
    }
    requestDevice(services, maxRetries = 5, retries = 0) {
        this.logger.info('Requesting Device...', services);
        const requestStream = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(navigator.bluetooth.requestDevice({ filters: [{ services }] })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((device) => this.logger.info(`Device Selected: ${device.name}`, device)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((err) => {
            if (retries >= maxRetries || err.name === 'NotFoundError') {
                throw err;
            }
            else {
                this.logger.error(`Error selecting device`, err);
                return this.requestDevice(services, maxRetries, retries + 1);
            }
        }));
        return requestStream;
    }
    connectServer(device, maxRetries = 5, retries = 0) {
        if (device.gatt == null) {
            throw new Error(`gatt is not defined on device`);
        }
        const server = device.gatt;
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
            let unsubscribed = false;
            this.logger.info(`Connecting to Server...`);
            server.connect().then(() => {
                if (unsubscribed) {
                    server.disconnect();
                }
                else {
                    this.logger.info(`Server Connected...`, server);
                    observer.next(server);
                }
            }, (error) => observer.error(error));
            return {
                unsubscribe: () => {
                    unsubscribed = true;
                    if (server.connected) {
                        this.logger.info(`connectServer.unsubscribe: Disconnecting from server...`, server);
                        server.disconnect();
                    }
                    else {
                        this.logger.info(`connectServer.unsubscribe: Server already disconnected`, server);
                    }
                },
            };
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((err) => {
            if (retries < maxRetries) {
                this.logger.error(`Error connecting to server`, err);
                return this.connectServer(device, maxRetries, retries + 1);
            }
            else {
                throw err;
            }
        }));
    }
    getService(server, service, maxRetries = 5, retries = 0) {
        this.logger.info(`Getting Service '${service}'...`, server);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(server.getPrimaryService(service)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((service) => this.logger.info(`Service Connected`, service)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((err) => {
            this.logger.error(`Error getting service '${service}' (${retries})`, err);
            if (!server.connected) {
                return this.connectServer(server.device, maxRetries, retries + 1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((newConnectionServer) => this.getService(newConnectionServer, service, maxRetries, retries + 1)));
            }
            else if (retries < maxRetries) {
                return this.getService(server, service, maxRetries, retries + 1);
            }
            else {
                throw err;
            }
        }));
    }
    getNotifications(characteristic) {
        characteristic.startNotifications();
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
            function handleEvent() {
                if (characteristic.value != null) {
                    observer.next(characteristic.value);
                }
            }
            this.logger.info(`Starting Notifications`, characteristic);
            characteristic.addEventListener('characteristicvaluechanged', handleEvent);
            return {
                unsubscribe: () => {
                    this.logger.info(`UNsubscribe from Notifications`, characteristic);
                    characteristic.removeEventListener('characteristicvaluechanged', handleEvent);
                },
            };
        });
    }
    createTimeOutStream(timeInMs) {
        this.logger.info(`Starting timeout stream...`, timeInMs);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["interval"])(timeInMs).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => {
            this.logger.warn(`Stream time out`);
            throw new Error(`Timeout waiting for device connection.`);
        }));
    }
    createDeviceDisconnectionStream(device) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
            const logger = this.logger;
            function handleEvent() {
                logger.info(`Device '${device.name}' disconnected`, device);
                observer.next(device);
            }
            logger.info(`Add event listener: gattserverdisconnected`, device);
            device.addEventListener('gattserverdisconnected', handleEvent);
            return {
                unsubscribe: () => {
                    this.logger.info(`Remove Event Listener: gattserverdisconnected`);
                    device.removeEventListener('gattserverdisconnected', handleEvent);
                },
            };
        });
    }
}
BluetoothHelper.ɵfac = function BluetoothHelper_Factory(t) { return new (t || BluetoothHelper)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_logger__WEBPACK_IMPORTED_MODULE_3__["Logger"])); };
BluetoothHelper.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: BluetoothHelper, factory: BluetoothHelper.ɵfac });


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

module.exports = JSON.parse("{\"name\":\"hrm-trainer-control\",\"version\":\"0.1.8\",\"scripts\":{\"start\":\"ng serve --open\",\"build\":\"ng build\",\"lint\":\"eslint . --ext .ts,.js\",\"lint:fix\":\"eslint . --ext .ts,.js --fix\",\"prepublishOnly\":\"npm run verify-release\",\"test\":\"karma start --singleRun --browsers ChromeHeadless\",\"test:watch\":\"karma start\",\"verify-release\":\"concurrently --kill-others-on-fail npm:build npm:lint npm:test\"},\"private\":true,\"dependencies\":{\"@angular/animations\":\"~11.1.2\",\"@angular/common\":\"~11.1.2\",\"@angular/compiler\":\"~11.1.2\",\"@angular/core\":\"~11.1.2\",\"@angular/forms\":\"~11.1.2\",\"@angular/platform-browser\":\"~11.1.2\",\"@angular/platform-browser-dynamic\":\"~11.1.2\",\"@angular/router\":\"~11.1.2\",\"bootstrap\":\"^4.6.0\",\"bootstrap-icons\":\"^1.3.0\",\"jquery\":\"^3.5.1\",\"rxjs\":\"~6.6.0\",\"zone.js\":\"~0.11.3\"},\"devDependencies\":{\"@angular-devkit/build-angular\":\"~0.1101.4\",\"@angular/cli\":\"~11.1.4\",\"@angular/compiler-cli\":\"~11.1.2\",\"@types/dom-screen-wake-lock\":\"^1.0.0\",\"@types/jasmine\":\"^3.6.3\",\"@types/node\":\"^12.11.1\",\"@types/web-bluetooth\":\"0.0.9\",\"@typescript-eslint/eslint-plugin\":\"^4.15.0\",\"@typescript-eslint/parser\":\"^4.15.0\",\"concurrently\":\"^5.3.0\",\"eslint\":\"^7.2.0\",\"eslint-config-prettier\":\"^7.2.0\",\"eslint-config-standard\":\"^14.1.1\",\"eslint-plugin-import\":\"^2.22.1\",\"eslint-plugin-node\":\"^11.1.0\",\"eslint-plugin-prettier\":\"^3.3.1\",\"eslint-plugin-promise\":\"^4.3.1\",\"eslint-plugin-simple-import-sort\":\"^7.0.0\",\"eslint-plugin-standard\":\"^5.0.0\",\"jasmine\":\"^3.6.4\",\"karma\":\"^6.1.1\",\"karma-chrome-launcher\":\"^3.1.0\",\"karma-coverage-istanbul-reporter\":\"^3.0.3\",\"karma-jasmine\":\"^4.0.1\",\"karma-jasmine-html-reporter\":\"^1.5.4\",\"karma-source-map-support\":\"^1.4.0\",\"karma-sourcemap-loader\":\"^0.3.8\",\"karma-webpack\":\"^4.0.2\",\"popper.js\":\"^1.16.1\",\"prettier\":\"^2.2.1\",\"puppeteer\":\"^7.1.0\",\"ts-loader\":\"^8.0.17\",\"typescript\":\"~4.1.2\",\"webpack\":\"^4.46.0\"},\"description\":\"This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.\",\"main\":\".eslintrc.js\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Roaders/hrm-trainer-control.git\"},\"keywords\":[],\"author\":\"\",\"license\":\"ISC\",\"bugs\":{\"url\":\"https://github.com/Roaders/hrm-trainer-control/issues\"},\"homepage\":\"https://github.com/Roaders/hrm-trainer-control#readme\"}");

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