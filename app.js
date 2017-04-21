const RealAgeTestServiceSDK = require('./build/RealAgeTestServiceSDK').default;

const _SDK = new RealAgeTestServiceSDK();
const _TOKEN_AUTH = _SDK.getAuthentication({
    tokenType: 'BASIC',
    token: 'c2hhcmVjYXJlOmhzd2k='
});
const _TOKEN_BODY = {username: 'klawson@sharecare.com', password: 'sharecare'};

const onAccessTokenReceived = (response, resolve, reject) => {
    console.log('Token Success: ', response);
    if (response.access_token && response.account_id) {
        resolve(response);
    } else {
        reject(new Error('Bad Token or UserID'));
    }
};
const onAccessTokenError = (err, resolve, reject) => {
    console.log('Token Error: ', err);
    reject(err);
};

const getAccessToken = (resolve, reject) => {
    _SDK.getToken(
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
        auth: _SDK.getAuthentication({
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
};



new Promise(getAccessToken)
    .then(getRatAuthentication)
    .then(getUserDetails)
    .catch((e) => {
        console.log('App Error: ', e);
    });
