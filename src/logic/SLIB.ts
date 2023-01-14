import { Logger } from "../utils/logger";
import { Rolls } from "./rolls/rolls";

export class SLIB {
    private _log = new Logger();

    rolls = new Rolls();

    constructor() {
        this._log.info('init');
    }
}
