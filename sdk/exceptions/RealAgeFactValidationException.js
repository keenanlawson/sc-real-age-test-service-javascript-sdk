import ExtendableException from './ExtendableException';

export default class RealAgeFactValidationException extends ExtendableException {

    constructor(message) {
        super(message);
    }
}
