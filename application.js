//
// application: application
//

const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

var applicationStartedListeningOnPort = 'Investing app started and listening at port ' + PORT.toString();

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(applicationStartedListeningOnPort);
    }
});

app.get('/', (req, res) => {
    var questradeOauthUrlRedirect = createQuestradeOauthUrlRedirect();
    var clientId = readClientId();
    authorizationRedirect(clientId, questradeOauthUrlRedirect, res);
});

function createQuestradeOauthUrlRedirect(clientId) {
    // need to add URL to questrade 
    // login to your account
    // under the app you've registered, add it to call back url's
    console.log('createQuestradeOauthUrlRedirect()');
    var responseUrl = 'https://questrade-application-testing.herokuapp.com/'
    var postUrl = 'https://login.questrade.com/oauth2/authorize?client_id=' + clientId + '&response_type=code&redirect_uri=' + responseUrl;
    return postUrl;
};

function readClientId() {
    // will need to get your client Id from questrade
    // this is your consumer key, as per questrade documentation:
    // https://www.questrade.com/api/documentation/getting-started
    // in this case, once you have your consumer key, 
    // place it in a file in the current directory called:
    // consumerKey
    // add your Consumer Key from your Questrade App Hub as the only value in that file
    // add consumerKey file to .gitignore:
    // source: 
    // will need to install 
    console.log('readClientId()');
    return 'lol';
};

function authorizationRedirect(clientId, questradeOauthUrlRedirect, res) {
    // log the redirection url
    console.log('authorizationRedirect()');
    res.send(clientId + ' ' + questradeOauthUrlRedirect);
};

