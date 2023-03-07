const fs = require("fs");
const Product = require("./model");
const path = require("path");

fs.readdir("../../images/products", "utf8", (err, stats) => {
  if (err) throw err;
  //   console.log(stats[0]);
  const img = path.join("image/products", stats[0]);

  console.log(img);

  // const result = stats.map((val) => val.split("-").slice(1).join());
  //   fs.unlink(`../../images/products/${stats[0]}`, (err1) => {
  //     if (err1) {
  //       console.error(err1);
  //     } else {
  //       console.log("File berhasil dihapus");
  //     }
  //   });
  // console.log(typeof stats[0]);
});
