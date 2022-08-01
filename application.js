//
// application: oauth node js heroku express
//

//source : https://masteringjs.io/tutorials/fundamentals/enum
class DevelopmentProfile {
    static Local = new DevelopmentProfile('Local');
    static Staging = new DevelopmentProfile('Staging');
    static Production = new DevelopmentProfile('Production');

    constructor(name) {
        this.name = name;
    };
    toString() {
        return `Color.${this.name}`;
    };
};

const PROFILE = process.env.PROFILE || DevelopmentProfile.Local.name;
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Development Profile: ' + PROFILE);
        console.log('Investing app started and listening at port ' + PORT.toString());
    }
});

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end("<div><a href='/start'><p>Start<p></a></div>");
});

app.get('/start', (req, res) => {
    var clientId = readClientId();
    var questradeOauthUrlRedirect = createQuestradeOauthUrlRedirect(clientId);
    authorizationRedirect(questradeOauthUrlRedirect, res);
});

function readClientId() {
    // will need to get your client Id from questrade
    // this is your consumer key, as per questrade documentation:
    // https://www.questrade.com/api/documentation/getting-started
    // in this case, once you have your consumer key, 
    // add it in config vars on heroku front end
    // in this case saving as CONSUMER_KEY
    console.log('readClientId()');
    var consumerKey = process.env.CONSUMER_KEY || 'test-consumer-key';
    console.log('Client ID aka Consumer Key: ' + consumerKey);
    return consumerKey;
};

function createQuestradeOauthUrlRedirect(clientId) {
    // need to add URL to questrade 
    // login to your account
    // under the app you've registered, add it to call back url's
    console.log('createQuestradeOauthUrlRedirect()');
    var responseUrl = 'https://questrade-application-testing.herokuapp.com/'
    var postUrl = 'https://login.questrade.com/oauth2/authorize?client_id=' + clientId + '&response_type=code&redirect_uri=' + responseUrl;
    return postUrl;
};

function authorizationRedirect(questradeOauthUrlRedirect, res) {
    // log the redirection url
    console.log('authorizationRedirect()');
    console.log(questradeOauthUrlRedirect);
    if (PROFILE === DevelopmentProfile.Local.name) {
        res.send('Local Testing authorizationRedirect() method');
    } else {
        res.redirect(questradeOauthUrlRedirect);
    }
};

