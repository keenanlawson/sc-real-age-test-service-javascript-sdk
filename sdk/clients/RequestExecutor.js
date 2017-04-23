import RealAgeJsonException from '../exceptions/RealAgeJsonException';
import RealAgeFactValidationException from '../exceptions/RealAgeFactValidationException';
import ExceptionDirective from '../exceptions/ExceptionDirective';
import ErrorDTO from '../dtos/ErrorDTO';
import ResponseDTO from '../dtos/ResponseDTO';
import Result from '../dtos/ResponseDTO';

export default class RequestExecutor {

    constructor() {}

    /**
     *
     * @param {Promise} callableRequest
     * @param {Function} onSuccess
     * @param {Function} onError
     * @returns {*}
     */
    executeRequest(callableRequest, onSuccess, onError) {
        let responseDTO = {};
        callableRequest.then((response) => {
            onSuccess(this.handleSuccessfulResponse(response));
        }).catch((err) => {
            console.log('Promise Error: ', err);
            if (err instanceof RealAgeJsonException) {
                responseDTO = this.handleFailedResponse({realAgeJsonException: err});
            } else if (err instanceof RealAgeFactValidationException) {
                responseDTO = this.handleFailedResponse({realAgeFactValidationException: err});
            } else {
                responseDTO = this.handleGenericFailedResponse(err);
            }
            onError(err);
        });
        return responseDTO;
    }

    executeRawRequest(callableRequest, onSuccess, onError) {
        try {
            callableRequest.then((response) => {
                onSuccess(response);
            }).catch((err) => {
                onError(err);
            });
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
    }

    executeNoResponseRequest(callableRequest, onSuccess, onError) {
        try {
            callableRequest.then(() => {
                onSuccess();
            }).catch((err) => {
                onError(err);
            });
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
    }

    handleSuccessfulResponse(response) {
        let responseDTO = new ResponseDTO();
        responseDTO.setData(response);
        responseDTO.setResult(Result.SUCCESS);
        return responseDTO;
    }

    handleFailedResponse({realAgeJsonException, realAgeFactValidationException}) {
        let responseDTO = new ResponseDTO();
        responseDTO.setResult(Result.FAILURE);
        if (realAgeJsonException) {
            responseDTO.setErrors(this.buildErrorDTO(realAgeJsonException));
        } else if (realAgeFactValidationException) {
            let errorDTO = new ErrorDTO();
            errorDTO.setDirective(ExceptionDirective.LOG);
            errorDTO.setErrorCode(412);
            errorDTO.setErrorMessage(realAgeFactValidationException.message);
            responseDTO.setErrors(errorDTO);
        }
        return responseDTO;
    }

    handleGenericFailedResponse(exception) {
        let responseDTO = new ResponseDTO();
        responseDTO.setResult(Result.FAILURE);
        let errorDTO = new ErrorDTO();
        errorDTO.setDirective(ExceptionDirective.LOG);
        errorDTO.setErrorCode(500);
        errorDTO.setErrorMessage(exception.message);
        responseDTO.setErrors(errorDTO);
        return responseDTO;
    }

    buildErrorDTO(realAgeJsonException) {
        return realAgeJsonException.getErrors().map((error) => {
            let errorDTO = new ErrorDTO();
            errorDTO.setDirective(realAgeJsonException.getExceptionDirective().name());
            errorDTO.setErrorCode(realAgeJsonException.getErrorCode().intValue());
            errorDTO.setErrorMessage(error.message);
            return errorDTO;
        });
    }
};
