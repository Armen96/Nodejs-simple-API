const config = require('../../env');
const AWS = require('aws-sdk');

let s3bucket = new AWS.S3({
    accessKeyId: config.IAM_USER_KEY,
    secretAccessKey: config.IAM_USER_SECRET,
    Bucket: config.Bucket,
    region: config.region
});

export const uploadToS3 = (object, callback) => {
    const sourceImage = object.image;

    const params = {
        Bucket: config.Bucket,
        Key: sourceImage.name,
        Body: sourceImage.data,
        ACL: "public-read",
        ContentType: 'image/jpeg'
    };

    s3bucket.upload(params, function(err, data){
        err ? callback(data) :   callback(data);
    });
};
