export type HeartRateResult = {
    timestamp: number;
    heartRate: number;
    contactDetected?: boolean;
    energyExpended?: number;
    rrIntervals?: number[];
};

export type ProgressMessage = {
    type: 'progressMessage';
    message: string;
};
