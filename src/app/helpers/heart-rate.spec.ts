import { parseHeartRate } from './heart-rate.helper';

describe('heart-rate.helper', () => {
    it('should fail', () => {
        fail('to be implemented');
    });
    it('should fail again', () => {
        fail('to be implemented');
    });

    it('should parse heart rate', () => {
        const result = parseHeartRate(new ArrayBuffer(5));

        expect(result.heartRate).toBe(60);
    });
});
