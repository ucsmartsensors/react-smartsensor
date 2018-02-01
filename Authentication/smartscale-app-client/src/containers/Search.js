const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const SEARCH_KEYWORD = "b";

let params = {
    TableName : 'TABLE_NAME',
    FilterExpression: "contains(#movie_name, :movie_name)",
    ExpressionAttributeNames: {
        "#movie_name": "movie_name",
    },
    ExpressionAttributeValues: {
        ":movie_name": SEARCH_KEYWORD,
    }       
};




