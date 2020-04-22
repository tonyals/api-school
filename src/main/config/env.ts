export default {
  jwtSecret: process.env.JWT_SECRET || 'api-@##@',
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://api-school:api123@cluster0-lc6a1.mongodb.net/test?retryWrites=true&w=majority',
  port: process.env.PORT || 5050
}
