export function success(body) {
    return buildResponse(200, body);
  }
  
  export function failure(body) {
    return buildResponse(500, body);
  }
  
  function buildResponse(statusCode, body) {
    return {
      statusCode: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
			  "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
			
      },
      body: JSON.stringify(body)
    };
  }