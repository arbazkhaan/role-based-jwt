module.exports = () => {
  const { Users } = require('@models/Users')();

return async (user) => {

  try {
    const userInfo = await Users.create({ ...user });
    if (userInfo) {
        const { password, id, ...userWithoutPassword } = userInfo;
        return {
            ...userWithoutPassword
        };
    }
  } catch (err) {
    throw err;
  }
};
};
