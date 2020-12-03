import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import model from './models';
import routes from './routes';
const PORT = 5000;
/**
 * mongoose instance connection url connection
 */
mongoose.connect('mongodb://localhost:27017/todoDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
})

mongoose.connection.on('error', (err) => {
    console.log('error connected to mongo');
})
/**
 * Creates an Express application. The express() function is a top-level 
 * function exported by the express module.
 */
const app = express();

app.use(logger('dev'));
/**
 * Returns middleware that only parses json and only looks at requests 
 * where the Content-Type header matches the type option.
 */
app.use(express.json());
/**
 * Returns middleware that only parses urlencoded bodies and only looks at 
 * requests where the Content-Type header matches the type option
 */
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/**
 * serves static files and is based on serve-static 
 */
app.use(express.static(path.join(__dirname, 'public')));
routes(app);
app.listen(PORT, () => {
    console.log("server is runnning " + PORT);
})

export default app;
