import TokenType from './TokenType';

export default class RequestBuilder {

    constructor() {}

    buildHttpHeader(tokenType, token) {
        return {
            'Authorization': `${TokenType.getPrependedAuthHeaderString(tokenType)} ${token}`,
            'Access-Control-Allow-Headers': 'application/json'
        };
    }

    buildHttpEntity(realAgeAuthentication, entity) {
        const tokenType = realAgeAuthentication.getTokenType();
        const token = realAgeAuthentication.getToken();
        let httpEntity = null;

        if (entity) {
            httpEntity = {
                body: entity,
                header: this.buildHttpHeader(tokenType, token)
            };
        } else {
            httpEntity = {
                header: this.buildHttpHeader(tokenType, token)
            };
        }

        return httpEntity;
    }
};