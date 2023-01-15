import _ from "lodash";
import { RollArgs } from "./RollArgs";
import { RollArgsBase } from "./RollArgsBase";
import { RollResult } from "./RollResult";

export class Rolls {
    async roll(formula: string, options = { async: true }) {
        const roll = new Roll(formula);
        const result = await roll.roll(options);
        return result;
    }

    async d4(options?: RollArgsBase) {
        const result = await this.rollDice({
            dice: 4,
            ...options,
        });

        return result;
    }
    async d6(options?: RollArgsBase) {
        const result = await this.rollDice({
            dice: 6,
            ...options,
        });

        return result;
    }
    async d8(options?: RollArgsBase) {
        const result = await this.rollDice({
            dice: 8,
            ...options,
        });

        return result;
    }
    async d10(options?: RollArgsBase) {
        const result = await this.rollDice({
            dice: 10,
            ...options,
        });

        return result;
    }
    
    async d12(options?: RollArgsBase) {
        const result = await this.rollDice({
            dice: 12,
            ...options,
        });

        return result;
    }
    
    async d20(options?: RollArgsBase) {
        const result = await this.rollDice({
            dice: 20,
            ...options,
        });

        return result;
    }
    
    async d100(options?: RollArgsBase) {
        const result = await this.rollDice({
            dice: 100,
            ...options,
        });

        return result;
    }

    private async rollDice(options: RollArgs) {
        let { dice, diceCount = 1, bonuses, advantage, disadvantage } = options;

        let postfix = "";

        if (advantage) {
            postfix = "kh";
            diceCount = 2;
        } else if (disadvantage) {
            postfix = "kl";
            diceCount = 2;
        }

        let diceTemplate = `${diceCount}d${dice}${postfix}`;

        let fullTemplate = `${diceTemplate}`;

        if (!_.isEmpty(bonuses)) {
            const bonusesCombined = _.map(bonuses, _.toString).join(" + ");
            fullTemplate += ` + ${bonusesCombined}`;
        }

        const roll = await this.roll(fullTemplate);
        const result = new RollResult(roll);
        return result;
    }
}
