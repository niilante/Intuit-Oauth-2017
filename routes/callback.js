var express = require('express');
var router = express.Router();
var config = require('app/config');
var
    request = require('request'),
    qs = require('querystring')
/* GET the access token. */
router.get('/', function (req, res) {
    var sessionData = req.session;
    sessionData.AccessToken = '';
    sessionData.AccessTokenSecret = '';
    sessionData.Port = config.Port;
    var getAccessToken = {
        url: config.ACCESS_TOKEN_URL    ,
        oauth: {
            consumer_key: config.consumerKey,
            consumer_secret: config.consumerSecret,
            token: req.query.oauth_token,
            token_secret: req.session.oauth_token_secret,
            verifier: req.query.oauth_verifier,
            realmId: req.query.realmId
        }
    }
    request.post(getAccessToken, function (e, r, data) {
        var accessTokenLocal = qs.parse(data);
        t.AccessToken = accessTokenLocal.oauth_token;
        sessionData.AccessTokenSecret = accessTokenLocal.oauth_token_secret;
        console.log(accessTokenLocal);
        if (sessionData.AccessToken != null) {
            res.send('<!DOCTYPE html><html lang="en"><head></head><body><script>window.opener.location = "/display";window.close();</script></body></html>')
        }
    })
});
module.exports = router;