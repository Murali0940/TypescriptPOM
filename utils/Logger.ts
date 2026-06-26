export class Logger {

    static info(message: string) {
        console.log(`[INFO] ${message}`);
    }

    static pass(message: string) {
        console.log(`[PASS] ${message}`);
    }

    static error(message: string) {
        console.log(`[ERROR] ${message}`);
    }
}