export default {
  jwtSecret: process.env.JWT_SECRET || 'api-@##@',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/api-school',
  port: process.env.PORT || 5050
}
