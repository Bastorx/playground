import { Vehicle } from "./Vehicle";

export class Car extends Vehicle {
    _conductorName: string;
    constructor(name: string, conductorName: string) {
        super(name)
        this._conductorName = conductorName;
    }
    public get conductorName() {
        return this._conductorName
    }
}