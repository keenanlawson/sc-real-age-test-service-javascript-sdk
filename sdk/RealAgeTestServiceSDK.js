'use strict';
// import RealAgeAuthentication from './authentication/RealAgeAuthentication';
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
            _baseUrl.set(this, `${this.protocol}://${this.host}${this.port ? ':' + this.port : ''}/${this.location}`);

            instance = this;
        }

        return instance;
    }

    // getAuthentication({ tokenType = 'anonymous', token = '', userId = '' }) {
    //     return new RealAgeAuthentication({ tokenType, token, userId });
    // }

    getUserDetails(realAgeAuthentication, userId, onSuccess, onError) {
        const hostUrl = _baseUrl.get(this);
        requestExecutor.executeRequest(
            realAgeServiceClient.getUserDetails(hostUrl, realAgeAuthentication, userId),
            onSuccess,
            onError
        );
    }

    // getAssessments(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<List<AssessmentDTO>>() {
    //         public List<AssessmentDTO> callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getAssessments(hostUrl, realAgeAuthentication, userId);
    //         }
    //     });
    // }
    //
    // getAssessmentStatusForUser(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String assessmentId) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<AssessmentStatusDTO>() {
    //         public AssessmentStatusDTO callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getAssessmentStatusForUser(hostUrl, realAgeAuthentication, userId, assessmentId);
    //         }
    //     });
    // }
    //
    // getFirstPage(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String assessmentId) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<PageDTO>() {
    //         public PageDTO callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getFirstPage(hostUrl, realAgeAuthentication, userId, assessmentId);
    //         }
    //     });
    // }
    //
    // getPage(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String assessmentId, final String moduleId, final String questionGroupId) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<PageDTO>() {
    //         public PageDTO callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getPage(hostUrl, realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId);
    //         }
    //     });
    // }
    //
    // postPage(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String assessmentId, final String moduleId, final String questionGroupId, final QuestionGroupAnswersDTO questionGroupAnswersDTO) {
    //     try {
    //         return (ResponseDTO)this.realAgeRequestExecutor.executeRawRequest(new CallableRequest<ResponseDTO<GoToPageDTO>>() {
    //             public ResponseDTO<GoToPageDTO> callRequest() {
    //                 return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.postPage(hostUrl, realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId, questionGroupAnswersDTO);
    //             }
    //         });
    //     } catch (Throwable var9) {
    //         return var9 instanceof RealAgeJsonException?this.handlePostPageFailedResponse((RealAgeJsonException)var9):(var9 instanceof RealAgeFactValidationException?this.handlePostPageFailedResponse((RealAgeFactValidationException)var9):null);
    //     }
    // }
    //
    // getRecommendations(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String assessmentId) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<List<RecommendationGroupDTO>>() {
    //         public List<RecommendationGroupDTO> callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getRecommendations(hostUrl, realAgeAuthentication, userId, assessmentId);
    //         }
    //     });
    // }
    //
    // getCalculation(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String assessmentId) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<CalculationDTO>() {
    //         public CalculationDTO callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getCalculation(hostUrl, realAgeAuthentication, userId, assessmentId);
    //         }
    //     });
    // }
    //
    // getMicroBenefits(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String assessmentId, final List<MicroPaymentDTO> microPaymentDTOs, final boolean persist) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<List<MicroBenefitDTO>>() {
    //         public List<MicroBenefitDTO> callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getMicroBenefits(hostUrl, realAgeAuthentication, userId, assessmentId, microPaymentDTOs, persist);
    //         }
    //     });
    // }
    //
    // getPotentialBenefitForUser(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String assessmentId, final List<FactDataDTO> maximizedFactDataDTOs) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<Double>() {
    //         public Double callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getPotentialBenefitForUser(hostUrl, realAgeAuthentication, userId, assessmentId, maximizedFactDataDTOs);
    //         }
    //     });
    // }
    //
    // requestSessionProfile(final String hostUrl) {
    //     return this.realAgeRequestExecutor.executeRequest(new CallableRequest<SessionProfileDTO>() {
    //         public SessionProfileDTO callRequest() {
    //             return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.requestSessionProfile(hostUrl);
    //         }
    //     });
    // }
    //
    // getRecommendedDVGContent(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final Optional<String> optAssessmentId) {
    //     try {
    //         return Optional.fromNullable(this.doctorVisitGuideDataAssembler.assemble((List)this.realAgeRequestExecutor.executeRawRequest(new CallableRequest<List<DoctorVisitGuideRecommendationGroupDTO>>() {
    //             public List<DoctorVisitGuideRecommendationGroupDTO> callRequest() {
    //                 return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getRecommendedDoctorVisitGuideContent(hostUrl, realAgeAuthentication, optAssessmentId.isPresent()?(String)optAssessmentId.get():null);
    //             }
    //         })));
    //     } catch (Throwable var5) {
    //         return Optional.absent();
    //     }
    // }
    //
    // getAllFactsForUser(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId) {
    //     try {
    //         return Optional.fromNullable(this.realAgeRequestExecutor.executeRawRequest(new CallableRequest<Set<FactDataDTO>>() {
    //             public Set<FactDataDTO> callRequest() {
    //                 return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getAllFactsForUser(hostUrl, realAgeAuthentication, userId);
    //             }
    //         }));
    //     } catch (Throwable var5) {
    //         return Optional.absent();
    //     }
    // }
    //
    // getFactForUser(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final String factId) {
    //     try {
    //         return Optional.fromNullable(this.realAgeRequestExecutor.executeRawRequest(new CallableRequest<FactDataDTO>() {
    //             public FactDataDTO callRequest() {
    //                 Set<FactDataDTO> response = RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getFactForUser(hostUrl, realAgeAuthentication, userId, factId);
    //                 return response.isEmpty()?null:(FactDataDTO)response.iterator().next();
    //             }
    //         }));
    //     } catch (Throwable var6) {
    //         return Optional.absent();
    //     }
    // }
    //
    // getFactsForUser(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final Set<String> factIdSet) {
    //     try {
    //         return Optional.fromNullable(this.realAgeRequestExecutor.executeRawRequest(new CallableRequest<Set<FactDataDTO>>() {
    //             public Set<FactDataDTO> callRequest() {
    //                 return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getFactsForUser(hostUrl, realAgeAuthentication, userId, factIdSet);
    //             }
    //         }));
    //     } catch (Throwable var6) {
    //         return Optional.absent();
    //     }
    // }
    //
    // setFactsForUser(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId, final Set<FactDataDTO> factDataDTOSet) {
    //     try {
    //         return (Optional)this.realAgeRequestExecutor.executeRawRequest(new CallableRequest<Optional<FactValidationExceptionResponse>>() {
    //             public Optional<FactValidationExceptionResponse> callRequest() {
    //                 return RealAgeServiceClientImpl.this.realAgeServiceHttpClient.setFactsForUser(hostUrl, realAgeAuthentication, userId, factDataDTOSet);
    //             }
    //         });
    //     } catch (Throwable var6) {
    //         return var6 instanceof RealAgeFactValidationException?Optional.of(((RealAgeFactValidationException)var6).getFactValidationExceptionResponse()):Optional.absent();
    //     }
    // }
    //
    // setFactsForUser(String hostUrl, RealAgeAuthentication realAgeAuthentication, String userId, Map<String, String> factIdFactValueMap) {
    //     Set<FactDataDTO> factDataDTOSet = new HashSet();
    //     Iterator var6 = factIdFactValueMap.keySet().iterator();
    //
    //     while(var6.hasNext()) {
    //         String factId = (String)var6.next();
    //         String factValue = (String)factIdFactValueMap.get(factId);
    //         factDataDTOSet.add(this.factDataAssembler.assemble(factId, factValue));
    //     }
    //
    //     return this.setFactsForUser(hostUrl, realAgeAuthentication, userId, (Set)factDataDTOSet);
    // }
    //
    // getRealAgeStatusResult(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String userId) {
    //     try {
    //         return (Optional)this.realAgeRequestExecutor.executeRawRequest(new CallableRequest<Optional<RealAgeStatusResultDTO>>() {
    //             public Optional<RealAgeStatusResultDTO> callRequest() {
    //                 return Optional.fromNullable(RealAgeServiceClientImpl.this.realAgeServiceHttpClient.getRealAgeStatusResult(hostUrl, realAgeAuthentication, userId));
    //             }
    //         });
    //     } catch (Throwable var5) {
    //         return Optional.absent();
    //     }
    // }
    //
    // subscribeToEmailMarketing(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String email) {
    //     this.realAgeRequestExecutor.executeNoResponseRequest(new CallableRequest<Void>() {
    //         public Void callRequest() {
    //             RealAgeServiceClientImpl.this.realAgeServiceHttpClient.subscribeToEmailMarketing(hostUrl, realAgeAuthentication, email);
    //             return null;
    //         }
    //     });
    // }
    //
    // unsubscribeToEmailMarketing(final String hostUrl, final RealAgeAuthentication realAgeAuthentication, final String email) {
    //     this.realAgeRequestExecutor.executeNoResponseRequest(new CallableRequest<Void>() {
    //         public Void callRequest() {
    //             RealAgeServiceClientImpl.this.realAgeServiceHttpClient.unsubscribeToEmailMarketing(hostUrl, realAgeAuthentication, email);
    //             return null;
    //         }
    //     });
    // }
    //
    // setFactForUser(String hostUrl, RealAgeAuthentication realAgeAuthentication, String userId, final FactDataDTO factDataDTO) {
    //     return this.setFactsForUser(hostUrl, realAgeAuthentication, userId, (Set)(new HashSet<FactDataDTO>() {
    //         {
    //             this.add(factDataDTO);
    //         }
    //     }));
    // }
    //
    // setFactForUser(String hostUrl, RealAgeAuthentication realAgeAuthentication, String userId, String factId, String factValue) {
    //     return this.setFactForUser(hostUrl, realAgeAuthentication, userId, this.factDataAssembler.assemble(factId, factValue));
    // }
    //
    // buildErrorDTO(RealAgeJsonException e) {
    //     List<ErrorDTO> errorDTOs = new ArrayList();
    //     Iterator var3 = e.getErrors().iterator();
    //
    //     while(var3.hasNext()) {
    //         String errorMessage = (String)var3.next();
    //         ErrorDTO errorDTO = new ErrorDTO();
    //         errorDTO.setDirective(e.getExceptionDirective().name());
    //         errorDTO.setErrorCode(e.getErrorCode().intValue());
    //         errorDTO.setErrorMessage(errorMessage);
    //         errorDTOs.add(errorDTO);
    //     }
    //
    //     return errorDTOs;
    // }
    //
    // handlePostPageFailedResponse(final RealAgeJsonException exception) {
    //     ResponseDTO<GoToPageDTO> responseDTO = new ResponseDTO();
    //     responseDTO.setResult(Result.FAILURE);
    //     responseDTO.setErrors(new ArrayList<ErrorDTO>() {
    //         {
    //             this.addAll(RealAgeServiceClientImpl.this.buildErrorDTO(exception));
    //         }
    //     });
    //     return responseDTO;
    // }
    //
    // handlePostPageFailedResponse(RealAgeFactValidationException exception) {
    //     ResponseDTO<GoToPageDTO> responseDTO = new ResponseDTO();
    //     responseDTO.setResult(Result.FAILURE);
    //     final ErrorDTO errorDTO = new ErrorDTO();
    //     errorDTO.setDirective(ExceptionDirective.LOG.name());
    //     errorDTO.setErrorCode(412);
    //     errorDTO.setErrorMessage(exception.getMessage());
    //     responseDTO.setErrors(new ArrayList<ErrorDTO>() {
    //         {
    //             this.add(errorDTO);
    //         }
    //     });
    //     return responseDTO;
    // }
};
