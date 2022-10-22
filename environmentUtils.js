// some utils to help with environment variables and development profile
// would like to develop this into a commonjs module for use with node:
// https://blog.logrocket.com/commonjs-vs-es-modules-node-js/

import { config } from 'dotenv';
config();
import { DevelopmentProfile } from './developmentProfile.js';

class EnvironmentUtils {
    getDevelopmentProfile() {
        console.log('Using environmentUtils method: readProfile()');
        const profileKey = process.env.PROFILE || DevelopmentProfile.Local.name;
        console.log('Returning PROFILE environment variable: ' + profileKey);
        return profileKey;
    };
    
    isDevelopmentProfileLocal(profile) {
        console.log('Using environmentUtils method: isProfileLocal()');
        return profile === DevelopmentProfile.Local.name;
    };
    
    getPort() {
        console.log('Using environmentUtils method: readPort()');
        const portNumber = process.env.PORT || 3000;
        console.log('Returning server PORT number from environment variable: ' + portNumber);
        return portNumber;
    };

    getRefreshToken() {
        console.log('Using environmentUtils method: getRefreshToken()');
        const refreshToken = process.env.REFRESH_TOKEN || 'test-refresh-token';
        console.log('Returning refresh token: ' + refreshToken);
        return refreshToken;
    };
    
    getQuestradeApiVersion() {
        console.log('Using environmentUtils method: getQuestradeApiVersion()');
        const questradeVersion = process.env.QUESTRADE_API_VERSION || 'test-questrade-version';
        console.log('Returning Questrade API Version: ' + questradeVersion);
        return questradeVersion;
    };
    
    getMongoDbUri() {
        console.log('Using environmentUtils method: getMongoDbUri()');
        const mongoDbUri = process.env.MONGO_DB_URI || 'test-mongo-db-uri';
        console.log('Returning Mongo DB URI: ' + mongoDbUri);
        return mongoDbUri;
    };
}

export {EnvironmentUtils};

// exports.getClientId = () => {
//     // will need to get your client Id from questrade
//     // this is your consumer key, as per questrade documentation:
//     // https://www.questrade.com/api/documentation/getting-started
//     // in this case, once you have your consumer key, 
//     // add it in config vars on heroku front end
//     // in this case saving as CONSUMER_KEY
//     console.log('Using environmentUtils method: readClientId()');
//     const consumerKey = process.env.CONSUMER_KEY || 'test-consumer-key';
//     console.log('Returning Client ID aka Consumer Key: ' + consumerKey);
//     return consumerKey;
// };



