const { env } = process;

module.exports = {
    secret: env.TOKEN_SECRET,
    db: {
        uri: env.DBURI,
        logging: env.LOGGING
    }
}