import { ProgressMessage } from '../contracts';

export function createProgress(message: string): ProgressMessage {
    return { message, type: 'progressMessage' };
}
