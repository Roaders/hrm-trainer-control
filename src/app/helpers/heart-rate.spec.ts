import { replaceProperties } from '@morgan-stanley/ts-mocking-bird';
import { from } from 'rxjs';
import { scan, toArray } from 'rxjs/operators';

import { HeartRateAverage, HeartRateResult } from '../contracts';
import {
    averageHeartRate,
    calculateTrend,
    contactDetected,
    contactSensorPresent,
    energyPresent,
    parseHeartRate,
    rate16Bits,
    rrIntervalPresent,
} from './heart-rate.helper';
import * as sampleData from './heart-rate.test-data.json';
import * as timerImport from './timer.helper';

const sampleResults: HeartRateResult[] = sampleData
    .map((d) => ({ heartRate: d.heartRate, timestamp: d.at }))
    .sort((one, two) => one.timestamp - two.timestamp);

describe('heart-rate.helper', () => {
    describe('parseHeartRate', () => {
        const currentTimestamp = new Date(2021, 0, 0).getTime();
        function createResult(values?: Partial<HeartRateResult>): HeartRateResult {
            return {
                heartRate: 60,
                timestamp: currentTimestamp,
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

        replaceProperties(timerImport, { now: () => currentTimestamp });

        it('should add a timestamp', () => {
            const result = parseHeartRate(createView());

            expect(result.timestamp).toBe(currentTimestamp);
        });

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
    });

    describe('averageHeartRate', () => {
        const tests: { expected: number; readings: HeartRateResult[] }[] = [
            { expected: 65, readings: [{ heartRate: 65, timestamp: 10 }] },
            {
                expected: 70,
                readings: [
                    { heartRate: 60, timestamp: 10 },
                    { heartRate: 80, timestamp: 20 },
                ],
            },
            {
                expected: 70,
                readings: [
                    { heartRate: 60, timestamp: 10 },
                    { heartRate: 60, timestamp: 20 },
                    { heartRate: 80, timestamp: 20 },
                    { heartRate: 80, timestamp: 30 },
                ],
            },
            {
                expected: 70,
                readings: [
                    { heartRate: 80, timestamp: 30 },
                    { heartRate: 80, timestamp: 20 },
                    { heartRate: 60, timestamp: 20 }, // TODO write test that fails with incorrect order
                    { heartRate: 60, timestamp: 10 },
                ],
            },
            {
                expected: 61,
                readings: sampleResults.filter((d) => d.timestamp < 1613397117528),
            },
        ];

        tests.forEach((test) => {
            it(`should return an average of ${test.expected} for readings ${
                test.readings.length > 5 ? '[sample data]' : JSON.stringify(test.readings)
            }`, () => {
                expect(averageHeartRate(test.readings)).toEqual(test.expected);
            });
        });

        it(`should return correct average for batched heart rate readings`, () => {
            const averages = sampleResults
                .reduce<HeartRateResult[][]>(groupResults, [[]])
                .map((group) => averageHeartRate(group));

            expect(averages).toEqual([67, 83, 110, 112, 112, 117, 119]);
        });
    });

    describe('heartRateTrend', () => {
        it('should add the heart rate trend to averages', () => {
            const averages = sampleResults
                .reduce<HeartRateResult[][]>(groupResults, [[]])
                .map((group) => averageHeartRate(group));

            let trends: HeartRateAverage[] | undefined;

            from(averages)
                .pipe(
                    scan<number, HeartRateAverage>(calculateTrend, { average: NaN, trend: NaN }),
                    toArray(),
                )
                .subscribe((result) => (trends = result));

            expect(trends).toEqual([
                { average: 67, trend: 0 },
                { average: 83, trend: 16 },
                { average: 110, trend: 27 },
                { average: 112, trend: 2 },
                { average: 112, trend: 0 },
                { average: 117, trend: 5 },
                { average: 119, trend: 2 },
            ]);
        });
    });

    function groupResults(groups: HeartRateResult[][], result: HeartRateResult): HeartRateResult[][] {
        const groupTimeSpan = 1000 * 60;
        const group = groups[groups.length - 1];
        const firstResult: HeartRateResult | undefined = group[0];
        const elapsed = firstResult ? result.timestamp - firstResult.timestamp : 0;

        if (elapsed < groupTimeSpan) {
            group.push(result);
        } else {
            groups.push([result]);
        }

        return groups;
    }
});
