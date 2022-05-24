import express from 'express';
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
    if (err instanceof Error) res.json({ error: err.message });
    res.json({ error: 'Something Bad Happened' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const exercises = parseHours(req.body.exercises as string[]);
  const target = req.body.target;

  res.send('Yeah');
});

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.listen(3001, () => {
  console.log('Server running');
});
