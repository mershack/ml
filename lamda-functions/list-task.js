'use strict';

console.log('Loading the task list function');

//dependencies
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

exports.handler = (event, context, callback) => {
    console.log ('the user is ' + event.user);
    var params = {
        TableName: 'Tasks',
        KeyConditionExpression: "#user = :usr",
        ExpressionAttributeNames:{
            "#user": "user"
        },
        ExpressionAttributeValues: {
            ":usr":event.user
        }
    };
    
    docClient.query(params, function(err, data){
       if(err) {
           callback(err, null);
       }else {
           //var list = sortList(data);
           callback(null, data);
       } 
    });
};


