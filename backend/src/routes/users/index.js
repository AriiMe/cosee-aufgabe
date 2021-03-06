const User = require("../../database").User;
const Post = require("../../database").Post;

const multer = require("multer");
//const passport = require("passport");
const cloudinary = require("../../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "yeetus",
  },
});

const cloudinaryMulter = multer({ storage: storage });
const jwt = require("jsonwebtoken");
const { authenticate, refreshToken } = require("../../auth");
const router = require("express").Router();

router.route("/register").post(async (req, res, next) => {
  try {
    const newUser = await User.create({
      ...req.body,
      pfp: "https://res.cloudinary.com/dhmw620tl/image/upload/v1611844643/benchmark3/i91vqe984yfdir5xp8xh.png",
    });
    res.send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route("/login").post(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) {
      const isMatch = user.validPassword(password);
      if (isMatch) {
        const accessToken = await jwt.sign(
          { id: user.id },
          process.env.JWT_KEY,
          { expiresIn: "30m" }
        );
        const refreshToken = await jwt.sign(
          { id: user.id },
          process.env.JWT_REFRESH_KEY,
          { expiresIn: "1w" }
        );
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true, //set to true when deploy
          sameSite: "none", //set to none when deploy
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true, //set to true when deploy
          sameSite: "none", //set to none when deploy
        });
        res.send(user);
      } else {
        res.status(401).send("Incorret Username or Password");
      }
    } else {
      res.status(401).send("Incorret Username or Password");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/logout", authenticate, async (req, res, next) => {
  try {
    await User.update(
      { JWT_REFRESH_KEY: req.user.JWT_REFRESH_KEY },
      { where: { id: req.user.id } }
    );

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).send();
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/me", authenticate, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.user.dataValues.id, {
      include: [
        Post,
        { model: Stalk, include: [{ model: User, as: "stalking" }] },
        { model: Stalker, include: [{ model: User, as: "stalker" }] },
        Tagged,
        SavedPost,
      ],
    });
    res.send(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const allUser = await User.findAll({
      include: [
        Post,
        { model: Stalk, include: [{ model: User, as: "stalking" }] },
        { model: Stalker, include: [{ model: User, as: "stalker" }] },
        Tagged,
      ],
    });
    res.send(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    if (req.user.dataValues.id.toString() === req.params.id) {
      const singleUser = await User.findByPk(req.params.id, {
        include: [
          Post,
          { model: Stalk, include: [{ model: User, as: "stalking" }] },
          { model: Stalker, include: [{ model: User, as: "stalker" }] },
          Tagged,
          SavedPost,
        ],
      });
      res.send(singleUser);
    } else {
      const singleUser = await User.findByPk(req.params.id, {
        include: [Post, Stalk, Stalker, Tagged],
      });
      if (singleUser) {
        res.send(singleUser);
      } else {
        res.status(404).send("User not found within database");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    if (req.user.dataValues.id.toString() === req.params.id) {
      const alteredUser = await User.update(req.body, {
        where: { id: req.params.id },
        include: [Post, Stalk, Stalker, Tagged],
        returning: true,
      });
      res.send(alteredUser);
    } else {
      res.status(401).send("Unauthorized: This is not your account!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.put(
  "/:id/upload",
  authenticate,
  cloudinaryMulter.single("ProfilePic"),
  async (req, res) => {
    try {
      if (req.user.dataValues.id.toString() === req.params.id) {
        const alteredIMG = await User.update(
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

router.put(
  "/:id/upload/register",
  cloudinaryMulter.single("ProfilePic"),
  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (
        user.dataValues.pfp ===
        "https://res.cloudinary.com/dhmw620tl/image/upload/v1611844643/benchmark3/i91vqe984yfdir5xp8xh.png"
      ) {
        const alteredIMG = await User.update(
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

router.route("/refresh/token").post(async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const newTokens = await refreshToken(refreshToken);
    console.log(newTokens);
    res.cookie("accessToken", newTokens.accessToken, {
      httpOnly: true,
    });
    res.cookie("refreshToken", newTokens.refreshToken, {
      httpOnly: true,
      path: "/insta/users/refresh/token",
    });
    res.send("Tokens Regenrated!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
