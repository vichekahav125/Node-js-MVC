export class BaseController {
    async success(res, message, data, status = 200) {
        const response = {
            status: true,
            message,
            data
        };
        res.status(status).json(response);
    }

    async error(res, message, status = 500) {
        const response = {
            status: false,
            message
        };
        res.status(status).json(response);
    }
}
