'use strict';

console.log('Loading the delete function');

//dependencies
const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-1"
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var params = {
        TableName:'Tasks',
        Key:{
            "user": event.user,
            "description": event.description
        }
    };
    
    docClient.delete(params, function(err, data){
       if(err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null));
           callback(err, null);
       } else {
           callback(null, data)
       } 
       
    });
};

