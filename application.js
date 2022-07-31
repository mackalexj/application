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
    res.send(applicationStartedListeningOnPort);
  });

