const _ = require('lodash')
const debug = require('debug')('app:bin:publish')
const ProgressBar = require('ascii-progress')

const s3 = require('s3')
// const cloudfront = require('cloudfront')

const project = require('../../project.config')
const publishCfg = require('../s3publish.config')

const failingFields = _.filter(publishCfg, (f, k) => _.isNil(f) || _.isEmpty(f))
if (failingFields.length > 0) {
  debug('Invalid configuration detected. Check your \'s3config.env\' file for missing/malformed parameters:')

  const failingFieldsName = _.reduce(publishCfg, (res, val, key) => {
    if (_.isNil(val) || _.isEmpty(val)) {
      res.push(key)
    }
    return res
  }, [])

  debug(`${_.join(failingFieldsName, ', ')}`)
  throw new Error('Invalid config') // Error to stop publish
}

const { region, accessKeyId, secretAccessKey, Bucket, cfDistributionId } = publishCfg

const client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    region,
    accessKeyId,
    secretAccessKey
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  }
})

const params = {
  localDir: project.outDir,
  deleteRemoved: true, // default false, whether to remove s3 objects
                       // that have no corresponding local file.
  s3Params: {
    Bucket
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  }
}
let uploadBar = null

debug(`Uploading to S3 Bucket "${Bucket}" on region "${region}"`)
const uploader = client.uploadDir(params)
let lastProgressAmount = 0
uploader.on('error', function (err) {
  debug('Error: unable to sync:' + err.stack)
})
uploader.on('progress', function () {
  const { progressAmount, progressTotal } = uploader

  if (progressTotal > 0) {
    if (!uploadBar) {
      uploadBar = new ProgressBar({
        schema: '╢:bar╟ :current/:total :percent :elapseds :etas',
        blank: '░',
        filled: '█',
        clean: true,
        total: progressTotal
      })
    }

    uploadBar.tick((progressAmount - lastProgressAmount))
    lastProgressAmount = progressAmount
  }
})
/*
uploader.on('end', function () {
  debug('Upload completed')

  const cfCallerReference = `IAB-${moment().format('YYYYMMDDHHmm')}`
  const cfInvalidationPath = '/!*'

  debug(`Request Cloudfront Invalidation with callerReference: ${cfCallerReference}`)
  const cfClient = cloudfront.createClient(accessKeyId, secretAccessKey)
  cfClient.createInvalidation(cfDistributionId, cfCallerReference, cfInvalidationPath, (err, invalidation) => {
    if (err) {
      debug(`Error: ${err}`)
    } else {
      debug(`Cloudfront invalidation created: ${invalidation.id}`)
    }
  })
})
*/
