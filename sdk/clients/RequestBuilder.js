import TokenType from './TokenType';
import request from 'request';

let _logger = new WeakMap();

export default class RequestBuilder {

    constructor() {}

    debug(logger) {
        _logger.set(this, logger);
    }

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
        return new Promise((resolve, reject) => {
            _logger.get(this)('RealAgeTestServiceSDK Logger: Request Options -> ', requestOptions);
            request(requestOptions, (err, response, body) => {
                if (err) { reject(err); }
                else { resolve(body); }
            });
        });
    }
};
