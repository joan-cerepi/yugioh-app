export default class CardData {
    constructor(path) {
        this.path = path;
    }

    async getAllCardInfo() {
        try {
            const response = await fetch(this.path);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            return data.data;
        } catch(error) {
            console.error(`Error fetching data: ${error.message}`);
            return null;
        }
    }

    async searchByCardName(name) {
        const allCardInfo = await this.getAllCardInfo();
        const cardsByName = allCardInfo.filter(cardName => cardName.name.toLowerCase().includes(name.toLowerCase()));
        return cardsByName;
    }

    async filterByType(type) {
        const allCardInfo = await this.getAllCardInfo();
        const cardsByType = allCardInfo.filter(card => card.type.toLowerCase() === type.toLowerCase());
        return cardsByType;
    }

    async filterMonstersByAttribute(attribute) {
        const allCardInfo = await this.getAllCardInfo();
        const allMonsterCards = allCardInfo.filter(card => card.type.toLowerCase().includes('monster'));
        const monstersByAttribute = allMonsterCards.filter(card => card.attribute.toLowerCase() === attribute.toLowerCase());
        return monstersByAttribute;
    }

    async filterMonstersByRace(race) {
        const allCardInfo = await this.getAllCardInfo();
        const allMonsterCards = allCardInfo.filter(card => card.type.toLowerCase().includes('monster'));
        const monstersByAttribute = allMonsterCards.filter(card => card.race.toLowerCase() === race);
        return monstersByAttribute;
    }

    async getCardById(id) {
        const allCardInfo = await this.getAllCardInfo();
        const card = allCardInfo.filter(card => card.id === id)[0];
        return card;
    }

    async getRandomCard() {
        const allCardInfo = await this.getAllCardInfo();
        const randomNumber = Math.floor(Math.random() * allCardInfo.length);
        return allCardInfo[randomNumber];
    }
}