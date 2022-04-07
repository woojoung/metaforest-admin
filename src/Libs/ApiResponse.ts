
import { Any } from '../Base/Type'
import { eHttpStatus } from '../Enums/HttpStatus'
import { eErrorCode } from '../Enums/ErrorCode'
import { eApiMessageType } from '../Enums/ApiMessageType'
import { eResponseMessage } from '../Enums/ResponseMessage'

export class ApiResponse {
    msgType: eApiMessageType
    status: eHttpStatus
    message: string
    data: Any

    constructor(msgType: eApiMessageType = eApiMessageType.NONE, status: eHttpStatus = eHttpStatus.INTERNAL_SERVER_ERROR, message = eResponseMessage.INTERNAL_SERVER_ERROR as string, data: Any = null) {
        this.msgType = msgType
        this.status = status
        this.message = message
        this.data = data
    }
}
