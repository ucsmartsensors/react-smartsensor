
import Amplify, { API } from 'aws-amplify';


export default Amplify.configure({
    Auth: {
        identityPoolId: "us-east-2:90821dc6-0559-4bad-99af-668efffabb47", //REQUIRED - Amazon Cognito Identity Pool ID
        region: "us-east-2", // REQUIRED - Amazon Cognito Region
        userPoolId: "us-east-2_OxIhkLqzL", //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: "1n8eecbpuj6ub4f97m3na26ht0", //OPTIONAL - Amazon Cognito Web Client ID
    },
    API: {
        endpoints: [
            {
                name: "getOrder",
                endpoint: "https://qvbj59j36g.execute-api.us-east-2.amazonaws.com/prod"
            },
            {
                name: "ApiName2",
                endpoint: "https://1234567890-abcdefghijkl.amazonaws.com"
            }
        ]
    }
});



/*

export default {
  
  apiGateway: {
    URL: " https://qvbj59j36g.execute-api.us-east-2.amazonaws.com/prod",
    REGION: "us-east-2"
  },
  
    cognito: {
      USER_POOL_ID: "us-east-2_OxIhkLqzL",
      APP_CLIENT_ID: "1n8eecbpuj6ub4f97m3na26ht0",
      REGION: "us-east-2",
      IDENTITY_POOL_ID: "us-east-2:90821dc6-0559-4bad-99af-668efffabb47",
    }
  };

  */