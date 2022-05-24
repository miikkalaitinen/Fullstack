interface Result {
  periodLength?: number;
  trainingDays?: number;
  success?: boolean;
  rating?: number;
  ratingDescription?: string;
  target?: number;
  average?: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  if (periodLength === 0) throw Error('Must have at least 1 day of training');

  const trainingDays = hours.filter((h) => h !== 0).length;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  const profit = average - target;

  const rateProfit = (profit: number): [string, number, boolean] => {
    if (profit < -1) return ['Did you even try', 1, false];
    if (profit < 0) return ['not too bad but could be better', 2, false];
    else return ['Good job, you reached your target', 3, true];
  };

  const [ratingDescription, rating, success] = rateProfit(profit);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export const parseHours = (args: Array<string>): number[] => {
  if (args.length < 3) throw new Error('Not enough arguments');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_first, _second, ...rest] = args;
  const hours = rest.map((h) => Number(h));

  if (hours.every((h) => !isNaN(h))) {
    return hours;
  } else throw Error('All arguments must be numbers');
};

try {
  console.log(calculateExercises(parseHours(process.argv), 2));
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log('Ran into an error: ', err.message);
  } else console.log('Something went wrong');
}
