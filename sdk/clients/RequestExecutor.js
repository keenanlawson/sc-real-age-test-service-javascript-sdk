import RealAgeJsonException from '../exceptions/RealAgeJsonException';
import RealAgeFactValidationException from '../exceptions/RealAgeFactValidationException';

export default class RealAgeRequestExecutor {

    constructor() {}



    /**
     *
     * @param {Promise} callableRequest
     * @param {Function} onSuccess
     * @param {Function} onError
     * @returns {*}
     */
    executeRequest(callableRequest, onSuccess, onError) {
        let responseDTO;
        try {
            const response = callableRequest.then(onSuccess).catch(onError);

            responseDTO = this.handleSuccessfulResponse(response);
        } catch (err) {
            if (err instanceof RealAgeJsonException) {
                responseDTO = this.handleFailedResponse({realAgeJsonException: err});
            } else if (err instanceof RealAgeFactValidationException) {
                responseDTO = this.handleFailedResponse({realAgeFactValidationException: err});
            } else {
                responseDTO = this.handleGenericFailedResponse(err);
            }
        }
        return responseDTO;
    }

    executeRawRequest(callableRequest) {
        try {
            return callableRequest.call();
        } catch (err) {
            throw err.getCause();
        }
    }

    executeNoResponseRequest(callableRequest) {
        callableRequest.call();
    }

    handleSuccessfulResponse(response) {
        // ResponseDTO<T> responseDTO = new ResponseDTO();
        // responseDTO.setData(response);
        // responseDTO.setResult(Result.SUCCESS);
        // return responseDTO;
    }

    handleFailedResponse({realAgeJsonException, realAgeFactValidationException}) {
        if (realAgeJsonException) {
            // ResponseDTO<T> responseDTO = new ResponseDTO();
            // responseDTO.setResult(Result.FAILURE);
            // responseDTO.setErrors(new ArrayList<ErrorDTO>() {
            //     {
            //         this.addAll(RealAgeRequestExecutor.this.buildErrorDTO(exception));
            //     }
            // });
        }

        if (realAgeFactValidationException) {
            // ResponseDTO<T> responseDTO = new ResponseDTO();
            // responseDTO.setResult(Result.FAILURE);
            // final ErrorDTO errorDTO = new ErrorDTO();
            // errorDTO.setDirective(ExceptionDirective.LOG.name());
            // errorDTO.setErrorCode(412);
            // errorDTO.setErrorMessage(exception.getMessage());
            // responseDTO.setErrors(new ArrayList<ErrorDTO>() {
            //     {
            //         this.add(errorDTO);
            //     }
            // });
        }

        return responseDTO;
    }

    handleGenericFailedResponse(exception) {
        // ResponseDTO<T> responseDTO = new ResponseDTO();
        // responseDTO.setResult(Result.FAILURE);
        // final ErrorDTO errorDTO = new ErrorDTO();
        // errorDTO.setDirective(ExceptionDirective.LOG.name());
        // errorDTO.setErrorCode(500);
        // errorDTO.setErrorMessage(exception.getMessage());
        // responseDTO.setErrors(new ArrayList<ErrorDTO>() {
        //     {
        //         this.add(errorDTO);
        //     }
        // });
        // return responseDTO;
    }

    buildErrorDTO(realAgeJsonException) {
        // List<ErrorDTO> errorDTOs = new ArrayList();
        // Iterator var3 = e.getErrors().iterator();
        // while(var3.hasNext()) {
        //     String errorMesage = (String)var3.next();
        //     ErrorDTO errorDTO = new ErrorDTO();
        //     errorDTO.setDirective(e.getExceptionDirective().name());
        //     errorDTO.setErrorCode(e.getErrorCode().intValue());
        //     errorDTO.setErrorMessage(errorMesage);
        //     errorDTOs.add(errorDTO);
        // }
        // return errorDTOs;
    }
};
