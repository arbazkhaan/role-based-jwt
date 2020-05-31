module.exports = () => {
  return {
    signin: require('./signin')(),
    create: require('./create')(),
    get: require('./get')(),
    list: require('./list')(),
    delete: require('./delete')(),
    update: require('./update')()
  };
};
