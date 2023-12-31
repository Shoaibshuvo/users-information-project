import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/config/modules/user/user.routes';

const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to API');
});

export default app;
