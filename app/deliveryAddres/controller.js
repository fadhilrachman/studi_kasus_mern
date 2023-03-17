const DelivelyAddress = require("./model");

const getAllData = async (req, res, next) => {
  const { user = "" } = req.query;

  let filter = {};
  if (user) filter = { user };

  try {
    const result = await DelivelyAddress.find(filter)
      .select("-createdAt -updatedAt")
      .populate("user", {
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      });
    res.status(200).json({ message: "succes get data", result });
  } catch (error) {
    next(error);
  }
};

const createData = async (req, res, next) => {
  try {
    const result = await DelivelyAddress.create(req.body);
    res.status(201).json({ message: "succes create data", result });
  } catch (error) {
    next(error);
  }
};

const deleteData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await DelivelyAddress.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "id error" });

    res.status(200).json({ message: "succes delete data" });
  } catch (error) {
    next(error);
  }
};

const updateData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await DelivelyAddress.findByIdAndUpdate(id, req.body);
    if (!result) return res.status(404).json({ message: "id error" });
    res.status(200).json({ message: "succes update data", result: req.body });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllData, createData, deleteData, updateData };
