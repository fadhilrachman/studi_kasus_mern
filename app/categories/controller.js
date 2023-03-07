const Categories = require("./model");

const getAllData = async (req, res, next) => {
  const { limit = 0, page = 0 } = req.query;
  try {
    const result = await Categories.find().limit(limit).skip(page);
    res.status(200).json({ message: "succes get data", result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createData = async (req, res, next) => {
  try {
    const result = await Categories.create(req.body);
    res.status(201).json({ message: "succes create data", result });
  } catch (error) {
    next(error);
  }
};

const deleteData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Categories.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "id error" });
    res.status(200).json({ message: "succes delete data", result });
  } catch (error) {
    next(error);
  }
};

const updateData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Categories.findByIdAndUpdate(id, req.body);
    if (!result) return res.status(404).json({ message: "id error" });
    res.status(200).json({ message: "succes update data", result: req.body });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllData, createData, deleteData, updateData };
