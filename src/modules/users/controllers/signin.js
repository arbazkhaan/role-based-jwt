const { Users } = require('@models/Users')();
const config = require('@config');
const jwt = require('jsonwebtoken');

module.exports = () => {
  return async ({ username, password }) => {
    try {
      const user = await Users.findOne({
        where: { username, password }
      });

      if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, id, ...userWithoutPassword } = user.dataValues;
        return {
          ...userWithoutPassword,
          token
        };
      }
      return;
    } catch (err) {
      throw err;
    }
  };
};
