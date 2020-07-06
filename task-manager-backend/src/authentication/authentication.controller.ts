import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exception/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exception/WrongCredentialsException';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../user/user.dto';
import LogInDto from './logIn.dto';
import User from '../user/user.interface';
import Controller from "../interface/controller.interface";
import DataStoredInToken from '../interface/dataStoredInToken';
import TokenData from '../interface/tokenData.interface';
import userModel from '../user/user.model';

class AuthenticationController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
    }

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = request.body;
        if (await this.user.findOne({ email: userData.email })) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await this.user.create({ email: userData.email, password: hashedPassword });
            user.password = undefined;
            const tokenData = this.createToken(user);
            response.setHeader('X-JWT-TOKEN', tokenData.token);
            response.send({ user: user, token: tokenData });
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: LogInDto = request.body;
        console.log(`El usuario ${logInData.email} esta intentando loguearse`);
        const user = await this.user.findOne({ email: logInData.email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                user.password = undefined;
                const tokenData = this.createToken(user);
                response.setHeader('X-JWT-TOKEN', tokenData.token);
                response.send({ user: user, token: tokenData });
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new WrongCredentialsException());
        }
    }

    private createCookie(tokenData: TokenData) {
        return `${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;

    }

    private createToken(user: User): TokenData {
        const expiresIn = 3600;
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            _email: user.email
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}

export default AuthenticationController;