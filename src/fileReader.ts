import { ReadLine } from 'readline';

export const readFile = (rl: ReadLine): Promise<[string, string][]> => {
  const lines = [];

  rl.on('line', line => {
    if (line.trim()) {
      lines.push(line.trim().split(/\s/));
    }
  });

  return new Promise((resolve) => {
    rl.on('close', () => {
      resolve(lines);
    });
  });
};
