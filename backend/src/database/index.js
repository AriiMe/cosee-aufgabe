const { Sequelize, DataTypes } = require("sequelize");
const {Pool} = require('pg');
const bcrypt = require("bcrypt");
const User = require("./users");
const Post = require("./posts");
const Like = require("./likes");
const Comment = require("./comments");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASS,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      // connectionString: process.env.DATABASE_URL,
      // ssl: true,
    },
  }
);

// const sequelize = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });


const models = {
  User: User(sequelize, DataTypes),
  Post: Post(sequelize, DataTypes),
  Like: Like(sequelize, DataTypes),
  Comment: Comment(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

models.sequelize = sequelize;

module.exports = models;
