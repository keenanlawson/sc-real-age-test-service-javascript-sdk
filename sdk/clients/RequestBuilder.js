import TokenType from './TokenType';
import request from 'request';

export default class RequestBuilder {

    constructor() {}

    buildHttpHeader(tokenType, token) {
        return {
            authorization: `${TokenType.getPrependedAuthHeaderString(tokenType)} ${token}`,
            'Content-Type': 'application/json'
        };
    }

    buildHttpEntity(realAgeAuthentication, entity) {
        let httpEntity = {};
        if (realAgeAuthentication) {
            let tokenType = realAgeAuthentication.getTokenType();
            let token = realAgeAuthentication.getToken();
            httpEntity.headers = this.buildHttpHeader(tokenType, token);
        }
        if (entity) {
            httpEntity.body = entity;
        }
        return httpEntity;
    }

    createRequest(url, method = 'GET', options) {
        const requestOptions = {url: url, method: method, headers: options.headers};
        if (options.body) {
            requestOptions.body = options.body;
        }
        if (options.json) {
            requestOptions.json = options.json;
        }
        console.log(requestOptions);
        return new Promise((resolve, reject) => {
            request(requestOptions, (err, response, body) => {
                if (err) { reject(err); }
                resolve(body);
            });
        });
    }
};
