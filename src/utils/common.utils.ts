export class CommonUtils {
    static generate5DigitRandom() {
        return Math.floor(Math.random() * 90000) + 10000;
    }
}