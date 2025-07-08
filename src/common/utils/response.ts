export class R<T> {
    public code: number;
    public message: string;
    public data?: T;

    constructor(code = 200, message = 'success', data?: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static success<T>(data?: T, msg = 'success') {
        return new R(200, msg, data);
    }

    static error(msg = 'error', code = 500) {
        return new R(code, msg);
    }
}
