
import { Any, Indexable } from '../Base/Type'
// import { cfg } from '../Base/Config'
import { eHttpStatus } from '../Enums/HttpStatus'
import { ApiRequest } from './ApiRequest'
import { ApiResponse } from './ApiResponse'

export enum eXhrType {
    GET = 10,
    POST = 20,
    PUT = 30,
    JSON = 40,
    UPLOAD = 50,
    AWS_S3_PUT = 60,
}

class XmlHttp {
    xhr: XMLHttpRequest
    prevEventListener: null | EventListenerOrEventListenerObject

    constructor() {
        this.xhr = new XMLHttpRequest()
        this.prevEventListener = null

        this.xhr.addEventListener('error', function () {
            alert('XmlHttp.NetworkError')
        })
    }

    _request(type: eXhrType, url: string, headers: Indexable = {}, data: Any, withCredentials: boolean, eventListener: EventListenerOrEventListenerObject): void {
        if (typeof this.prevEventListener === 'function') {
            this.xhr.removeEventListener('load', this.prevEventListener)
            this.prevEventListener = null
        }

        this.xhr.addEventListener('load', eventListener)
        this.prevEventListener = eventListener

        let body = null
        let method = ''
        let contentType = ''

        switch (type) {
        case eXhrType.GET:
            if (data !== null) {
                url += '?' + data.toString()
            }

            body = null
            method = 'GET'
            contentType = 'application/x-www-form-urlencoded; charset=utf-8'
            break
        case eXhrType.POST:
            if (data !== null) {
                body = data.toString()
            }

            method = 'POST'
            contentType = 'application/x-www-form-urlencoded; charset=utf-8'
            break
        case eXhrType.JSON:
            if (data !== null) {
                body = JSON.stringify(data)
            }

            method = 'POST'
            contentType = 'application/json; charset=utf-8'
            break
        case eXhrType.UPLOAD:
            // browser should put contentType by itself when upload
            body = data

            method = 'POST'
            break
        case eXhrType.AWS_S3_PUT:
            body = data

            method = 'PUT'
            contentType = 'application/octet-stream'
            break
        }

        this.xhr.open(method, url, true)

        this.xhr.setRequestHeader('Content-Type', contentType)
        for (const key in headers) {
            this.xhr.setRequestHeader(key, headers[key])
        }

        if (withCredentials === true) {
            this.xhr.withCredentials = true
            this.xhr.setRequestHeader('x-ijt', 'true')
        }
        this.xhr.send(body)
    }

    request(apiUrl: string, apiRequest: ApiRequest, eventListener: EventListenerOrEventListenerObject): void {
        this._request(eXhrType.JSON, apiUrl, {}, apiRequest, true, eventListener)
    }

    parseResponse(handleError = true): ApiResponse {
        const apiResponse = new ApiResponse()
        try {
            apiResponse.status = eHttpStatus.INTERNAL_SERVER_ERROR
            Object.assign(apiResponse, JSON.parse(this.xhr.responseText))
        } catch (ex) {
            console.log(ex)
        }
        if (handleError) {
            if (apiResponse.status === eHttpStatus.UNAUTHORIZED) {return apiResponse }
            if (apiResponse.status !== eHttpStatus.OK) { alert(apiResponse.status + ' ' + apiResponse.message); return apiResponse }
        }

        return apiResponse
    }
}

export const xmlHttp = new XmlHttp()
