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

    createRequest(url, method = 'GET', requestOptions) {
        // TODO: rename and clean up
        const xxx = {url: url, method: method, headers: requestOptions.headers};
        if (requestOptions.body) {
            xxx.body = requestOptions.body;
        }
        if (requestOptions.json) {
            xxx.json = requestOptions.json;
        }
        console.log(xxx);
        return new Promise((resolve, reject) => {
            request(xxx, (err, response, body) => {
                if (err) { reject(err); }
                resolve(body);
            });
        });
    }
};
