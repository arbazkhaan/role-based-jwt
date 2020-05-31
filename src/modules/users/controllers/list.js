module.exports = () => {
  // const { auroraDb: db } = require('@utils/db');
  const { Users } = require('@models/Users')();

  return async () => {
    try {

      const users = await Users.findAll({
        where: {
          deleted_at: null
        },
      });

      return users.map(u => {
        const { password, ...userWithoutPassword } = u.dataValues;
        return userWithoutPassword;
      });
    } catch (err) {
      throw err;
    }
  };
};
