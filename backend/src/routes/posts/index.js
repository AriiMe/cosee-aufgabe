const express = require('express');
const Post = require('../../database').Post;
const User = require('../../database').User;
const Like = require('../../database').Like;

const multer = require("multer");
const cloudinary = require("../../cloudinary");
const moment = require("moment");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "yeet-posts",
    },
  });
  const cloudinaryMulter = multer({ storage: storage });

  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        userId: req.user.dataValues.id,
      });
      res.status(201).send(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went bad!");
    }
  });

  router.put(
    "/:id/upload",
    cloudinaryMulter.single("PostImage"),
    async (req, res) => {
      try {
        const posts = await Post.findByPk(req.params.id);
        if (posts.dataValues.userId === req.user.dataValues.id) {
          const alteredIMG = await Post.update(
            { ...req.body, pfp: req.file.path },
            {
              where: { id: req.params.id },
              returning: true,
            }
          );
          res.send(alteredIMG);
        } else {
          res.status(401).send("Unauthorized: This is not your account!");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
      }
    }
  );

  router.get("/", async (req, res) => {
    try {
      const allPosts = await Post.findAll({
        include: [
          User,
          { model: Comment, include: [User] },
          Like,
        ],
      });
  
      res.send(allPosts);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went bad!");
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const singlePost = await Post.findByPk(req.params.id, {
        include: [
          User,
          { model: Comment, include: [User] },
          Like,
        ],
        order: [[{ model: Comment }, 'createdAt', 'desc']],
      });
      res.send(singlePost);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went bad!");
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const postToDelete = await Post.findByPk(req.params.id);
      console.log(postToDelete);
      console.log(req.user);
      if (postToDelete.dataValues.userId === req.user.dataValues.id) {
        await Post.destroy({ where: { id: req.params.id } });
        res.send("Post destroyed");
      } else {
        res
          .status(401)
          .send("Unauthorized: You cannot delete other peoples posts!");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went bad!");
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const postToDelete = await Post.findByPk(req.params.id);
      if (postToDelete.dataValues.userId === req.user.dataValues.id) {
        const alteredPosts = await Post.update(req.body, {
          where: { id: req.params.id },
          returning: true,
        });
        res.send(alteredPosts);
      } else {
        res.status(401).send("Unauthorized: This is not your post!");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went bad!");
    }
  });

  module.exports = router;