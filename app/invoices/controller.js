const Invoices = require("./model");

const createInvoice = async (req, res, next) => {
  try {
    const result = await Invoices.create(req.body);
    res.status(201).json({ message: "succes create data", result });
  } catch (error) {
    next(error);
  }
};

const getInvoice = async (req, res, next) => {
  try {
    const result = await Invoices.find()
      .populate("adress")
      .populate("user")
      .populate({ path: "order.produk" });

    res.status(200).json({ message: "succes get data", result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getInvoice, createInvoice };
