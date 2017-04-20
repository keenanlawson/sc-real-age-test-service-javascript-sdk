import FactValidationErrorEntity from './FactValidationErrorEntity';

/**
 * Set up private data storage
 * @type {WeakMap}
 * @private
 */
let _id = new WeakMap();
let _value = new WeakMap();
let _minimumValue = new WeakMap();
let _maximumValue = new WeakMap();
let _foundType = new WeakMap();
let _expectedType = new WeakMap();
let _acceptedValues = new WeakMap();

export default class FactValidationErrorEntityBuilder {

    constructor() {}

    build({id = '', value = '', minimumValue = '', maximumValue = '', foundType = '', expectedType = '', acceptedValues = ''}) {

        _id.set(this, id);
        _value.set(this, value);
        _minimumValue.set(this, minimumValue);
        _maximumValue.set(this, maximumValue);
        _foundType.set(this, foundType);
        _expectedType.set(this, expectedType);
        _acceptedValues.set(this, acceptedValues);

        return new FactValidationErrorEntity({
            id: _id.get(this),
            value: _value.get(this),
            minimumValue: _minimumValue.get(this),
            maximumValue: _maximumValue.get(this),
            foundType: _foundType.get(this),
            expectedType: _expectedType.get(this),
            acceptedValues: _acceptedValues.get(this)
        });
    }

    set id(id) { _id.set(this, id); return this; }
    set value(value) { _value.set(this, value); return this; }
    set minimumValue(minimumValue) { _minimumValue.set(this, minimumValue); return this; }
    set maximumValue(maximumValue) { _maximumValue.set(this, maximumValue); return this; }
    set foundType(foundType) { _foundType.set(this, foundType); return this; }
    set expectedType(expectedType) { _expectedType.set(this, expectedType); return this; }
    set acceptedValues(acceptedValues) { _acceptedValues.set(this, acceptedValues); return this; }
}