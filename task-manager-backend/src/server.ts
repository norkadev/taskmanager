import 'dotenv/config';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import validateEnv from './utils/validateEnv';
import UserController from './user/user.controller';
import TaskController from './task/task.controller';

validateEnv();

const app = new App(
    [
        new AuthenticationController(),
        new UserController(),
        new TaskController()
    ]
);

app.listen();