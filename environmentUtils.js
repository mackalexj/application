// some utils to help with environment variables and development profile
// would like to develop this into a commonjs module for use with node:
// https://blog.logrocket.com/commonjs-vs-es-modules-node-js/

const DevelopmentProfileStr = require('./developmentProfileStr');

exports.getProfile = () => {
    console.log('Using environmentUtils method: readProfile()');
    const profileKey = process.env.PROFILE || DevelopmentProfileStr.Local.name;
    console.log('Returning PROFILE environment variable: ' + profileKey);
    return profileKey;
};

exports.isProfileLocal = profile => {
    return profile === DevelopmentProfileStr.Local.name;
};

exports.getPort = () => {
    console.log('Using environmentUtils method: readPort()');
    const portNumber = process.env.PORT || 3000;
    console.log('Returning server PORT number from environment variable: ' + portNumber);
    return portNumber;
};

exports.getClientId = () => {
    // will need to get your client Id from questrade
    // this is your consumer key, as per questrade documentation:
    // https://www.questrade.com/api/documentation/getting-started
    // in this case, once you have your consumer key, 
    // add it in config vars on heroku front end
    // in this case saving as CONSUMER_KEY
    console.log('Using environmentUtils method: readClientId()');
    const consumerKey = process.env.CONSUMER_KEY || 'test-consumer-key';
    console.log('Returning Client ID aka Consumer Key: ' + consumerKey);
    return consumerKey;
};

exports.getRefreshToken = () => {
    console.log('Using environmentUtils method: getRefreshToken()');
    const refreshToken = process.env.REFRESH_TOKEN || 'test-refresh-token';
    console.log('Returning refresh token: ' + refreshToken);
    return refreshToken;
};

