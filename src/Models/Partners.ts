
import { Model } from '../Base/Model'

export interface Partner {
    partnerId?: number
    partnerNickname?: string
    code?: string
    plan?: number
    planStartTime?: number
    planExpiryTime?: number
    isApproved?: string
    createdAt?: string
    updatedAt?: string
}

export class Partners extends Model {
    constructor() {
        super('Partners', 'partnerId', {
            partnerId: { type: 'number', name: '기관 아이디' },
            partnerNickname: { type: 'string', name: '기관 이름' },
            code: { type: 'string', name: '기관 코드' },
            plan: { type: 'number', name: '플랜' },
            planStartTime: { type: 'number', name: '플랜 시작일자' },
            planExpiryTime: { type: 'number', name: '플랜 종료일자' },
            isApproved: { type: 'string', name: '승인 여부' },
            createdAt: { type: 'string', name: '입력일자' },
            updatedAt: { type: 'string', name: '수정일자' },
        })
    }
}
