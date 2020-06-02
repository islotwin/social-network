
type TickLoggerParams = {
  total: number;
  tag: string;
  logCount?: number;
}

const percentString = (dec: number) => {
  return `${(dec * 100).toFixed(2)}%`;
};

const createTick = () => {
  const t = process.hrtime();

  return {
    tock: () => {
      const [s, ns] = process.hrtime(t);
      return `${s + (ns / 1e9)}s`;
    }
  };
};

export const tickLogger = ({ total, tag, logCount = 1000 }: TickLoggerParams) => {
  let current = 1;

  const logInterval = Math.round(total / logCount);

  let ticksUntilLog = 0;

  const tick = createTick();

  return (comment = '') => {
    if (ticksUntilLog === 0) {
      console.log(`[TICK] (${tag})`, (new Date()).toLocaleTimeString(), percentString(current / total), comment);
      ticksUntilLog = logInterval;
    } else {
      ticksUntilLog--;
    }
    if (current === total) {
      console.log(`[TICK] (${tag})`, `Finished in ${tick.tock()}`, comment);
    }
    current++;
  };
};
