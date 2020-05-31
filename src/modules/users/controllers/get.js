module.exports = () => {
  const { Users } = require('@models/Users')();

  return async (id) => {
    try {

      const user = await Users.findOne({
        where: {
          id
        }
      });
  
      if (!user) return;
      const { password, ...userWithoutPassword } = user.dataValues;
      return userWithoutPassword;
    } catch (err) {
      throw err;
    }
  };
};
