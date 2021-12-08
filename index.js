import express from "express";
import multer from "multer";
import sizeOf from "image-size";
import sharp from "sharp";
import fs from "fs";

const app = express();

const img = multer({
  dest: "./img",
});

app
  .set("view engine", "ejs")
  .set("views", "views")
  .get("/", (r) => r.res.render("./index"))
  .post("/makeimage", img.single("image"), async (r) => {
    const tempPath = r.file.path;
    sizeOf(tempPath, function (err, dimensions) {
      r.res.send({
        width: dimensions.width,
        height: dimensions.height,
      });
    });
  })

  .all("/login", (r) => r.res.send("leontevaira98"))
  .listen(process.env.PORT || 3000, () => {
    console.log("Server is working");
  });
