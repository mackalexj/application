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
const app = express();
const axios = require('axios');
require('dotenv').config();

// some functionality that is currently taken care of by:
// environmentUtils
const environmentUtils = require('./environmentUtils');
const PORT = environmentUtils.getPort();
const PROFILE = environmentUtils.getProfile();
const IS_PROFILE_LOCAL = environmentUtils.isProfileLocal(PROFILE);
const REFRESH_TOKEN = environmentUtils.getRefreshToken();
const QUESTRADE_API_VERSION = process.env.QUESTRADE_API_VERSION;
console.log('Questrade API Version is: ' + QUESTRADE_API_VERSION);
// const CLIENT_ID = environmentUtils.getClientId();

// stores the value of the access token json acquire from step 4 of:
// https://www.questrade.com/api/documentation/getting-started
var accessTokenJson;
// stores account info after calling accounts endpoint
var accountsJson;

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end('<div><a href=\'/start\'><p>Start<p></a></div>');
});

app.get('/start', async (req, res) => {
    var myUrl = exchangeCodeForAccessToken(REFRESH_TOKEN);
    const axiosPostResult = await axios.post(myUrl)
        .then(response => {
            accessTokenJson = response.data;
            console.log(JSON.stringify(accessTokenJson));
            res.redirect('/getAccountInfo');
        })
        .catch(error => {
            if (IS_PROFILE_LOCAL) {
            console.log(error.toJSON())
            } else {
            console.log(error.code);
            console.log(error.status);
            console.log(error.message);
            res.redirect('/endWithError');
            }
        });
});

// source for URL:
// https://www.questrade.com/api/documentation/getting-started
function exchangeCodeForAccessToken(refreshToken) {
    var baseUrl;
    var grantTypeStr = 'grant_type=refresh_token&refresh_token=';
    var postData;
    var totalUrl;
    
    if (IS_PROFILE_LOCAL) {
        var localHostUrl = 'http://localhost:3000/oauth2/token?';
        baseUrl = localHostUrl;
        postData = grantTypeStr + refreshToken;
    } else {
        var questradeBaseUrl = 'https://login.questrade.com/oauth2/token?';
        baseUrl = questradeBaseUrl;
        postData = grantTypeStr + refreshToken;

    }
    console.log('Post URL is:' + baseUrl + postData);
    totalUrl = baseUrl + postData;
    return totalUrl;
};

app.get('/getAccountInfo', async (req, res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end('<div><a href=\'/lfg\'><p>LFG<p></a></div>');
});

app.get('/lfg', async (req, res) => {
    var myUrl = accessTokenJson.api_server + QUESTRADE_API_VERSION + 'accounts';
    var bearerString = 'Bearer ' + accessTokenJson.access_token;
    console.log('Api server url is: ' + myUrl);
    console.log('Bearer string is: ' + bearerString);
    const axiosGetResult = await axios.get(myUrl, {
        headers: {
            'Authorization': bearerString,
            'Content-Type': 'application/json',
          }
    })
    .then(response => {
        accountsJson = response.data;
        console.log(JSON.stringify(accountsJson));
        res.redirect('/end');
    })
    .catch(error => {
        if (IS_PROFILE_LOCAL) {
        console.log(error.toJSON())
        } else {
        console.log(error.code);
        console.log(error.status);
        console.log(error.message);
        res.redirect('/endWithError');
        }
    });
});

app.get('/end', (req, res) => {
    var sendMessage = '<p>Have reached the end</p><p>' + JSON.stringify(accountsJson) + '</p>';
    res.send(sendMessage);
});

app.get('/endWithError', (req, res) => {
    res.send('We Have Ended With an Error');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Using development profile: ' + PROFILE);
        console.log('Investing app started and listening at port ' + PORT);
    }
});

// i believe this is used to return test data for local profile
app.post('/oauth2/token', (req, res) => {
    var queryParams = req.query;
    console.log(queryParams);
    console.log('WE MADE IT');
    var testData =    { 
        "access_token": "C3lTUKuNQrAAmSD/TPjuV/HI7aNrAwDp", 
        "token_type": "Bearer" ,
        "expires_in":  300 ,
        "refresh_token":  "aSBe7wAAdx88QTbwut0tiu3SYic3ox8F",
        "api_server":  'https://api01.iq.questrade.com'  
    }
    res.json(testData);
});

