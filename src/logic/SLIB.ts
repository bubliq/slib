import { Logger } from "../utils/logger";
import { ModalModule } from "./base/modal/modal.module";
import { RollsModule } from "./base/rolls/rolls.module";

export class SLIB {
    private _log = new Logger();

    static rolls = new RollsModule();
    static modal = new ModalModule();

    constructor() {
        this._log.info('init');
    }
}
