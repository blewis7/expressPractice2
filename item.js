const items = require("./fakeDb");

class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;

        items.push(this);
    }

    // for get requests
    static findAll(){
        return items;
    }

    // for get requests
    static findOne(name){
        const foundItem = items.find(x => x.name === name);
        if (foundItem === undefined){
            throw {message: "Item not found!", status: 404};
        }
        return foundItem;
    }

    // for patch requests
    static update(name, data){
        const foundItem = items.find(x => x.name === name);
        if (foundItem === undefined){
            throw {message: "Item not found!", status: 404};
        }
        foundItem.name = data.name;
        foundItem.price = data.price;
        return foundItem;
    }

    // for delete requests
    static delete(name){
        const foundIdx = items.findIndex(x => x.name === name);
        if (foundIdx === -1){
            throw {message: "Item not found!", status: 404};
        }
        items.splice(foundIdx, 1);
    }

}

module.exports = Item; 