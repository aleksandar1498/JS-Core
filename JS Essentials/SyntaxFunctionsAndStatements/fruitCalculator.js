function calculatePrice(fruit,weight,price) {
  let weightInKg=weight/1000;
  let totPrice = weightInKg*price;
  console.log(`I need $${totPrice.toFixed(2)} to buy ${weightInKg.toFixed(2)} kilograms ${fruit}.`);
}