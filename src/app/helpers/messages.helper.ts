import { ProgressMessage } from '../contracts';

export function createProgress(message: string, data?: unknown): ProgressMessage {
    if (data != null) {
        console.log(message, data);
    } else {
        console.log(message);
    }
    return { message, type: 'progressMessage' };
}
