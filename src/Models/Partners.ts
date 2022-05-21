
import { Model } from '../Base/Model'

export interface PartnerExtended extends Partner {
    userCount?: number
}

export interface Partner {
    partnerId?: number
    partnerNickname?: string
    code?: string
    plan: number
    planStartTime?: string
    planExpiryTime?: string
    isApproved?: string
    createdAt?: string
    updatedAt?: string
}

export class Partners extends Model {
    constructor() {
        super('Partners', 'partnerId', {
            partnerId: { type: 'number', name: '기관 No' },
            partnerNickname: { type: 'string', name: '기관 이름' },
            code: { type: 'string', name: '기관 코드' },
            plan: { type: 'number', name: '플랜' },
            planStartTime: { type: 'string', name: '플랜 시작일자' },
            planExpiryTime: { type: 'string', name: '플랜 종료일자' },
            isApproved: { type: 'string', name: '승인 여부' },
            createdAt: { type: 'string', name: '입력일자' },
            updatedAt: { type: 'string', name: '수정일자' },
        })
    }
}
