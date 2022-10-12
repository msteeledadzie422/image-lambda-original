const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
    
    let bucketName = event.Records[0].s3.bucket.name;
    let key = 'images.json';
    let record = { Bucket: bucketName, Key: 'images.json' }
    
    let images = await S3.getObject({Bucket: bucketName, Key: key}).promise();
    
    try {
        
        let stringifiedImages = images.Body.toString();
        let parsedImages = JSON.parse(stringifiedImages);
        
        let metaData = {
            name: event.Records[0].s3.object.key,
            size: event.Records[0].s3.object.size,
            type: 'png'
        }
        
        parsedImages.push(metaData);
        
        let newImages = JSON.stringify(parsedImages);
        
        await S3.putObject({ ...record, Body: newImages }).promise();
        
        console.log('IMAGES UPDATE :::::::::::::::: ', newImages);
        
    } catch(e) { 
        
        images = [];
        
        let newData = {
            name: event.Records[0].s3.object.key,
            size: event.Records[0].s3.object.size,
            type: 'png'
        }        
        
        images.push(newData);
        
        let newImages = JSON.stringify(images);
        
        await S3.putObject({ ...record, Body: newImages }).promise();
        
        console.log('IMAGES UPDATE :::::::::::::::: ', newImages);
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Bucket Update Successful'),
    };
    return response;
};
