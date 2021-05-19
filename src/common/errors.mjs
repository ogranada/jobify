
export class DBError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
