import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import winston from 'winston';
import user from './src/routes/index.js';


const app = express();


dotenv.config();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use(user)

const port = process.env.PORT || 3000;
const mongooseConnectionOptions = { useUnifiedTopology: true }; 

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

app.listen(port, () => logger.info(`App listening on ${port}`));

const connect = () => {
  return mongoose
    .connect('mongodb://localhost:27017/wait-list', mongooseConnectionOptions)
    .then(() => logger.info(`Connected to database successfully...`));
};

await connect();

// app.get('/', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Welcome' });
// });
