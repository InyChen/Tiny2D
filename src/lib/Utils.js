export default class Utils {
    static floor(num) {
        return (0.5 + num) | 0;
    }

    static floor2(num) {
        return ~~(0.5 + num);
    }

    static floor3(num) {
        return (0.5 + num) << 0;
    }
}