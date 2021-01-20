const fs = require('fs');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *    get:
 *      description: This should redirect to /web/
 */
router.get('/', function (req, res, next) {
  res.redirect('/web/');
});

/**
 * @swagger
 * /web:
 *    get:
 *      description: This should serve flutter app
 */
router.get('/web', function (req, res, next) {
  res.end();
});

/**
 * @swagger
 * /downloads:
 *    get:
 *      description: This should serve an apk of the flutter app
 */
router.get('/downloads', function (req, res, next) {
  var apkFile = `./downloads/nowaste.apk`;
  if(!fs.existsSync(apkFile))
      return res.status(404).send('Sorry no APKs here');
  res.download(apkFile);
});

module.exports = router;
