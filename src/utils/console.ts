import { inspect } from 'util';

export const Console = {
  log: async (...logVar: any) => {
    if (process.env.NODE_ENV === 'production') return;
    console.log(logVar);
    await fetch('/api/console', {
      method: 'POST',
      body: JSON.stringify({ data: inspect(logVar, false, 6) }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
