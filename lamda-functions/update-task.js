'use strict';

console.log('Loading the task-update function');

//dependencies
const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-1"
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    //TODO: Need to know what the user wants to update so find the paramaters the user passed.
    var params = {
        TableName:'Tasks',
        
        Key:{
            "user": event.user, 
            "description": event.description
        },
        
        UpdateExpression: "set priority =:pr, completed=:comp",
        ExpressionAttributeValues:{
            ":pr": event.priority,
            ":comp": event.completed
        },
        
        ReturnValues:"UPDATED_NEW"
    };
    
    docClient.update(params, function(err, data){
       if(err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null));
           callback(err, null);
       } else {
           callback(null, data)
       } 
       
    });
};

