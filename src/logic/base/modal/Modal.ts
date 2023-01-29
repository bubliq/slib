import _ from "lodash";

type DialogArgs = Partial<DialogOptions> | undefined;

interface ModalArgs {
    data: Dialog.Data;
    options?: Partial<DialogArgs> | undefined;
    forceRender?: boolean;
}

export abstract class Modal<TResult = void> extends Dialog {
    private _resolver?: (x: TResult) => void;
    private _rejecter?: (x: any) => void;
    private forceRender = true;

    constructor(args: ModalArgs) {
        super(args.data, args.options);

        if (!_.isNil(args.forceRender)) {
            this.forceRender = args.forceRender;
        }
    }

    setCallbacks(res: (x: TResult) => void, rej: (x: any) => void) {
        this._resolver = res;
        this._rejecter = rej;
    }

    override getData(options?: DialogArgs): {
        content: string;
        buttons: Record<string, Dialog.Button<unknown>>;
    } {
        try {
            this._getData(options);
            const result = super.getData(options);
            return result;
        } catch (error) {
            if (this._rejecter) {
                this._rejecter(error);
            }

            throw error;
        }
    }

    override activateListeners(html: JQuery<HTMLElement>): void {
        this._activateListeners(html);
    }

    override render(
        force?: boolean | undefined,
        options?: Application.RenderOptions<DialogOptions> | undefined
    ): void {
        if (_.isNil(force)) {
            force = this.forceRender;
        }

        super.render(force, options);
    }

    override async close(
        options?: Application.CloseOptions | undefined
    ): Promise<void> {
        await super.close(options);

        if (_.isFunction(this._resolver)) {
            this._resolver(this.data);
        }
    }

    protected abstract _getData(options?: DialogArgs): void;
    protected abstract _activateListeners(html: JQuery<HTMLElement>): void;
}
