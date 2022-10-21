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
require('dotenv').config()

// some functionality that is currently taken care of by:
// environmentUtils
const environmentUtils = require('./environmentUtils');
const PORT = environmentUtils.getPort();
const PROFILE = environmentUtils.getProfile();
const IS_PROFILE_LOCAL = environmentUtils.isProfileLocal(PROFILE);
const REFRESH_TOKEN = environmentUtils.getRefreshToken();
// const CLIENT_ID = environmentUtils.getClientId();

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end('<div><a href=\'/start\'><p>Start<p></a></div>');
});

app.get('/start',async (req, res) => {
    var myUrl = exchangeCodeForAccessToken(REFRESH_TOKEN);
    const axiosPostResult = await axios.post(myUrl)
        .then(response => {
            console.log("MADE IT HERE");
            console.log(JSON.stringify(response.data));
            response.data;
            res.redirect('/end')
        })
        .catch(error => {
            if (IS_PROFILE_LOCAL) {
            console.log(error.toJSON())
            } else {
            console.log(error.code);
            console.log(error.status);
            console.log(error.message);
            res.redirect('/endWithError')
            }
        });
});

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




//
//
//
//
//
//
//
//

// function createQuestradeOauthUrlRedirect(clientId) {
//     // need to add URL to questrade 
//     // login to your account
//     // under the app you've registered, add it to call back url's
//     console.log('Entering method: createQuestradeOauthUrlRedirect(' + clientId + ')');
//     // var responseUrl = 'https://questrade-application-testing.herokuapp.com/'
//     var responsePath = buildResponsePath('/questradecode');
//     console.log('Response Path is: ' + responsePath);
//     var questradeBaseUrl = 'https://login.questrade.com/oauth2/authorize?client_id=';
//     var response_type = '&response_type=code&redirect_uri=';
//     var questradeOauthUrlRedirect = questradeBaseUrl + clientId + response_type + responsePath;
//     console.log('Returned URL for redirect is: ' + questradeOauthUrlRedirect);
//     return questradeOauthUrlRedirect;
// };

// function authorizationRedirect(questradeOauthUrlRedirect, res) {
//     console.log('Entering method: authorizationRedirect()');
//     if (IS_PROFILE_LOCAL) {
//         console.log('Entering method path: Local Testing authorizationRedirect()');
//         res.redirect('http://localhost:' + PORT + '/questradeCode?code=testing123testing321');
//     } else {
//         console.log('Redirecting to URL: ' + questradeOauthUrlRedirect);
//         res.redirect(questradeOauthUrlRedirect);
//     }
// };

// app.get('/questradeCode', async (req, res) => {
//     var questradeCode = req.query.code;
//     console.log('Entering method: app.get questradeCode for code: ' + questradeCode);
//     // res.send(questradeCode);
//     var myUrl = exchangeCodeForAccessToken(questradeCode);

//     const axiosPostResult = await axios.post(myUrl)
//         .then(response => {
//             console.log("MADE IT HERE");
//             console.log(JSON.stringify(response.data));
//             response.data;
//             res.redirect('/end')
//         })
//         .catch(error => {
//             if (IS_PROFILE_LOCAL) {
//             console.log(error.toJSON())
//             } else {
//             console.log(error.code);
//             console.log(error.status);
//             console.log(error.message);
//             res.redirect('/endWithError')
//             }
//         });
// });

// function buildResponsePath(pagePath) {
//     var responsePath;
//     if (IS_PROFILE_LOCAL) {
//         responsePath = 'https://localhost:' + PORT + pagePath;
//     } else {
//         responsePath = 'https://questrade-application-testing.herokuapp.com' + pagePath;
//     }
//     return responsePath;
// };

// app.get('/accessGranted', (req, res) => {
//     console.log('Entering method: app.get accessGranted');
//     res.send('accessGranted');
// });

app.get('/end', (req, res) => {
    res.send('Have reached the end');
});

app.get('/endWithError', (req, res) => {
    res.send('We Have Ended With an Error');
});

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

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Using development profile: ' + PROFILE);
        console.log('Investing app started and listening at port ' + PORT);
    }
});

