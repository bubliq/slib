import { SLIB } from "./logic/SLIB";
import { Logger } from "./utils/logger";

const logger = new Logger();

declare global {
    var _slib: SLIB;
}

// other.ts
globalThis._slib = new SLIB();