/* eslint-disable @typescript-eslint/no-explicit-any */

[
    (require as any).context('./', true, /\.spec\.ts$/),
    (require as any).context('./app', true, /\.ts$/),
].forEach((context) => context.keys().map(context));
