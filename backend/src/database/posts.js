
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imgurl: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.hasMany(models.Comment);
    Post.hasMany(models.Like);
  };
  return Post;
};
