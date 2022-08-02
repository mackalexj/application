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
    res.end('<div><a href=\'/start\'><p>Start<p></a></div>');
});

app.get('/start', (req, res) => {
    var clientId = readClientId();
    var questradeOauthUrlRedirect = createQuestradeOauthUrlRedirect(clientId);
    authorizationRedirect(questradeOauthUrlRedirect, res);
});


app.get('/questradeCode', (req, res) => {
    console.log('Entering method: app.get questradeCode for code: ' + req.query.code);
    var postUrl = 'https://login.questrade.com/oauth2/token?client_id=<client id=""> &code=<code>&grant_type=authorization_code&redirect_uri=http://www.example.com';
    res.send('have reached the end');
});

app.get('/end', (req, res) => {
    res.send('Have reached the end');
});

app.get('/loltest', (req, res) => {
    console.log('WE MADE IT');
    res.render('Nice! We Made It');
});


function readClientId() {
    // will need to get your client Id from questrade
    // this is your consumer key, as per questrade documentation:
    // https://www.questrade.com/api/documentation/getting-started
    // in this case, once you have your consumer key, 
    // add it in config vars on heroku front end
    // in this case saving as CONSUMER_KEY
    console.log('Entering method: readClientId()');
    var consumerKey = process.env.CONSUMER_KEY || 'test-consumer-key';
    console.log('Returned Client ID aka Consumer Key: ' + consumerKey);
    return consumerKey;
};

function createQuestradeOauthUrlRedirect(clientId) {
    // need to add URL to questrade 
    // login to your account
    // under the app you've registered, add it to call back url's
    console.log('Entering method: createQuestradeOauthUrlRedirect(' + clientId + ')');
    // var responseUrl = 'https://questrade-application-testing.herokuapp.com/'
    var responseUri;
    if (PROFILE == DevelopmentProfile.Local.name) {
        responseUri = 'http://localhost:' + PORT + '/questradeCode';
    } else {
        responseUri = 'https://questrade-application-testing.herokuapp.com/questradeCode';
    }
    console.log('Response URI is:' + responseUri);
    var questradeOauthUrlRedirect = 'https://login.questrade.com/oauth2/authorize?client_id=' + clientId + '&response_type=code&redirect_uri=' + responseUri;
    console.log('Returned URL for redirect is: ' + questradeOauthUrlRedirect);
    return questradeOauthUrlRedirect;
};

function authorizationRedirect(questradeOauthUrlRedirect, res) {
    console.log('Entering method: authorizationRedirect()');
    if (PROFILE === DevelopmentProfile.Local.name) {
        console.log('Entering method path: Local Testing authorizationRedirect()');
        res.redirect('http://localhost:' + PORT + '/questradeCode' + '?code=testing123testing321');
    } else {
        console.log('Redirecting to URL: ' + questradeOauthUrlRedirect);
        res.redirect(questradeOauthUrlRedirect);
        // res.send('/loltest');
    }
};

