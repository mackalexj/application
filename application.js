//
// application: application
//

const express = require('express');

const PORT = process.env.PORT || 3000
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
    initialLoadingScreen();
    setTimeout(authorizationRedirect(questradeOauthUrlRedirect), 10000);
});

function createQuestradeOauthUrlRedirect() {
    // need to add URL to questrade 
    // login to your account
    // under the app you've registered, add it to call back url's
    var responseUrl = 'https://questrade-application-testing.herokuapp.com/'
    var postUrl = 'https://login.questrade.com/oauth2/authorize?client_id=' + clientId + '&response_type=code&redirect_uri=' + responseUrl;
    return postUrl;
}

function initialLoadingScreen() {
    res.send(applicationStartedListeningOnPort);
}

function authorizationRedirect(questradeOauthUrlRedirect) {
    // log the redirection url
    res.send(res.send(questradeOauthUrlRedirect));
}

