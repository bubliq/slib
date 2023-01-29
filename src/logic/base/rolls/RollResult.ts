import { Evaluated } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll";
import _ from "lodash";

export type FRollResult = Evaluated<Roll<{}>>;

export class RollResult {
    isCrit: boolean;
    roll: FRollResult;
    total: number;

    constructor(result: FRollResult) {
        this.roll = result;
        this.total = this.roll._total;
        this.isCrit = this.calculateCrit(result);
    }

    private calculateCrit(rollResult: FRollResult) {
        if (!rollResult) {
            return false;
        }

        let result = false;

        const firstTerm = _.head(rollResult.terms);

        if (_.has(firstTerm, "results")) {
            const casted = firstTerm as Die;

            if (casted.faces && casted.results) {
                for (let j = 0; j < casted.results.length; j++) {
                    const r = casted.results[j];

                    if (r.active && r.result === casted.faces) {
                        result = true;
                        break;
                    }
                }
            }
        }

        return result;
    }
}
