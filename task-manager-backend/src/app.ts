import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from "cors";
import Controller from './interface/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.APP_PORT, () => {
            console.log(`App listening on the port ${process.env.APP_PORT}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private connectToTheDatabase() {
        const {
            HOST,
            PORT,
            DB_NAME
        } = process.env;
        mongoose.connect(`mongodb://${HOST}:${PORT}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log("Succesfully connected to MondoDB!!!");
            })
            .catch(err => {
                console.error("Connection Error", err);
                process.exit();
            });
    }
}

export default App;