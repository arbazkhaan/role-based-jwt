module.exports = () => {
    const { Users } = require('@models/Users')();
  
    return async ({id, ...user}) => {
      try {
        const userInfo = await Users.update({ ...user }, {
          where: { id }
        });
        return userInfo;
      } catch (err) {
        throw err;
      }
    };
  };
  