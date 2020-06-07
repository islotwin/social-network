
const counter: {[key: string]: number} = {};

export const time = async <T>(callback: () => (T | Promise<T>), name: string = 'TEST') => {
  const start = process.hrtime();
  const result = await callback();
  const [seconds, nanoSeconds] = process.hrtime(start);
  const timeElapsed = seconds + (nanoSeconds * Math.pow(10, -9));
  const count = counter[name];
  const label = count ? name + '-' + count : name;
  counter[name] = count ? count + 1 : 1;
  if (typeof result !== 'object') {
    console.table({ [label]: result, time: timeElapsed.toFixed(4) + 's' });
  } else {
    console.log(`[${label}] Finished in ${timeElapsed.toFixed(4)}s`);
  }
  return {
    result,
    duration: timeElapsed
  };
};

export default time;
