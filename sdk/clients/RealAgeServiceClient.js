import RealAgeTestException from '../exceptions/RealAgeTestException';
import RequestBuilder from '../clients/RequestBuilder';
import request from 'request';

export default class RealAgeServiceClient {

    constructor() {
        this.requestBuilder = new RequestBuilder();
    }

    sanitizeTokenTypeAndToken(realAgeAuthentication, userId) {

        if(!userId) {
            throw new RealAgeTestException("No user id found");
        } else if(!realAgeAuthentication) {
            throw new RealAgeTestException("No authentication credentials found");
        } else if(!realAgeAuthentication.getTokenType()) {
            throw new RealAgeTestException("No TokenType or token specified");
        }
    }

    createRequest(url, method, requestOptions) {
        return new Promise((resolve, reject) => {
            request[method.toLowerCase()](url, requestOptions, (err, response, body) => {
                if (err) { reject(err); }
                resolve(body);
            });
        });
    }

    getUserDetails(hostUrl, realAgeAuthentication, userId) {
        let req = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            req = this.createRequest(`${hostUrl}/user/${userId}`, 'GET', this.requestBuilder.buildHttpEntity(realAgeAuthentication, userId));
        } catch (ex) {
            console.error(ex.message);
        }
        return req;
    }
};
