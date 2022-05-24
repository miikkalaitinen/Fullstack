import express from 'express';
import { isUndefined } from 'util';
import { parseArguments, calculateBmi } from './calculateBmi';
import { parseHours, calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseArguments([
      '1',
      '2',
      req.query.weight as string,
      req.query.height as string,
    ]);
    const msg = calculateBmi(height, weight);
    res.json({ weight, height, bmi: msg });
  } catch (err: unknown) {
    if (err instanceof Error) res.status(400).json({});
    else res.status(500).json({ error: 'Something Bad Happened' });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!Array.isArray(req.body.daily_exercises as string[]))
      throw new Error('Malformatted parameters');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (isUndefined(req.body.target as number))
      throw new Error('Malformatted parameters');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const exercises = parseHours(req.body.daily_exercises as string[]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target);
    if (isNaN(target)) throw Error('Target must be number');
    const result = calculateExercises(exercises, target);
    res.json(result);
  } catch (err: unknown) {
    if (err instanceof Error) res.json({ error: err.message });
    else res.json({ error: 'Something Bad Happened' });
  }
});

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.listen(3002, () => {
  console.log('Server running');
});
