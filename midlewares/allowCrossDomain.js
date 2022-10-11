const { ALLOW_URLS } = require("../config");

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', ALLOW_URLS);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
   
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
  };

  module.exports = allowCrossDomain