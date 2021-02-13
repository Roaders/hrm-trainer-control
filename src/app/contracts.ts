export type HeartRateResult = {
    heartRate: number;
    contactDetected?: boolean;
    energyExpended?: number;
    rrIntervals?: number[];
};

export type SensorLocation = 'Other' | 'Chest' | 'Wrist' | 'Finger' | 'Hand' | 'Ear Lobe' | 'Foot' | 'Unknown';
