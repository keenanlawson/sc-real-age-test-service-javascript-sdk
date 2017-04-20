import ExtendableException from './ExtendableException';

export default class RealAgeTestException extends ExtendableException {

    constructor(message) {
        super(message);
    }
}
