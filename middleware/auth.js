const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const authMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.APPID_JWKS_URI,
  }),
  audience: process.env.APPID_AUDIENCE,
  issuer: process.env.APPID_ISSUER,
  algorithms: ['RS256'],
});

module.exports = authMiddleware;
