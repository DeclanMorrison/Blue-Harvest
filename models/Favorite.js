module.exports = function (sequelize, DataTypes) {
  const Favorite = sequelize.define("Favorite", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userID:{
      allowNull: false,
      type: DataTypes.UUID,
    },
    recipe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    },
    health: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    }
  });

  return Favorite;
};
