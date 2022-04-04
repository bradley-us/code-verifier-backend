import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// Config the .env file
dotenv.config();

// Create the Express APP
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Define the first route of the app
app.get('/hello', (req: Request, res: Response) => {
    // Send Hello World
    res.send('Welcome to App express + Nodemon + JEST + TS + Swagger + Mongoose');
});

// Execute APP and listen requests to PORT
app.listen(port, () => console.log(`Running EXPRESS SERVER ON: http://localhost:${port}`));