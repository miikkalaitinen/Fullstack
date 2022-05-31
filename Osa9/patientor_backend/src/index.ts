import express, { Request, Response, NextFunction } from 'express';
import diagnoseRouter from './routes/diagnose';
import patientRouter from './routes/patient';
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use(express.json());

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'SyntaxError')
    res.status(400).json({ error: 'Malformatted JSON' });
  else next();
});

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
