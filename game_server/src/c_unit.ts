
export abstract class cUnit{
    _type : eUnitType;
    _hp : number;

    protected constructor(type:eUnitType, hp:number) {
        this._type = type;
        this._hp = hp;
    }

    abstract setHp() : number;
}