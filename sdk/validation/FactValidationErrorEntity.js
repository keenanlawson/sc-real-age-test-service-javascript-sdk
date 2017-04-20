import FactValidationErrorEntityBuilder from './FactValidationErrorEntityBuilder';

let _id = new WeakMap();
let _value = new WeakMap();
let _minimumValue = new WeakMap();
let _maximumValue = new WeakMap();
let _foundType = new WeakMap();
let _expectedType = new WeakMap();
let _acceptedValues = new WeakMap();

export default class FactValidationErrorEntity {

    constructor({id = '', value = '', minimumValue = '', maximumValue = '', foundType = '', expectedType = '', acceptedValues = ''}) {

        _id.set(this, id);
        _value.set(this, value);
        _minimumValue.set(this, minimumValue);
        _maximumValue.set(this, maximumValue);
        _foundType.set(this, foundType);
        _expectedType.set(this, expectedType);
        _acceptedValues.set(this, acceptedValues);
    }

    get id() { _id.get(this); }
    get value() { _value.get(this); }
    get minimumValue() { _minimumValue.get(this); }
    get maximumValue() { _maximumValue.get(this); }
    get foundType() { _foundType.get(this); }
    get expectedType() { _expectedType.get(this); }
    get acceptedValues() { _acceptedValues.get(this); }

    set id(id) { _id.set(this, id); return this; }
    set value(value) { _value.set(this, value); return this; }
    set minimumValue(minimumValue) { _minimumValue.set(this, minimumValue); return this; }
    set maximumValue(maximumValue) { _maximumValue.set(this, maximumValue); return this; }
    set foundType(foundType) { _foundType.set(this, foundType); return this; }
    set expectedType(expectedType) { _expectedType.set(this, expectedType); return this; }
    set acceptedValues(acceptedValues) { _acceptedValues.set(this, acceptedValues); return this; }

    static builder() {
        return new FactValidationErrorEntityBuilder();
    }
}