export abstract class Vehicle {
    public readonly name: string;
    public speed: number;
    public onService: boolean;

    constructor(name: string) {
        this.name = name
        this.speed = 0
        this.onService = false
    }

    public turnOn() {
        this.onService = true
    }
    public turnOff() {
        while (this.speed > 0) {
            this._speedDown();
        }
        this.onService = false
    }
    public accelerate() {
        this._speedUp()
    }
    public decelerate() {
        this._speedDown()
    }
    private _speedUp() {
        if (!this.onService)
            throw new Error("The vehicle isn't on service")
        if (this.speed < 10)
            this.speed++
    }
    private _speedDown() {
        if (!this.onService)
            throw new Error("The vehicle isn't on service")
        if (this.speed > 0)
            this.speed--
    }
}