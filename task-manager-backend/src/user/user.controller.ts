import * as express from 'express';
import NotAuthorizedException from '../exception/NotAuthorizedException';
import Controller from '../interface/controller.interface';
import RequestWithUser from '../interface/requestWithUser.interface';
import authMiddleware from '../middleware/auth.middleware';
import taskModel from '../task/tasks.model';

class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    private task = taskModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id/task`, authMiddleware, this.getAllTasksOfUser);
    }

    private getAllTasksOfUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
        const userId = request.params.id;
        if (userId === request.user._id.toString()) {
            const tasks = await this.task.find({ owner: userId });
            response.send(tasks);
        }
        next(new NotAuthorizedException());
    }
}

export default UserController;