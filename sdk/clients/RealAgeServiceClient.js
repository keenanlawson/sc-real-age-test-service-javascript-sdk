import RealAgeTestException from '../exceptions/RealAgeTestException';
import RequestBuilder from '../clients/RequestBuilder';

export default class RealAgeServiceClient {

    constructor() {
        this.requestBuilder = new RequestBuilder();
    }

    sanitizeTokenTypeAndToken(realAgeAuthentication, userId) {
        if(!userId) {
            throw new RealAgeTestException("No user id found");
        } else if(!realAgeAuthentication) {
            throw new RealAgeTestException("No authentication credentials found");
        } else if(!realAgeAuthentication.getTokenType()) {
            throw new RealAgeTestException("No TokenType or token specified");
        }
    }

    getToken(hostUrl, realAgeAuthentication, credentials) {
        let getDataPromise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, credentials);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, credentials);
            requestOptions.json = true;
            requestOptions.qs = { grant_type: 'password' };
            getDataPromise = this.requestBuilder.createRequest(hostUrl, 'POST', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return getDataPromise;
    }

    getAllAssessments(hostUrl, realAgeAuthentication, userId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/assessments`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getUserDetails(hostUrl, realAgeAuthentication, userId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, userId);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getUserAssessments(hostUrl, realAgeAuthentication, userId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, userId);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getAssessmentStatusForUser(hostUrl, realAgeAuthentication, userId, assessmentId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments/${assessmentId}/status`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getFirstPage(hostUrl, realAgeAuthentication, userId, assessmentId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments/${assessmentId}`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getPage(hostUrl, realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments/${assessmentId}/${moduleId}/${questionGroupId}`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    postPage(hostUrl, realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId, questionGroupAnswersDTO) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, questionGroupAnswersDTO);
            requestOptions.json = true;
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments/${assessmentId}/${moduleId}/${questionGroupId}`, 'POST', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getRecommendations(hostUrl, realAgeAuthentication, userId, assessmentId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments/${assessmentId}/rec`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getCalculation(hostUrl, realAgeAuthentication, userId, assessmentId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments/${assessmentId}/calc`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getMicroBenefits(hostUrl, realAgeAuthentication, userId, assessmentId, microPaymentDTOs, persist) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, microPaymentDTOs);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments/${assessmentId}/micropayments`, 'POST', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getPotentialBenefitForUser(hostUrl, realAgeAuthentication, userId, assessmentId, maximizedFactDataDTOs) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, maximizedFactDataDTOs);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/assessments/${assessmentId}/whatif`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    requestSessionProfile(hostUrl) {
        let promise = null;
        try {
            const requestOptions = this.requestBuilder.buildHttpEntity();
            promise = this.requestBuilder.createRequest(`${hostUrl}/sessions`, 'POST', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getRecommendedDVGContent(hostUrl, realAgeAuthentication, optAssessmentId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, realAgeAuthentication.getUserId());
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${realAgeAuthentication.getUserId()}/dvg?id=/${optAssessmentId}`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getAllFactsForUser(hostUrl, realAgeAuthentication, userId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/facts`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getFactForUser(hostUrl, realAgeAuthentication, userId, factId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/facts?id=${factId}`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getFactsForUser(hostUrl, realAgeAuthentication, userId, factIdSet) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/facts?id=${factIdSet.join(',')}`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    setFactsForUser(hostUrl, realAgeAuthentication, userId, factDataDTOSet) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, factDataDTOSet);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/facts`, 'POST', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    getRealAgeStatusResult(hostUrl, realAgeAuthentication, userId) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/${userId}/realage-result`, 'GET', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    subscribeToEmailMarketing(hostUrl, realAgeAuthentication, email) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/subscription?email=${email}`, 'POST', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }

    unsubscribeToEmailMarketing(hostUrl, realAgeAuthentication, email) {
        let promise = null;
        try {
            this.sanitizeTokenTypeAndToken(realAgeAuthentication, userId);
            const requestOptions = this.requestBuilder.buildHttpEntity(realAgeAuthentication, null);
            promise = this.requestBuilder.createRequest(`${hostUrl}/user/subscription?email=${email}`, 'DELETE', requestOptions);
        } catch (ex) {
            // TODO: figure out how to handle this
            console.error(ex.stack);
        }
        return promise;
    }
};
