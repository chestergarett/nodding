export default {
    port: parseInt(process.env.port) || 8080,
    nodeEnv: process.env.NODE_ENV || 'production',
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || '518bb6d7e1e9e0cd093a7e64374133978e6b7f23babfee0c634b4f8bcdfe2ff4',
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '1533231dd4d4858ef06ddc172026d400890ba520ed7fd0fe09bfc0732ec58690',
}