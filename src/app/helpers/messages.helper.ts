import { ProgressMessage } from '../contracts';

export function createProgress(message: string, data?: unknown): ProgressMessage {
    if (data != null) {
        console.log(`PROGRESS MESSAGE`, message, data);
    } else {
        console.log(`PROGRESS MESSAGE`, message);
    }
    return { message, type: 'progressMessage' };
}
