import { cUnit } from './c_unit';

export class cChamp extends cUnit{
    constructor() {
        super(eUnitType.champ, 100);
    }

    setHp() {
        return this._hp;
    }
}