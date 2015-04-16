var development = {
  firebase: {
    rootRefUrl: "https://andelf-development.firebaseIO.com",
    serverUID: "AndelFire",
    secretKey: "N6vvjBQEMO0phjnyhBOqFijpDKTFpwX2botsUsUZ"
  }
};

var test = {
  firebase: {
    rootRefUrl: "https://test-andelfire.firebaseIO.com",
    serverUID: "AndelFire",
    secretKey: "MvnMVsLfjf1xYhaqe25ZH66DYLdxtW2keIqp4RCO"
  }
};

var production = {
  firebase: {
    rootRefUrl: process.env.FB_URL,
    serverUID: process.env.FB_SERVER_UID, 
    secretKey: process.env.FB_SECRET_KEY
  }
};

var config = {
  development: development,
  test: test,
  production: production,
};
module.exports = config;