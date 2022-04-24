const repleceFunc = function (html, obj) {
  let out = html.replace(/{ImageProduct}/g, obj.image);
  out = out.replace("{NameProduct}", obj.productName);
  out = out.replace("{DetailProduct}", obj.quantity);
  out = out.replace("{PriceProduct}", obj.price);
  out = out.replace("{VitaminProduct}", obj.nutrients);
  out = out.replace("{IdProduct}", obj.id);
  out = out.replace("{CountryProduct}", obj.nutrients);
  out = out.replace("DescriptionProduct", obj.description);
  out = out.replace("{OrganicProduct}", obj.organic ? "Organic" : "");
  return out;
};

module.exports = repleceFunc;
