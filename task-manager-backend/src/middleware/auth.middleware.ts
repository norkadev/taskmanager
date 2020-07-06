import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exception/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exception/WrongAuthenticationTokenException';
import DataStoredInToken from '../interface/dataStoredInToken';
import RequestWithUser from '../interface/requestWithUser.interface';
import userModel from '../user/user.model';

/*async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
            const emailToFind = verificationResponse._email;
            const user = await userModel.findOne({ email: emailToFind });
            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}*/

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    const requestHeader = "x-jwt-token";
    const header = request.header(requestHeader);
    if (header) {
        const secret = process.env.JWT_SECRET;
        try {
            console.log(`En authMiddleware ${header}`);
            const verificationResponse = jwt.verify(header, secret) as DataStoredInToken;
            const emailToFind = verificationResponse._email;
            const user = await userModel.findOne({ email: emailToFind });
            if (user) {
                request.user = user;
                next();
                console.log("Luego de llamar a next()");
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default authMiddleware;