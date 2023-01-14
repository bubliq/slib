export type RollBonus = string | number;

export interface RollArgsBase {
    diceCount?: number;
    advantage?: boolean;
    disadvantage?: boolean;
    bonuses?: RollBonus[];
}
