import { Logger } from "../../../utils/logger";
import { Modal } from "./Modal";

export class ModalModule {

    private logger = new Logger();

    async open<T extends Modal<TResult>, TResult = void>(modal: T): Promise<TResult> {
        const promise = new Promise<TResult>((res, rej) => {
            try {
                this._open<T, TResult>(modal, res, rej);
            } catch (error) {
                this.logger.error('open error', error);
            }
        });

        const result = await promise;
        return result;
    }

    private _open<T extends Modal<TResult>, TResult = void>(modal: T, res: (x: TResult) => void, rej: (x: any) => void) {
        modal.setCallbacks(res, rej);
        modal.render(true);
    }
}
