function cityMarkets(cities) {
    let cityMarkets = {};

    for (let city of cities) {

        city = city.split(/ -> /g);
        let cityName = city[0];
        let product = city[1];
        let productData = city[2].split(/ : /g);

        if (cityMarkets[cityName]) {
            if (cityMarkets[cityName][product]) {
                cityMarkets[cityName][product]["amount"] = cityMarkets[cityName][product]["amount"] + productData[0];
            } else {
                cityMarkets[cityName][product] = {};
                cityMarkets[cityName][product]["amount"] = Number(productData[0]);
                cityMarkets[cityName][product]["price"] = Number(productData[1]);
            }
        } else {



            cityMarkets[cityName] = {};
            cityMarkets[cityName][product] = {};
            cityMarkets[cityName][product]["amount"] = Number(productData[0]);
            cityMarkets[cityName][product]["price"] = Number(productData[1]);


        }

    }
    const cityKeys = Object.keys(cityMarkets);
    for (const key of cityKeys) {
        
        console.log(`Town - ${key}`);
        const prodKeys = Object.keys(cityMarkets[key]);
        for (prod of prodKeys) {
            console.log(`$$$${prod} : ${cityMarkets[key][prod]["price"]*cityMarkets[key][prod]["amount"]}`);
        }
        
    }


}