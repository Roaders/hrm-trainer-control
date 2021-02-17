import { HeartRateResult } from '../contracts';
import { isDataView } from './type-guards.helper';

export const HEART_RATE_SERVICE = 'heart_rate';
export const HEART_RATE_CHARACTERISTIC = `heart_rate_measurement`;

export const rate16Bits = 0x1;
export const contactDetected = 0x2;
export const contactSensorPresent = 0x4;
export const energyPresent = 0x8;
export const rrIntervalPresent = 0x10;

export function parseHeartRate(value: DataView | ArrayBuffer): HeartRateResult {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = isDataView(value) ? value : new DataView(value);

    const flags = value.getUint8(0);
    const rate16BitsFlag = flags & rate16Bits;
    const result: Partial<HeartRateResult> = {};

    let index = 1;
    let heartRate: number;
    if (rate16BitsFlag) {
        heartRate = value.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    } else {
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

    return { heartRate, ...result };
}
