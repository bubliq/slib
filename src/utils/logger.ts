import { COLORS } from "./colors";

export class Logger {
    private prefix = `%c slib`;

    log(...args: any[]) {
        const style = this.style({
            font: COLORS.white.primary,
            background: COLORS.green.dark,
        });

        console.log(this.prefix, style, ...args);
    }
    
    info(...args: any[]) {
        const style = this.style({
            font: COLORS.white.primary,
            background: COLORS.blue.dark,
        });

        console.info(this.prefix, style, ...args);
    }

    error(...args: any[]) {
        const style = this.style({
            font: COLORS.white.primary,
            background: COLORS.red.dark,
        });

        console.error(this.prefix, style, ...args);
    }

    private style(options: { font: string; background: string }) {
        let css = `background:${options.background};color:${options.font}; padding-right: 5px; padding-left: 0; border-right: 1px solid ${options.font}`;
        return css;
    }
}
