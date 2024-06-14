// teen-patti-backend/utils/coreConfig.js

const cors = require('cors');

const whitelist = ['http://localhost:3000']; // Allowed origins

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow sending cookies across origins
};

module.exports = cors(corsOptions);
