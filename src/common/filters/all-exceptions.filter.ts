import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { R } from '../utils/response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let message = '服务器内部错误';

        if (exception instanceof HttpException) {
            const res = exception.getResponse();

            if (typeof res === 'string') {
                message = res;
            } else if (typeof res === 'object' && res.hasOwnProperty('message')) {
                if (Array.isArray(res['message'])) {
                    message = res['message'].join('; ');
                } else {
                    message = res['message'];
                }
            } else {
                message = JSON.stringify(res);
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        response.status(500).json(R.error(message));
    }
}
