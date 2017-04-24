'use strict';
import RealAgeAuthentication from './authentication/RealAgeAuthentication';
import RequestExecutor from './clients/RequestExecutor';
import RealAgeServiceClient from './clients/RealAgeServiceClient';


/****************************************
 * Setup for singleton
 ****************************************/
let instance = null;

const requestExecutor = new RequestExecutor();
const realAgeServiceClient = new RealAgeServiceClient();

/**
 * Set up private data storage
 * @type {WeakMap}
 * @private
 */
let _protocol = new WeakMap();
let _port = new WeakMap();
let _host = new WeakMap();
let _location = new WeakMap();
let _baseUrl = new WeakMap();

/**
 * @returns {{getInstance: Function}}
 * @example new RealAgeTestServiceSDK(options);
 */
export default class RealAgeTestServiceSDK {

    /**
     *
     * @param protocol
     * @param port
     * @param host
     * @returns {RealAgeTestServiceSDK}
     */
    constructor({ protocol = 'https', port = '', host = 'micro.mservices.sharecare.com' } = {}) {

        if (!instance) {

            _protocol.set(this, protocol);
            _port.set(this, port);
            _host.set(this, host);
            _location.set(this, 'rat');
            _baseUrl.set(this, `${protocol}://${host}${port ? ':' + port : ''}/${_location.get(this)}`);

            instance = this;
        }

        return instance;
    }

    static getToken(realAgeAuthentication, { username = '', password = ''}, onSuccess, onError) {
        const hostUrl = 'https://auth.mservices.sharecare.com/access';
        requestExecutor.executeRequest(
            realAgeServiceClient.getToken(hostUrl, realAgeAuthentication, { username, password }),
            onSuccess,
            onError
        );
    }

    static getAuthentication({ tokenType = 'ANONYMOUS', token = '', userId = '' }) {
        return new RealAgeAuthentication({ tokenType, token, userId });
    }

