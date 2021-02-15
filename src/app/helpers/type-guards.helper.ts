import { ProgressMessage } from '../contracts';

export function isDataView(value: unknown): value is DataView {
    return value != null && (value as DataView).buffer instanceof ArrayBuffer;
}

export function isProgressMessage(value: unknown): value is ProgressMessage {
    return value != null && (value as ProgressMessage).type === 'progressMessage';
}
