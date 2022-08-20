//
// application: oauth node js heroku express
//
//
// to start the app:
//
//
// navigate to folder
// enter command: node .\application.js
// navigate to: localhost:3000/


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const DevelopmentProfileStr = require('./developmentProfileStr');
const environmentUtils = require('./environmentUtils');
const PROFILE = environmentUtils.getProfile();
const PORT = environmentUtils.getPort();
const CLIENT_ID = environmentUtils.getClientId();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end('<div><a href=\'/start\'><p>Start<p></a></div>');
});

app.get('/start', (req, res) => {
    var questradeOauthUrlRedirect = createQuestradeOauthUrlRedirect(CLIENT_ID);
    authorizationRedirect(questradeOauthUrlRedirect, res);
});

function createQuestradeOauthUrlRedirect(clientId) {
    // need to add URL to questrade 
    // login to your account
    // under the app you've registered, add it to call back url's
    console.log('Entering method: createQuestradeOauthUrlRedirect(' + clientId + ')');
    // var responseUrl = 'https://questrade-application-testing.herokuapp.com/'
    var responsePath = buildResponsePath('/questradecode');
    console.log('Response Path is:' + responsePath);
    var questradeOauthUrlRedirect = 'https://login.questrade.com/oauth2/authorize?client_id=' + clientId + '&response_type=code&redirect_uri=' + responsePath;
    console.log('Returned URL for redirect is: ' + questradeOauthUrlRedirect);
    return questradeOauthUrlRedirect;
};

function authorizationRedirect(questradeOauthUrlRedirect, res) {
    console.log('Entering method: authorizationRedirect()');
    if (PROFILE === DevelopmentProfileStr.Local.name) {
        console.log('Entering method path: Local Testing authorizationRedirect()');
        res.redirect('http://localhost:' + PORT + '/questradeCode?code=testing123testing321');
    } else {
        console.log('Redirecting to URL: ' + questradeOauthUrlRedirect);
        res.redirect(questradeOauthUrlRedirect);
    }
};

app.get('/questradeCode', (req, res) => {
    var questradeCode = req.query.code;
    console.log('Entering method: app.get questradeCode for code: ' + questradeCode);
    axiosTestResult = exchangeCodeForAccessToken(questradeCode);
    res.send(axiosTestResult);
});

function buildResponsePath(pagePath) {
    var responsePath;
    if (PROFILE === DevelopmentProfileStr.Local.name) {
        responsePath = 'http://localhost:' + PORT + pagePath;
    } else {
        responsePath = 'https://questrade-application-testing.herokuapp.com' + pagePath;
    }
    return responsePath;
};

async function exchangeCodeForAccessToken(questradeCode) {
    var responsePath = buildResponsePath('/accessGranted');
    var postUrl;
    var grantTypeStr = '&grant_type=authorization_code&redirect_uri=';
    if (PROFILE === DevelopmentProfileStr.Local.name) {
        var postManMockBaseUrl = 'https://a46fed68-bd11-4544-8464-e788b01e210d.mock.pstmn.io/'
        postUrl = postManMockBaseUrl + CLIENT_ID + '&code=' + questradeCode + grantTypeStr + responsePath;

    } else {
        var questradeBaseUrl = 'https://login.questrade.com/oauth2/token?client_id=';
        postUrl = questradeBaseUrl  + CLIENT_ID + '&code=' + questradeCode + grantTypeStr + responsePath;

    }
    console.log('Post URL is:' + postUrl);

    var config = {
        method: 'post',
        url: postUrl,
        headers: { }
      };
    return axios(config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                response.data;
            })
            .catch(error => {
                console.log(error.code)
                // console.log(error);
            });
};

app.get('/accessGranted', (req, res) => {
    console.log('Entering method: app.get accessGranted');
    res.send('accessGranted');
});

app.get('/end', (req, res) => {
    res.send('Have reached the end');
});

app.get('/loltest', (req, res) => {
    console.log('WE MADE IT');
    res.render('Nice! We Made It');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Using development profile: ' + PROFILE);
        console.log('Investing app started and listening at port ' + PORT);
    }
});

