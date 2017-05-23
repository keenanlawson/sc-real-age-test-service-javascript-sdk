import RealAgeJsonException from '../exceptions/RealAgeJsonException';
import RealAgeFactValidationException from '../exceptions/RealAgeFactValidationException';
import ExceptionDirective from '../exceptions/ExceptionDirective';
import ErrorDTO from '../dtos/ErrorDTO';
import ResponseDTO from '../dtos/ResponseDTO';
import {Result} from '../dtos/ResponseDTO';

let _logger = new WeakMap();

export default class RequestExecutor {

    constructor() {}

    debug(logger) {
        _logger.set(this, logger);
    }

    /**
     *
     * @param {Promise} promise
     * @param {Function} resolve
     * @param {Function} reject
     * @returns {*}
     */
    executeRequest(promise, resolve, reject) {
        let responseDTO = {};
        try {
            promise.then((response) => {
                _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Response -> ', response);
                responseDTO = this.handleSuccessfulResponse(response);
                _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Response -> ', responseDTO);
                resolve(responseDTO);
            }).catch((err) => {
                _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Error -> ', err);
                if (err instanceof RealAgeJsonException) {
                    responseDTO = this.handleFailedResponse({realAgeJsonException: err});
                } else if (err instanceof RealAgeFactValidationException) {
                    responseDTO = this.handleFailedResponse({realAgeFactValidationException: err});
                } else {
                    responseDTO = this.handleGenericFailedResponse(err);
                }
                _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Error -> ', responseDTO);
                reject(responseDTO);
            });
        } catch (err) {
            _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Error -> ', err);
            responseDTO = this.handleGenericFailedResponse(err);
            _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Error -> ', responseDTO);
            reject(responseDTO);
        }
    }

    executeRawRequest(promise, resolve, reject) {
        let responseDTO = {};
        try {
            promise.then((response) => {
                _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Response -> ', response);
                responseDTO = this.handleSuccessfulResponse(response);
                _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Response -> ', responseDTO);
                resolve(responseDTO);
            }).catch((err) => {
                _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Error -> ', err);
                if (err instanceof RealAgeJsonException) {
                    responseDTO = this.handlePostPageFailedResponse({realAgeJsonException: err});
                } else if (err instanceof RealAgeFactValidationException) {
                    responseDTO = this.handlePostPageFailedResponse({realAgeFactValidationException: err});
                } else {
                    responseDTO = this.handleGenericFailedResponse(err);
                }
                _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Error -> ', responseDTO);
                reject(responseDTO);
            });
        } catch (err) {
            _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Error -> ', err);
            responseDTO = this.handleGenericFailedResponse(err);
            _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Error -> ', responseDTO);
            reject(responseDTO);
        }
    }

    executeNoResponseRequest(promise, resolve, reject) {
        let responseDTO = {};
        try {
            promise.then((response) => {
                _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Response -> ', response);
                responseDTO = this.handleSuccessfulResponse(response);
                _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Response -> ', responseDTO);
                resolve(responseDTO);
            }).catch((err) => {
                _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Error -> ', err);
                responseDTO = this.handleGenericFailedResponse(err);
                _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Error -> ', responseDTO);
                reject(responseDTO);
            });
        } catch (err) {
            _logger.get(this)('RealAgeTestServiceSDK Logger: Raw Error -> ', err);
            responseDTO = this.handleGenericFailedResponse(err);
            _logger.get(this)('RealAgeTestServiceSDK Logger: DTO Error -> ', responseDTO);
            reject(responseDTO);
        }
    }

    handleSuccessfulResponse(response) {
        if (response.hasOwnProperty('data') && response.hasOwnProperty('result')) {
            return new ResponseDTO(Object.assign(response, {errors: []}));
        } else {
            return new ResponseDTO()
                .setData(response)
                .setResult(Result.SUCCESS);
        }
    }

    handleFailedResponse({realAgeJsonException, realAgeFactValidationException}) {
        let responseDTO = new ResponseDTO().setResult(Result.FAILURE);
        if (realAgeJsonException) {
            responseDTO.setErrors(this.buildErrorDTO(realAgeJsonException));
        } else if (realAgeFactValidationException) {
            responseDTO.setErrors(new ErrorDTO()
                .setDirective(ExceptionDirective.LOG)
                .setErrorCode(412)
                .setErrorMessage(realAgeFactValidationException.message));
        }
        return responseDTO;
    }

    handleGenericFailedResponse(exception) {
        return new ResponseDTO()
            .setResult(Result.FAILURE)
            .setErrors(new ErrorDTO()
                .setDirective(ExceptionDirective.LOG)
                .setErrorCode(500)
                .setErrorMessage(exception.message)
            );
    }

    buildErrorDTO(realAgeJsonException) {
        return realAgeJsonException.getErrors().map((error) => {
            return new ErrorDTO()
                .setDirective(realAgeJsonException.getExceptionDirective().name())
                .setErrorCode(realAgeJsonException.getErrorCode().intValue())
                .setErrorMessage(error.message);
        });
    }

    handlePostPageFailedResponse({realAgeJsonException, realAgeFactValidationException}) {
        let responseDTO = new ResponseDTO().setResult(Result.FAILURE);
        if (realAgeJsonException) {
            responseDTO.setErrors(this.buildErrorDTO(realAgeJsonException));
        } else if (realAgeFactValidationException) {
            responseDTO.setErrors(new ErrorDTO()
                .setDirective(ExceptionDirective.LOG)
                .setErrorCode(412)
                .setErrorMessage(realAgeFactValidationException.message));
        }
        return responseDTO;
    }
};
