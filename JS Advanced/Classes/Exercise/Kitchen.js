
class Kitchen{
    constructor(budget){
        this.budget = budget;
        this.menu = [];
        this.productsInStock = [];
        this.actionHistory = [];
    }

    loadProducts(products){
        for(let product of products){
            product = product.split(/\s+/gi);
            const name = product[0];
            const quantity = Number(product[1]);
            const price = Number(product[2]);
         
            if(this.canEffort(price)){
                if(this.productsInStock.some(x => x.name) == name){
                    this.productsInStock.find(x => x.name == name).quantity+=quantity;
                }else{
                    this.productsInStock.push({"name":name,"quantity":quantity});
                }
                this.budget-=price;
                this.actionHistory.push(`Successfully loaded ${quantity} ${name}`);
            }else{
                this.actionHistory.push(`There was not enough money to load ${quantity} ${name}`);
            }
        }
        return this.actionHistory.join("\n");
    }

    addToMenu(mealName,neededProducts ,price){
        if(this.menu.some(m => m.name == mealName)){
            return `The {meal} is already in our menu, try something different.`;
        }
        neededProducts = neededProducts.reduce((a,c) => {
            c = c.split(/\s+/gi);
            const name = c[0];
            const quantity = Number(c[1]);
            a.push({"name":name,"quantity":quantity});
            return a;
        },[]);
       this.menu.push({
           "name":mealName,
           "neededProducts":neededProducts,
           "price":Number(price),
       })
       return `Great idea! Now with the ${mealName} we have ${this.menu.length} meals on the menu, other ideas?`
    }

    showTheMenu(){
        if(this.menu.length == 0){
            return "Our menu is not ready yet, please come later...";
        }
        let mokeMenu = this.menu.slice(0,this.menu.length);
        mokeMenu = mokeMenu.reduce((a,c) => {
            a.push(`${c.name} - ${c.price}`);
            return a;
        },[]);
        return mokeMenu.join("\n");
    }
    makeTheOrder(name){
        const meal = this.menu.find(x => x.name == name);
        if(!meal){
            return `There is not ${name} yet in our menu, do you want to order something else?`;
        }
        if(!this.areNeededProductsAvailable(meal.neededProducts)){
            return `For the time being, we cannot complete your order (${name}), we are very sorry...`;
        }
        this.takeFromStock(meal.neededProducts);
        this.budget+=meal.price;
        return `Your order (${name}) will be completed in the next 30 minutes and will cost you ${meal.price}.`
    }
    areNeededProductsAvailable(neededProducts){
        for(const product of neededProducts){
            const productFromStock = this.productsInStock.find(x => x.name == product.name);
            if(!productFromStock || productFromStock.quantity < product.quantity){
                return false;
            }
        }
        return true;
    }
    takeFromStock(neededProducts){
       for(let i=0;i<this.neededProducts.length;i++){
           let product = this.neededProducts[i];
           let index = this.productsInStock.findIndex(x => x.name == product.name);
           if(this.productsInStock[i].quantity > product.quantity){
               this.productsInStock[i].quantity-=product.quantity;
               continue;
           }
           this.productsInStock.splice(index,0);
           
       }
    }
    canEffort(price){
        if(price <= this.budget){
            return true;
        }
        return false;
    }


}
let kitchen = new Kitchen (1000);
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder("qjca"));