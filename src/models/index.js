const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");



Product.belongsTo(Category);
Category.hasMany(Product);


ProductImg.belongsTo(Product);
Product.hasMany(ProductImg);
