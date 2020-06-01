
let counter = 1;

export const time = async <T>(callback: () => (T | Promise<T>), name: string = `TEST-${counter}`) => {
  const start = process.hrtime();
  const result = await callback();
  const [seconds, nanoSeconds] = process.hrtime(start);
  const timeElapsed = seconds + (nanoSeconds * Math.pow(10, -9));
  console.table({ [name]: result, time: timeElapsed.toFixed(4) + 's' });
  counter++;
  return {
    result,
    duration: [seconds, nanoSeconds]
  };
};

export default time;
