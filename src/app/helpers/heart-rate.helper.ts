import { HeartRateResult } from '../contracts';
import { isDataView } from './type-guards.helper';

export function parseHeartRate(value: DataView | ArrayBuffer): HeartRateResult {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = isDataView(value) ? value : new DataView(value);
    const flags = value.getUint8(0);
    const rate16Bits = flags & 0x1;
    const result: Partial<HeartRateResult> = {};

    let index = 1;
    let heartRate: number;
    if (rate16Bits) {
        heartRate = value.getUint16(index, /*littleEndian=*/ true);
        index += 2;
    } else {
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

    return { heartRate, ...result };
}
