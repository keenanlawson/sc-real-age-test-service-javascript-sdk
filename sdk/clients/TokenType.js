import RealAgeTestException from '../exceptions/RealAgeTestException';

/**
 * 'Enum' for a TokenType
 * @readonly
 * @enum {String}
 */
export const TokenTypes = Object.freeze({
    ANONYMOUS: 'ANONYMOUS',
    BASIC: 'BASIC',
    SSO: 'SSO'
});

export default class TokenType {

    constructor() {}

    static getPrependedAuthHeaderString(tokenType) {

        switch(TokenTypes[tokenType]) {
            case 'ANONYMOUS':
                return 'RATM';
            case 'BASIC':
                return 'Basic';
            case 'SSO':
                return 'SSO';
            default:
                throw new RealAgeTestException('Unknown TokenType ' + tokenType);
        }
    }
}