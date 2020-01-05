
export abstract class cUnit{
    _type : eUnitType;
    _hp : number;

    protected constructor(_type:eUnitType, _hp:number) {
    }

    abstract setHp();
}