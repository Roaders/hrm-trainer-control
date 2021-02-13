export type HeartRateResult = {
    heartRate: number;
    contactDetected?: boolean;
    energyExpended?: number;
    rrIntervals?: number[];
};
