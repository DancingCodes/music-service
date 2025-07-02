class Response {
    static success(data = null) {
        return this.createBody(200, data, 'success');
    }

    static error(message = 'error') {
        return this.createBody(500, null, message);
    }

    private static createBody<T>(status: number, data: T, message: string) {
        return {
            status,
            data,
            message
        };
    }
}
export default Response