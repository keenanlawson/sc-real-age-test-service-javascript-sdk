import RealAgeTestException from '../exceptions/RealAgeTestException';
import RequestBuilder from '../clients/RequestBuilder';

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

    getToken(hostUrl, realAgeAuthentication, credentials) {
        let getDataPromise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, credentials);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, credentials);
            requestOptions.json = true;
            requestOptions.qs = { grant_type: 'password' };
            getDataPromise = this.requestBuilder.createRequest(hostUrl, 'POST', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return getDataPromise;
    }

    getUserDetails(hostUrl, realAgeAuthentication, userId) {
        let getDataPromise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, userId);
            getDataPromise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return getDataPromise;
    }
};
