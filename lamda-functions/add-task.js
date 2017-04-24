'use strict';

console.log('Loading the task-add function');

//dependencies
const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-1"
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var params = {
        Item: {
            user: event.user,
            description: event.description,
            priority: event.priority,
            completed: event.completed            
        },
        
        TableName: 'Tasks'
    };
    
    docClient.put(params, function(err, data){
       if(err) {
           callback(err, null);
       } else {
           callback(null, data)
       } 
       
    });
};

