export default class CardData {
    constructor(path) {
        this.path = path;
    }

    async getAllCardInfo() {
        const response = await fetch(this.path);
        const data = await response.json();
        return data;
    }
}