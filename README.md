# Image-Lambda

## Problem Domain

Create a Lambda function that can update an image array within a file with any newly uploaded images.

## Tasks

Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser

A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far

When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must update the images.json file with the newly uploaded image.

## Deployed Links

images.json: https://simple-bucket-class-17.s3.us-west-1.amazonaws.com/images.json


## Approach

I created an images.json file with an arry of image "objects" as placeholders. In my Lambda function I used a try catch to take in the images event object, parse it, and add any newly uploaded "images."

I originally tried to add each new image with an if/else statement but kept receiving errors so switched to a try/catch instead and that worked.

At one point my deployed link was turning into a download file. I deleted the file and re-uploaded and this resolved the issue.

