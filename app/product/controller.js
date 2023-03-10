const Product = require("./model");
const fs = require("fs");
const path = require("path");

const createData = async (req, res, next) => {
  const { name, description, price, category, tag } = req.body;

  try {
    if (req.file) {
      const file = req.file.filename;
      const result = await Product.create({
        name,
        description,
        price,
        image_url: file,
        category: category && category,
        tag: tag && tag,
      });
      res.status(201).json({ message: "succes create data", result });
    } else {
      const result = await Product.create({
        name,
        description,
        price,
        category: category && category,
        tag: tag && tag,
      });
      res.status(201).json({ message: "succes create data", result });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getData = async (req, res, next) => {
  const { limit = 0, page = 0, category = "", tag = [] } = req.query;

  let filter = {};

  if (category) {
    filter = { ...filter, category };
  }
  console.log(tag.length);
  if (tag[0] != "") {
    filter = { ...filter, tag: { $in: tag } };
  }

  try {
    const count = await Product.find().countDocuments();
    const result = await Product.find(filter)
      .skip(page)
      .limit(limit)
      .populate("category")
      .populate("tag");

    res.status(200).json({ message: "succes get data", count, result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    console.log(req.file);
    const prod = await Product.findById(id);
    if (!prod) return res.status(404).json({ message: "id error" });

    if (req.file) {
      const file = req.file.filename;
      const img = path.join("./public", prod.image_url);
      fs.unlink(img, (err1) => {
        if (err1) {
          console.error(err1);
        } else {
          console.log("File berhasil dihapus");
        }
      });
      prod.name = name;
      prod.description = description;
      prod.price = price;
      prod.image_url = file;
      prod.save();
      res.status(200).json({ message: "succes update data", result: prod });
    } else {
      prod.name = name;
      prod.description = description;
      prod.price = price;
      // prod.image_url = prod.image_url;
      prod.save();
      res.status(200).json({ message: "succes update data", result: prod });
    }
  } catch (error) {
    res.json(error);
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete();
    const img = path.join("./public", result.image_url);
    console.log(img);
    fs.unlink(img, (err1) => {
      if (err1) {
        console.error(err1);
      } else {
        console.log("File berhasil dihapus");
      }
    });
    if (!result) {
      return res.status(404).json({ message: "id error" });
    }
    res.status(200).json({ message: "succes delete data" });
  } catch (error) {}
};

module.exports = { createData, getData, updateData, deleteData };
// resutl.image_url.replace(" ","%20")
