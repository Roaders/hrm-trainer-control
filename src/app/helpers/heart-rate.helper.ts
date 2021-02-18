import { HeartRateResult } from '../contracts';
import { now } from './timer.helper';
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

    const timestamp = now();
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

    return { heartRate, timestamp, ...result };
}

type HeartRatePair = [HeartRateResult, HeartRateResult?];
type ValueDuration = { value: number; duration: number };

export function averageHeartRate(readings: HeartRateResult[]): number {
    const { duration, value } = readings
        .reduce<HeartRatePair[]>(reduceToPairs, [])
        .map(pairToAverageForDuration)
        .reduce(sumValueAndDuration, { value: 0, duration: 0 });

    return Math.round(duration === 0 ? value : value / duration);
}

function sumValueAndDuration(total: ValueDuration, current: ValueDuration): ValueDuration {
    const duration = total.duration + current.duration;

    if (duration === 0 && total.value === 0) {
        return { duration, value: current.value };
    }

    return { duration, value: total.value + current.duration * current.value };
}

function pairToAverageForDuration(pair: HeartRatePair): ValueDuration {
    if (pair[1] == null) {
        return { value: pair[0].heartRate, duration: 0 };
    }

    const duration = pair[1].timestamp - pair[0].timestamp;
    const average = (pair[0].heartRate + pair[1].heartRate) / 2;

    return { value: average, duration };
}

function reduceToPairs(
    pairs: HeartRatePair[],
    result: HeartRateResult,
    index: number,
    readings: HeartRateResult[],
): HeartRatePair[] {
    console.log(`index: ${index} mod 2 ${index % 2}`);
    console.log(`index: ${index}`);

    if (index % 2 === 0) {
        pairs.push([result, readings[index + 1]]);
    }

    return pairs;
}
