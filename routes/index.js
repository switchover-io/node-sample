var express = require('express');
var router = express.Router();

const Switchover = require('switchover-node-sdk');

const SKDKEY = process.env.SDK_KEY
const TOGGLENAME = process.env.TOGGLE_NAME

/** Client will be initialized with a cache ttl of 10 seconds */
const client = Switchover.createClient(SKDKEY, { ttl: 10 }, 'debug');


router.get('/', async function(req, res, next) {
  res.render('index');
});


router.get('/profile', require('connect-ensure-login').ensureLoggedIn(),  async (req, res) => {
  await client.fetchAsync();

  /** We evaluate the toggle with a context (here the userId) */
  const betaFeature = client.toggleValue(TOGGLENAME, false, {
    userId: req.user.email
  });

  res.render('profile', { sdkKey: SKDKEY, betaFeature: betaFeature, user: req.user });
})


module.exports = router;
