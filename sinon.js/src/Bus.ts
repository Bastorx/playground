import { Vehicle } from "./Vehicle";

export class Bus extends Vehicle {
    private _passenger: number
    private _maxPassenger: number;

    constructor(name: string, maxPassenger: number) {
        super(name)
        this._passenger = 0;
        this._maxPassenger = maxPassenger;
    }
    public get passenger() {
        return this._passenger
    }
    public set maxPassenger(p: number) {
        this._maxPassenger = p;
    }
    public inComing(p: number) {
        this._passenger = Math.min(this._passenger + p, this._maxPassenger);
    }
    public outGoing(p: number) {
        this._passenger = Math.max(this._passenger - p, 0);
    }
}