'use strict';
import RealAgeAuthentication from './authentication/RealAgeAuthentication';
import RequestExecutor from './clients/RequestExecutor';
import RealAgeServiceClient from './clients/RealAgeServiceClient';
import { TokenTypes } from './clients/TokenType';


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
let _pathname = new WeakMap();
let _baseUrl = new WeakMap();

/**
 * @class RealAgeTestServiceSDK
 */
export default class RealAgeTestServiceSDK {

    /**
     * Create an instance of the SDK
     * @param {String} protocol
     * @param {String} host
     * @param {String} port
     * @param {String} pathname
     * @param {Function} logger
     * @returns {RealAgeTestServiceSDK|Error}
     */
    constructor({ protocol = 'https', host = '', port = '', pathname = '/rat', logger = null } = {}) {

        if (!host) {
            throw new Error('RealAgeTestServiceSDK ERROR: Required host not specified.');
        }

        if (!instance) {

            _protocol.set(this, protocol);
            _port.set(this, port);
            _host.set(this, host);
            _pathname.set(this, pathname);
            _baseUrl.set(this, `${protocol}://${host}${port ? ':' + port : ''}${pathname}`);

            requestExecutor.debug(logger || (()=>{}));
            realAgeServiceClient.debug(logger || (()=>{}));

            instance = this;
        }

        return instance;
    }

    static getTokenTypes() {
        return TokenTypes;
    }

    static getToken(hostUrl, realAgeAuthentication, { username = '', password = ''}) {
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getToken(hostUrl, realAgeAuthentication, { username, password }),
                resolve,
                reject
            );
        });
    }

    static getAuthentication({ tokenType = 'ANONYMOUS', token = '', userId = '' }) {
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                new Promise((resolve2, reject2) => {
                    if (!tokenType) {
                        reject2(new Error('Invalid tokenType: ' + tokenType));
                    } else if (!token) {
                        reject2(new Error('Invalid token: ' + token));
                    } else {
                        resolve2(new RealAgeAuthentication({ tokenType, token, userId }));
                    }
                }),
                resolve,
                reject
            );
        });
    }

    getAllAssessments(realAgeAuthentication, userId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getAllAssessments(hostUrl, realAgeAuthentication, userId),
                resolve,
                reject
            );
        });
    }

    getUserDetails(realAgeAuthentication, userId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getUserDetails(hostUrl, realAgeAuthentication, userId),
                resolve,
                reject
            );
        });
    }

    getUserAssessments(realAgeAuthentication, userId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getUserAssessments(hostUrl, realAgeAuthentication, userId),
                resolve,
                reject
            );
        });
    }

    getAssessmentStatusForUser(realAgeAuthentication, userId, assessmentId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getAssessmentStatusForUser(hostUrl, realAgeAuthentication, userId, assessmentId),
                resolve,
                reject
            );
        });
    }

    getFirstPage(realAgeAuthentication, userId, assessmentId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getFirstPage(hostUrl, realAgeAuthentication, userId, assessmentId),
                resolve,
                reject
            );
        });
    }

    getPage(realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getPage(hostUrl, realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId),
                resolve,
                reject
            );
        });
    }

    postPage(realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId, questionGroupAnswersDTO) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRawRequest(
                realAgeServiceClient.postPage(hostUrl, realAgeAuthentication, userId, assessmentId, moduleId, questionGroupId, questionGroupAnswersDTO),
                resolve,
                reject
            );
        });
    }

    getRecommendations(realAgeAuthentication, userId, assessmentId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getRecommendations(hostUrl, realAgeAuthentication, userId, assessmentId),
                resolve,
                reject
            );
        });
    }

    getCalculation(realAgeAuthentication, userId, assessmentId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getCalculation(hostUrl, realAgeAuthentication, userId, assessmentId),
                resolve,
                reject
            );
        });
    }

    getMicroBenefits(realAgeAuthentication, userId, assessmentId, microPaymentDTOs, persist) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getMicroBenefits(hostUrl, realAgeAuthentication, userId, assessmentId, microPaymentDTOs, persist),
                resolve,
                reject
            );
        });
    }

    getPotentialBenefitForUser(realAgeAuthentication, userId, assessmentId, maximizedFactDataDTOs) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.getPotentialBenefitForUser(hostUrl, realAgeAuthentication, userId, assessmentId, maximizedFactDataDTOs),
                resolve,
                reject
            );
        });
    }

    requestSessionProfile() {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRequest(
                realAgeServiceClient.requestSessionProfile(hostUrl),
                resolve,
                reject
            );
        });
    }

    getRecommendedDVGContent(realAgeAuthentication, optAssessmentId = null) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRawRequest(
                realAgeServiceClient.getRecommendedDVGContent(hostUrl, realAgeAuthentication, optAssessmentId),
                resolve,
                reject
            );
        });
    }

    getAllFactsForUser(realAgeAuthentication, userId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRawRequest(
                realAgeServiceClient.getAllFactsForUser(hostUrl, realAgeAuthentication, userId),
                resolve,
                reject
            );
        });
    }

    getFactForUser(realAgeAuthentication, userId, factId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRawRequest(
                realAgeServiceClient.getFactForUser(hostUrl, realAgeAuthentication, userId, factId),
                resolve,
                reject
            );
        });
    }

    getFactsForUser(realAgeAuthentication, userId, factIdSet) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRawRequest(
                realAgeServiceClient.getFactsForUser(hostUrl, realAgeAuthentication, userId, factIdSet),
                resolve,
                reject
            );
        });
    }

    setFactsForUser(realAgeAuthentication, userId, factDataDTOSet) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRawRequest(
                realAgeServiceClient.setFactsForUser(hostUrl, realAgeAuthentication, userId, factDataDTOSet),
                resolve,
                reject
            );
        });
    }

    getRealAgeStatusResult(realAgeAuthentication, userId) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeRawRequest(
                realAgeServiceClient.getRealAgeStatusResult(hostUrl, realAgeAuthentication, userId),
                resolve,
                reject
            );
        });
    }

    subscribeToEmailMarketing(realAgeAuthentication, email) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeNoResponseRequest(
                realAgeServiceClient.subscribeToEmailMarketing(hostUrl, realAgeAuthentication, email),
                resolve,
                reject
            );
        });
    }

    unsubscribeToEmailMarketing(realAgeAuthentication, email) {
        const hostUrl = _baseUrl.get(this);
        return new Promise((resolve, reject) => {
            requestExecutor.executeNoResponseRequest(
                realAgeServiceClient.unsubscribeToEmailMarketing(hostUrl, realAgeAuthentication, email),
                resolve,
                reject
            );
        });
    }
};
