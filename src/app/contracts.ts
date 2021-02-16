export type HeartRateResult = {
    heartRate: number;
    contactDetected?: boolean;
    energyExpended?: number;
    rrIntervals?: number[];
};

export type TrainerResult = {
    power: number;
};

export type ProgressMessage = {
    type: 'progressMessage';
    message: string;
};
