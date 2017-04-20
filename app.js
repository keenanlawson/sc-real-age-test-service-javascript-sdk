const RealAgeTestServiceSDK = require('./build/RealAgeTestServiceSDK').default;

const _SDK = new RealAgeTestServiceSDK();
console.log(_SDK.getUserDetails());