const RealAgeTestServiceSDK = require('./build/RealAgeTestServiceSDK').default;

const _SDK = new RealAgeTestServiceSDK();
const _TOKEN_AUTH = _SDK.getAuthentication({
    tokenType: 'BASIC',
    token: 'c2hhcmVjYXJlOmhzd2k='
});

// const onTokenSuccess = (response) => {
//     console.log('Token Success: ', response);
//     getAuthentication(response.access_token, response.account_id);
// };
// const onTokenError = (err) => {
//     console.log('Token Error: ', err);
// };
const getToken = new Promise((resolve, reject) => {
    _SDK.getToken(
        _TOKEN_AUTH,
        {username: 'klawson@sharecare.com', password: 'sharecare'},
        (response) => {
            console.log('Token Success: ', response);
            if (response.access_token && response.account_id) {
                resolve(response);
            } else {
                reject(new Error('Bad Token or UserID'));
            }
        },
        (err) => {
            console.log('Token Error: ', err);
            reject(err);
        }
    );
});

getToken().then((response) => {
    const _RAT_AUTH = _SDK.getAuthentication({
        tokenType: 'SSO',
        token: response.access_token,
        userId: response.account_id
    });
    const getDetails = new Promise((resolve, reject) => {
        _SDK.getUserDetails(
            _RAT_AUTH,
            response.account_id,
            (response) => {
                console.log('Auth Success: ', response);
                resolve(response);
            },
            (err) => {
                console.log('Auth Error: ', err);
                reject(err);
            });
    });
    getDetails.then((response)=> {
        console.log(response);
    }).catch((e) => {
        console.log('Details Error: ', err);
    });
}).catch((e) => {
    console.log('Auth Error: ', e);
});



// const onAuthSuccess = (response) => {
//     console.log('Auth Success: ', response);
// };
// const onAuthError = (err) => {
//     console.log('Auth Error: ', err);
// };
// const getAuthentication = (token, userId) => {
//     const _RAT_AUTH = _SDK.getAuthentication({
//         tokenType: 'SSO',
//         token: token,
//         userId: userId
//     });
//     const x = new Promise((resolve, reject) => {
//         _SDK.getUserDetails(_RAT_AUTH, _USER_ID, onAuthSuccess, onAuthError);
//     });
// };

// _SDK.getToken(_TOKEN_AUTH, {username: 'klawson@sharecare.com', password: 'sharecare'}, onSuccess, onError);

// const _USER_ID = '814aff97-4221-4baf-a28b-a0586baa3599';
// const _RAT_AUTH = _SDK.getAuthentication({
//     tokenType: 'SSO',
//     token: 'rDjCrfjKq5OoSDMq50jJ7rTfM3TsgeDuXGio_xJoSk-hx3ty-kT0GEH6tu7329AAZ2F_gty6g0Mnt3Vypj9ls8ldn-LduHw9GqkW2mXpvp1qXqKfCEdqcva2IV1iycA-HIFZ56FdRDZ9o-Hq74VheTxGYeSWvevrnOCoBmCJ2HXc9yrELBbbNuW5Z2xVKwui9J6GK0xktMgUcKIRHFZ0ZaG5-4pq65XGOxukh6mZ60-WWDZrg3Y1T_wl',
//     userId: _USER_ID
// });



// _SDK.getUserDetails(_RAT_AUTH, _USER_ID, onSuccess, onError);
