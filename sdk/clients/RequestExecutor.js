import RealAgeJsonException from '../exceptions/RealAgeJsonException';
import RealAgeFactValidationException from '../exceptions/RealAgeFactValidationException';
import ExceptionDirective from '../exceptions/ExceptionDirective';
import ErrorDTO from '../dtos/ErrorDTO';
import ResponseDTO from '../dtos/ResponseDTO';
import {Result} from '../dtos/ResponseDTO';

export default class RequestExecutor {

    constructor() {}

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
                resolve(this.handleSuccessfulResponse(response));
            }).catch((err) => {
                if (err instanceof RealAgeJsonException) {
                    responseDTO = this.handleFailedResponse({realAgeJsonException: err});
                } else if (err instanceof RealAgeFactValidationException) {
                    responseDTO = this.handleFailedResponse({realAgeFactValidationException: err});
                } else {
                    responseDTO = this.handleGenericFailedResponse(err);
                }
                reject(responseDTO);
            });
        } catch (err) {
            responseDTO = this.handleGenericFailedResponse(err);
            reject(responseDTO);
        }
    }

    executeRawRequest(promise, resolve, reject) {
        let responseDTO = {};
        try {
            promise.then((response) => {
                resolve(this.handleSuccessfulResponse(response));
            }).catch((err) => {
                if (err instanceof RealAgeJsonException) {
                    responseDTO = this.handlePostPageFailedResponse({realAgeJsonException: err});
                } else if (err instanceof RealAgeFactValidationException) {
                    responseDTO = this.handlePostPageFailedResponse({realAgeFactValidationException: err});
                } else {
                    responseDTO = this.handleGenericFailedResponse(err);
                }
                reject(responseDTO);
            });
        } catch (err) {
            responseDTO = this.handleGenericFailedResponse(err);
            reject(responseDTO);
        }
    }

    executeNoResponseRequest(promise, resolve, reject) {
        try {
            promise.then((response) => {
                resolve(this.handleSuccessfulResponse(response));
            }).catch((err) => {
                reject(this.handleGenericFailedResponse(err));
            });
        } catch (err) {
            reject(this.handleGenericFailedResponse(err));
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
