const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const db = require('./db');
const { addProducts, getProducts, getVendors } = require('./models');

app.use(cors());

app.use(express.json());

app.get('/products', getProducts);
app.get('/vendors', getVendors);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Gifts app listening at http://localhost:${port}`);
    addProducts()
    .catch((err) => console.error(`Saving data to db error: ${err}`))
  });
});