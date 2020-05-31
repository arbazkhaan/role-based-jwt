module.exports = () => {
  const { Users } = require('@models/Users')();
  return async (id) => {
    try {
      const user = await Users.update({ deleted_at: Date.now() }, {
        where: { id }
      });
      return user;
    } catch (err) {
      throw err;
    }
  };
};
  