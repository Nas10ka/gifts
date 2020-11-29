const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

const promotionSchema = new Schema({
  text: String,
  order: Number,
  hide: { type: Boolean, default: false },
},
{ versionKey: false })

const vendorSchema = new Schema({
  _id: String,
  name: String,
},
{ versionKey: false })

const mediaSchema = new Schema({
  type: String,
  url: String,
},
{ versionKey: false })

const productSchema = new Schema({
  _id: String,
  id: String,
  media: [mediaSchema],
  name: String,
  order: Number,
  vendor: String,
  promotion: { type: promotionSchema, default: null },
},
{ versionKey: false });

const Product = mongoose.model('Product', productSchema);

const Vendor = mongoose.model('Vendor', vendorSchema);

const getProducts = (req, res, next) =>
  Product.find().sort({ order: 1 })
    .then((products) => res.json(products))
    .catch(next);

const getVendors = (req, res, next) =>
  Vendor.find()
    .then(result => res.json(result))
    .catch(next)

const addProducts  = () => {
  const data = fs.readFileSync('./data.json');
  const { products, vendors, promotion } = JSON.parse(data);  

  const promises = products.map((item) => {
    const product = item.order === promotion.order
      ? { ...item, _id: item.id, promotion }
      : { ...item, _id: item.id };
    const p = new Product(product);

    return p
      .save()
      .then((result) => result)
      .catch((err) => {
        if (err && err.code !== 11000) {
          console.error(err);
        } else if (err && err.code === 11000) {
          // console.log(`Default ${product.id} product already exists`);
        }
      });
  });
  return Promise.all(promises)
    .then(() => {
      const promises = vendors.map((item, index) => {
        const _id = item.toLowerCase().slice('') + String(index);
        const vendor = new Vendor({ _id, name: item });
        return vendor
          .save()
          .then(result => result)
          .catch((err) => {
            if (err && err.code !== 11000) {
              console.error(err);
            } else if (err && err.code === 11000) {
              // console.log(`Default ${vendor.name} vendor already exists`);
            }
          });
      })
    })
}

module.exports = {
  Product,
  Vendor,
  addProducts,
  getProducts,
  getVendors,
}