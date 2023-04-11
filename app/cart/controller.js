const Cart = require("./model");

const getAllDatta = async (req, res, next) => {
  const { user } = req.query;
  try {
    const result = await Cart.find({ user })
      .populate({
        path: "produk",
        populate: [
          {
            path: "category",
          },
          {
            path: "tag",
          },
        ],
      })
      .populate("user");
    res.status(200).json({ message: "succes get data", result });
  } catch (error) {
    next(error);
  }
};

const createData = async (req, res, next) => {
  try {
    const result = await Cart.create(req.body);
    res.status(201).json({ message: "succes create data", result });
  } catch (error) {
    next(error);
  }
};

const deleteData = async (req, res, next) => {
  const id = req.body.id;
  try {
    const result = await Cart.deleteMany({ _id: { $in: id } });
    if (result.deletedCount == 0)
      return res.status(404).json({ message: "id error" });
    res.status(200).json({ message: "succes delete data", id, result });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllDatta, createData, deleteData };
