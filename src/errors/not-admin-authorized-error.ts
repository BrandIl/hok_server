import { CustomError } from './custom-error';

export class NotAdminAuthorizedError extends CustomError {
    statusCode = 403;

    constructor() {
        super('Not Authorized');

        Object.setPrototypeOf(this, NotAdminAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Not authorized' }];
    }
}
