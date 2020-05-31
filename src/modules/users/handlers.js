module.exports = () => {
const controllers = require('./controllers')();
const Role = require('@middlewares/role');

  return {
    signin: async (req, res, next) => {

      try {
        const user = await controllers.signin(req.body);

        if(!user) {
          return res.status(400).json({ message: 'Username or password is incorrect' });
        }
        return res.json(user);
      } catch(err) {
        return next(err)
      }

    },
    get: async (req, res, next) => {
      try {
        const currentUser = req.user;
        const id = parseInt(req.params.id);
    
        // only allow admins/ownuser to access other user records
        if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        const user = await controllers.get(id);

        if(!user) {
          return res.status(200).json({ message: 'No user found' });
        }
        return res.json(user);
      } catch (err) {
        return next(err);
      }
    },
    list: async (req, res, next) => {
      try {
        const user = await controllers.list();

        if(!user) {
          return res.status(200).json({ message: 'No user found' });
        }
      return res.json(user);
      } catch (err) {
        return next(err);
      }
    },
    create: async (req, res, next) => {
      try {
        const currentUser = req.user;
        // only allow admins to create users
        if (currentUser.role !== Role.Admin) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        
        await controllers.create(req.body);
        return res.status(200).json({ message: `User ${ req.body.username } created successfully` });
      } catch (err) {
        return next(err);
      }
    },
    delete: async (req, res, next) => {
      try {
        const currentUser = req.user;
        const id = parseInt(req.params.id);
    
        // only allow admins/ownuser to delete other users records
        if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        const user = await controllers.delete(id);

        if(user) {
          return res.status(200).json({ message: `User ${ req.body.username } deleted successfully` });
        }
        return res.status(200).json({ message: 'User not found' });

      } catch (err) {
        return next(err);
      }
    },
    update: async (req, res, next) => {
      try {
        const currentUser = req.user;
        const id = parseInt(req.params.id);
    
        // only allow admins/ownuser to update other users records
        if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        const user = await controllers.update({ ...req.body, id});

        if(user) {
          return res.status(200).json({ message: { message: `User ${ req.body.username } updated successfully` }});
        }
        return res.status(200).json({ message: 'User not found' });

      } catch (err) {
        return next(err);
      }
    }
  };
};
