const User = require('./User');
const Post = require('./Post');

// Un usuario puede tener muchos posts
User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts',
});

// Un post pertenece a un usuario
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = { User, Post };
