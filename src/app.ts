import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route';
import bodyParser from 'body-parser';

const app:Application = express()

// parsers
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())


app.use('/api', UserRoutes);
app.get('/', (req:Request, res:Response) => {
  res.send('users API is running')
})


  export default app;