import { HeartRateResult } from '../contracts';
import {
    contactDetected,
    contactSensorPresent,
    energyPresent,
    parseHeartRate,
    rate16Bits,
    rrIntervalPresent,
} from './heart-rate.helper';

describe('heart-rate.helper', () => {
    it('should parse heart rate given an array buffer', () => {
        const result = parseHeartRate(createView().buffer);

        expect(result.heartRate).toBe(60);
    });

    it('should parse heart rate given a data view', () => {
        const result = parseHeartRate(createView());

        expect(result.heartRate).toBe(60);
    });

    it('should parse 16 bit heart rate', () => {
        const result = parseHeartRate(createView({ heartRate: 300 }));

        expect(result.heartRate).toBe(300);
    });

    it('should parse contact detected', () => {
        const result = parseHeartRate(createView({ contactDetected: true }));

        expect(result.contactDetected).toBe(true);
    });

    it('should parse energy expended', () => {
        const result = parseHeartRate(createView({ energyExpended: 1234 }));

        expect(result.energyExpended).toBe(1234);
    });

    it('should parse rrInterval', () => {
        const result = parseHeartRate(createView({ rrIntervals: [300, 500] }));

        expect(result.rrIntervals).toEqual([300, 500]);
    });

    function createResult(values?: Partial<HeartRateResult>): HeartRateResult {
        return {
            heartRate: 60,
            ...values,
        };
    }

    function createView(values?: Partial<HeartRateResult>) {
        const result = createResult(values);
        let length = 2;
        let flags = 0;

        if (result.heartRate > 255) {
            flags = rate16Bits;
            length++;
        }

        if (result.contactDetected) {
            flags = flags | contactDetected | contactSensorPresent;
        }

        if (result.energyExpended != null) {
            length += 2;
            flags = flags | energyPresent;
        }

        if (result.rrIntervals != null) {
            length += result.rrIntervals.length * 2;
            flags = flags | rrIntervalPresent;
        }

        const view = new DataView(new ArrayBuffer(length));

        let index = 2;
        view.setUint8(0, flags);
        if (flags & rate16Bits) {
            view.setUint16(1, result.heartRate, true);
            index++;
        } else {
            view.setUint8(1, result.heartRate);
        }

        if (result.energyExpended) {
            view.setUint16(index, result.energyExpended, true);
            index += 2;
        }

        const rrIntervals = result.rrIntervals || [];
        rrIntervals.forEach((interval) => {
            view.setUint16(index, interval, true);
            index += 2;
        });

        return view;
    }
});