    getAllAssessments(realAgeAuthentication, userId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getAllAssessments(hostUrl, realAgeAuthentication, userId),
            onSuccess,
            onError
        );
    }

    getUserDetails(realAgeAuthentication, userId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getUserDetails(hostUrl, realAgeAuthentication, userId),
            onSuccess,
            onError
        );
    }

    getUserAssessments(realAgeAuthentication, userId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getUserAssessments(hostUrl, realAgeAuthentication, userId),
            onSuccess,
            onError
        );
    }

    getAssessmentStatusForUser(realAgeAuthentication, userId, assessmentId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getAssessmentStatusForUser(hostUrl, realAgeAuthentication, userId, assessmentId),
            onSuccess,
            onError
        );
    }

    getFirstPage(realAgeAuthentication, userId, assessmentId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getFirstPage(hostUrl, realAgeAuthentication, userId, assessmentId),
            onSuccess,
            onError
        );
    }

    getPage(realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getPage(hostUrl, realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId),
            onSuccess,
            onError
        );
    }

    postPage(realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId, questionGroupAnswersDTO, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRawRequest(
            realAgeServiceClient.postPage(hostUrl, realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId, questionGroupAnswersDTO),
            onSuccess,
            onError
        );
    }

    getRecommendations(realAgeAuthentication, userId, assessmentId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getRecommendations(hostUrl, realAgeAuthentication, userId, assessmentId),
            onSuccess,
            onError
        );
    }

    getCalculation(realAgeAuthentication, userId, assessmentId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getCalculation(hostUrl, realAgeAuthentication, userId, assessmentId),
            onSuccess,
            onError
        );
    }

    getMicroBenefits(realAgeAuthentication, userId, assessmentId, microPaymentDTOs, persist, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getMicroBenefits(hostUrl, realAgeAuthentication, userId, assessmentId, microPaymentDTOs, persist),
            onSuccess,
            onError
        );
    }

    getPotentialBenefitForUser(realAgeAuthentication, userId, assessmentId, maximizedFactDataDTOs, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getPotentialBenefitForUser(hostUrl, realAgeAuthentication, userId, assessmentId, maximizedFactDataDTOs),
            onSuccess,
            onError
        );
    }

    requestSessionProfile(onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.requestSessionProfile(hostUrl),
            onSuccess,
            onError
        );
    }

    getRecommendedDVGContent(realAgeAuthentication, optAssessmentId = null, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRawRequest(
            realAgeServiceClient.getRecommendedDVGContent(hostUrl, realAgeAuthentication, optAssessmentId),
            onSuccess,
            onError
        );
    }

    getAllFactsForUser(realAgeAuthentication, userId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRawRequest(
            realAgeServiceClient.getAllFactsForUser(hostUrl, realAgeAuthentication, userId),
            onSuccess,
            onError
        );
    }

    getFactForUser(realAgeAuthentication, userId, factId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRawRequest(
            realAgeServiceClient.getFactForUser(hostUrl, realAgeAuthentication, userId, factId),
            onSuccess,
            onError
        );
    }

    getFactsForUser(realAgeAuthentication, userId, factIdSet, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRawRequest(
            realAgeServiceClient.getFactsForUser(hostUrl, realAgeAuthentication, userId, factIdSet),
            onSuccess,
            onError
        );
    }

    setFactsForUser(realAgeAuthentication, userId, factDataDTOSet, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRawRequest(
            realAgeServiceClient.setFactsForUser(hostUrl, realAgeAuthentication, userId, factDataDTOSet),
            onSuccess,
            onError
        );
    }

    getRealAgeStatusResult(realAgeAuthentication, userId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRawRequest(
            realAgeServiceClient.getRealAgeStatusResult(hostUrl, realAgeAuthentication, userId),
            onSuccess,
            onError
        );
    }

    subscribeToEmailMarketing(realAgeAuthentication, email, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeNoResponseRequest(
            realAgeServiceClient.subscribeToEmailMarketing(hostUrl, realAgeAuthentication, email),
            onSuccess,
            onError
        );
    }

    unsubscribeToEmailMarketing(realAgeAuthentication, email, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeNoResponseRequest(
            realAgeServiceClient.unsubscribeToEmailMarketing(hostUrl, realAgeAuthentication, email),
            onSuccess,
            onError
        );
    }

    // setFactForUser(hostUrl, realAgeAuthentication, userId, factDataDTO) {
    //     const hostUrl = _baseUrl.get(this);
    //     return this.setFactsForUser(hostUrl, realAgeAuthentication, userId, (Set)(new HashSet<FactDataDTO>() {
    //         {
    //             this.add(factDataDTO);
    //         }
    //     }));
    // }

    // setFactForUser(hostUrl, realAgeAuthentication, userId, factId, factValue) {
    //     const hostUrl = _baseUrl.get(this);
    //     return this.setFactForUser(hostUrl, realAgeAuthentication, userId, this.factDataAssembler.assemble(factId, factValue));
    // }

    // buildErrorDTO(realAgeJsonException) {
    //     List<ErrorDTO> errorDTOs = new ArrayList();
    //     Iterator var3 = realAgeJsonException.getErrors().iterator();
    //
    //     while(var3.hasNext()) {
    //         String errorMessage = (String)var3.next();
    //         ErrorDTO errorDTO = new ErrorDTO();
    //         errorDTO.setDirective(realAgeJsonException.getExceptionDirective().name());
    //         errorDTO.setErrorCode(realAgeJsonException.getErrorCode().intValue());
    //         errorDTO.setErrorMessage(errorMessage);
    //         errorDTOs.add(errorDTO);
    //     }
    //
    //     return errorDTOs;
    // }

    // handlePostPageFailedResponse(realAgeJsonException) {
    //     ResponseDTO<GoToPageDTO> responseDTO = new ResponseDTO();
    //     responseDTO.setResult(Result.FAILURE);
    //     responseDTO.setErrors(new ArrayList<ErrorDTO>() {
    //         {
    //             this.addAll(RealAgeServiceClientImpl.this.buildErrorDTO(realAgeJsonException));
    //         }
    //     });
    //     return responseDTO;
    // }

    // handlePostPageFailedResponse(realAgeFactValidationException) {
    //     ResponseDTO<GoToPageDTO> responseDTO = new ResponseDTO();
    //     responseDTO.setResult(Result.FAILURE);
    //     final ErrorDTO errorDTO = new ErrorDTO();
    //     errorDTO.setDirective(ExceptionDirective.LOG.name());
    //     errorDTO.setErrorCode(412);
    //     errorDTO.setErrorMessage(realAgeFactValidationException.getMessage());
    //     responseDTO.setErrors(new ArrayList<ErrorDTO>() {
    //         {
    //             this.add(errorDTO);
    //         }
    //     });
    //     return responseDTO;
    // }
};
