import * as express from 'express';
import Task from './task.interface';
import RequestWithUser from '../interface/requestWithUser.interface';
import taskModel from './tasks.model';
import TaskDto from './task.dto';
import TasktNotFoundException from '../exception/TaskNotFoundException'
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from '../middleware/auth.middleware';

class TaskController {
    public path = '/task';
    public router = express.Router();
    private task = taskModel;

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {

        this.router
            .all(`${this.path}/*`, authMiddleware)
            .get(`${this.path}/:id`, this.getTaskById)
            .patch(`${this.path}/:id`, authMiddleware, validationMiddleware(TaskDto, true), this.modifyTask)
            .delete(`${this.path}/:id`, authMiddleware, this.deleteTask)
            .post(this.path, authMiddleware, validationMiddleware(TaskDto), this.createTask);
    }

    private getTaskById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.task.findById(id)
            .then((task) => {
                if (task) {
                    response.send(task);
                } else {
                    next(new TasktNotFoundException(id));
                }

            });
    }

    private modifyTask = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const taskData: Task = request.body;
        this.task.findByIdAndUpdate(id, taskData, { new: true })
            .then((task) => {
                if (task) {
                    response.send(task);
                } else {
                    next(new TasktNotFoundException(id));
                }
            });
    }

    private createTask = async (request: RequestWithUser, response: express.Response) => {
        const taskData: TaskDto = request.body;
        const createdTask = new this.task({
            ...taskData,
            owner: request.user._id,
        });
        const savedTask = await createdTask.save();
        await savedTask.populate('owner', '-password').execPopulate();
        console.log(savedTask);
        response.send(savedTask);
    }

    private deleteTask = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.task.findByIdAndDelete(id)
            .then((successResponse) => {
                if (successResponse) {
                    response.send({ status: "deleted" });
                } else {
                    next(new TasktNotFoundException(id));
                }
            });
    }

}

export default TaskController;