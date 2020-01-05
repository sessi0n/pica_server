import { cUnit } from './c_unit';

export class cMinion extends cUnit{
    constructor() {
        super(eUnitType.minion, 70);
    }

    setHp() {
        return this._hp;
    }
}
