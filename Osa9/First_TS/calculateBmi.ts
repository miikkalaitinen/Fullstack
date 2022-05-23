const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) throw Error('Weight must not be 0');
  else {
    const bmi: number = weight / ((height / 100) * (height / 100));
    if (bmi < 18.5) return 'Underweight (Unhealthy)';
    if (bmi >= 18.5 && bmi < 25) return 'Normal range (Healthy)';
    if (bmi >= 25 && bmi < 30) return 'Overweight (At risk)';
    if (bmi >= 30) return 'Overweight (At risk)';
    else return 'You should not react this';
  }
};

interface InputValues {
  weight: number;
  height: number;
}

const parseArguments = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { weight, height } = parseArguments(process.argv);
  console.log(calculateBmi(weight, height));
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log('Ran into an error: ', err.message);
  } else console.log('Something went wrong');
}
