const debug = require('debug')('app:config:publish')

debug('Creating default publish configuration.')

const publishCfg = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  Bucket: process.env.AWS_BUCKET
  // cfDistributionId: process.env.AWS_CF_DISTRIBUTION_ID
}

module.exports = publishCfg
