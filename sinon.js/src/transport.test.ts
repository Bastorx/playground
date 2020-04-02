import { Bus, Car } from ".";
import * as sinon from "sinon";

describe("Should Vehicle classes work without sinon", () => {
    it("Should instance and start a car", () => {
        const car = new Car("Voiture de Patrick", "Patrick")
        expect(car.speed).toBe(0)
        expect(car.onService).toBe(false)
        expect(() => car.accelerate()).toThrowError(Error)
        car.turnOn()
        car.accelerate()
        expect(car.speed).toBe(1)
        car.decelerate()
        expect(car.speed).toBe(0)
        expect(() => car.decelerate()).not.toThrowError(Error)
        car.turnOff()
        expect(() => car.decelerate()).toThrowError(Error)
        expect(car.conductorName).toBe("Patrick")
    })
    it("Should instance and start a bus", () => {
        const bus = new Bus("Bus scolaire", 25)
        expect(bus.speed).toBe(0)
        expect(bus.onService).toBe(false)
        expect(() => bus.accelerate()).toThrowError(Error)
        bus.turnOn()
        bus.accelerate()
        expect(bus.speed).toBe(1)
        bus.decelerate()
        expect(bus.speed).toBe(0)
        expect(() => bus.decelerate()).not.toThrowError(Error)
        bus.turnOff()
        expect(() => bus.decelerate()).toThrowError(Error)
        expect(bus.passenger).toBe(0)
        bus.inComing(42)
        expect(bus.passenger).toBe(25)
        bus.outGoing(75)
        expect(bus.passenger).toBe(0)
    })
})

describe("Vehicle are tested with sinon.js", () => {
    const sandbox = sinon.createSandbox();

    afterEach(function () {
        sandbox.restore();
    });

    it("Should instance and start a car, accelerate and turn off", () => {
        const car = new Car("Voiture de Patrick", "Patrick")
        // Si on spy juste une méthode ou un object, pas de problème de typage. Avec une class il considère que le type n'est pas compatible (bug). Du coup any
        const spy = <any>sandbox.spy(<any>car);

        car.turnOn()
        car.accelerate()
        car.accelerate()
        car.accelerate()
        car.accelerate()
        car.turnOff()

        expect(spy._speedDown.callCount).toBe(4)
        expect(spy.turnOn.callCount).toBe(1)
    })

    it("Should stub _speedUp to boost the car", () => {
        const car = new Car("Voiture de Patrick", "Patrick")
        // Si la méthode est privé ou protected. Il faut mettre any pour forcer le typage... Car il estime cette méthode non accessible initialement
        const stub = sandbox.stub(car, <any>"_speedUp").callsFake(function (this: Car) {
            if (!this.onService)
                throw new Error("The vehicle isn't on service")
            if (this.speed < 10)
                this.speed += 2
        });

        car.turnOn()
        car.accelerate()
        car.accelerate()
        car.accelerate()

        expect(car.speed).toBe(6)
    })

    it("Should mock _speedUp to boost the car and check if executed 3 times", () => {
        const car = new Car("Voiture de Patrick", "Patrick")
        const mock = sandbox.mock(car);

        // J'espère que la fonction fake va s'exécuter 3 fois. C'est un mix spy et stub
        mock.expects("_speedUp").thrice().callsFake(function (this: Car) {
            if (!this.onService)
                throw new Error("The vehicle isn't on service")
            if (this.speed < 10)
                this.speed += 2
        });

        car.turnOn()
        car.accelerate()
        car.accelerate()
        car.accelerate()

        mock.verify();
    })
})