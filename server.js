const express =  require("express")
const app = express()

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", (req, res) => {
  let filteredShoes = shoes;
  const { "min-price": minPrice, "max-price": maxPrice, type } = req.query;
  if (minPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(maxPrice));
  }
  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLocaleLowerCase());
  }
  res.json(filteredShoes);
})

app.get("/collectibles/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!");
  }
  const item = collectibles[index];
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
});

app.get('/hello', (req, res) => {
  const name = req.query.name || "guest";
  const age = req.query.age || "unknown"
  res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

app.get('/greetings/:name', (req, res) => {
  console.log(req.params.name)
  res.send(`<h1> What a delight it is to see you once more, ${req.params.name} </h1>`)
})

app.get('/roll/:param', (req, res) => {
  const param = req.params.param;
  const maxValue = parseInt(param, 10);
  if (isNaN(maxValue)) {
    return res.status(400).send("you must specify a number.");
  }
  if (maxValue < 0) {
    return res.status(400).send("please specify a positive number.");
  }
  const result = Math.floor(Math.random() * (maxValue + 1));
  res.send(`you rolled a ${result}.`)
})


//listening
app.listen(3000, () => {
  console.log("Listening on port 3000")
})