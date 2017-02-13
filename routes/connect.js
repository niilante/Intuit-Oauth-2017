var express = require('express');
var router = express.Router();
var config = require('app/config');
var
    request = require('request'),
    qs = require('querystring')

/* Get the request token. */
router.get('/', function (req, res) {
    var sessionData = req.session;
    sessionData.oauth_token_secret = '';
    var getrequestToken = {
        url: config.REQUEST_TOKEN_URL,
        oauth: {
            callback: 'http://localhost:' + 3001 + '/callback/',
            consumer_key: config.consumerKey,
            consumer_secret: config.consumerSecret
        }
    }
    request.post(getrequestToken, function (e, r, data) {
        var requestToken = qs.parse(data)
        sessionData.oauth_token_secret = requestToken.oauth_token_secret
        console.log(requestToken)
        res.redirect(config.AuthorizeUrl + requestToken.oauth_token)
    })
});
module.exports = router;