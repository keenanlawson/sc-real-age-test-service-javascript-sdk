const RealAgeTestServiceSDK = require('./build/RealAgeTestServiceSDK').default;

const _SDK = new RealAgeTestServiceSDK({
    protocol: 'https',
    host: 'micro.mservices.sharecare.com',
    port: '',
    pathname: '/rat'
});
const _TOKEN_AUTH = RealAgeTestServiceSDK.getAuthentication({
    tokenType: 'BASIC',
    token: 'c2hhcmVjYXJlOmhzd2k='
});
const _TOKEN_BODY = {username: 'klawson@sharecare.com', password: 'sharecare'};

const onAccessTokenReceived = (response, resolve, reject) => {
    console.log('Token Success: ', response);
    if (response.data && response.data.access_token && response.data.account_id) {
        resolve(response.data);
    } else {
        reject(new Error('Bad Token or UserID'));
    }
};
const onAccessTokenError = (err, resolve, reject) => {
    console.log('Token Error: ', err);
    reject(err);
};

const getAccessToken = (resolve, reject) => {
    RealAgeTestServiceSDK.getToken(
        'https://auth.mservices.sharecare.com/access',
        _TOKEN_AUTH,
        _TOKEN_BODY,
        (response) => {
            onAccessTokenReceived(response, resolve, reject);
        },
        (err) => {
            onAccessTokenError(err, resolve, reject);
        }
    );
};

const getRatAuthentication = (token) => {
    return {
        userId: token.account_id,
        auth: RealAgeTestServiceSDK.getAuthentication({
            tokenType: 'SSO',
            token: token.access_token,
            userId: token.account_id
        })
    };
};

const getUserDetails = (authentication) => {
    _SDK.getUserDetails(
        authentication.auth,
        authentication.userId,
        (response) => {
            console.log('Details Success: ', response);
        },
        (err) => {
            console.log('Details Error: ', err);
        }
    );
    return authentication;
};

const getAllAssessments = (authentication) => {
    _SDK.getAllAssessments(
        authentication.auth,
        authentication.userId,
        (response) => {
            console.log('Assessments Success: ', response);
        },
        (err) => {
            console.log('Assessments Error: ', err);
        }
    );
    return authentication;
};

const getCalculation = (authentication) => {
    _SDK.getCalculation(
        authentication.auth,
        authentication.userId,
        745440,
        (response) => {
            console.log('Calculation Success: ', response);
        },
        (err) => {
            console.log('Calculation Error: ', err);
        }
    );
    return authentication;
};

const getRecommendations = (authentication) => {
    _SDK.getRecommendations(
        authentication.auth,
        authentication.userId,
        // 1461055,
        745440,
        (response) => {
            console.log('Recommendations Success: ', response);
        },
        (err) => {
            console.log('Recommendations Error: ', err);
        }
    );
    return authentication;
};

const getAssessmentStatusForUser = (authentication) => {
    _SDK.getAssessmentStatusForUser(
        authentication.auth,
        authentication.userId,
        1461055,
        // 745440,
        (response) => {
            console.log('Assessment Status Success: ', response);
        },
        (err) => {
            console.log('Assessment Status Error: ', err);
        }
    );
    return authentication;
};

const getFirstPage = (authentication) => {
    _SDK.getFirstPage(
        authentication.auth,
        authentication.userId,
        1461055,
        // 745440,
        (response) => {
            console.log('First Page Success: ', response);
        },
        (err) => {
            console.log('First Page Error: ', err);
        }
    );
    return authentication;
};

const savePage = (authentication) => {
    _SDK.postPage(
        authentication.auth,
        authentication.userId,
        1461055,
        "1",
        "1",
        {
            "1463169": [
                {
                    "20090": "average"
                }
            ]
        },
        (response) => {
            console.log('Save Page Success: ', response);
        },
        (err) => {
            console.log('Save Page Error: ', err);
        }
    );
    return authentication;
};

new Promise(getAccessToken)
    .then(getRatAuthentication)
    // .then(getAllAssessments)
    // .then(getUserDetails)
    // .then(getCalculation)
    // .then(getRecommendations)
    // .then(getAssessmentStatusForUser)
    // .then(getFirstPage)
    // .then(savePage)
    .catch((e) => {
        console.log('App Error: ', e);
    });
