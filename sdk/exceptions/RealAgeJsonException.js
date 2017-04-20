import ExtendableException from './ExtendableException';

export default class RealAgeJsonException extends ExtendableException {

    constructor(message) {
        super(message);
    }
}
