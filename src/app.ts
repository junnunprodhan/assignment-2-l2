import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route';

const app:Application = express()

// parsers
app.use(express.json());
app.use(cors())

app.use('/api', UserRoutes);
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
// console.log('hello world')
})


  export default app;