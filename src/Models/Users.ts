
import { Model } from '../Base/Model'

export interface UserExtended extends User {
    partnerNickname?: string
}

export interface User {
    userId?: number
    userNickname?: string
    profileImageUrl?: string
    accountId?: string
    password?: string
    email?: string
    gender?: string
    birth?: string
    md5Mobile?: string
    marketingAgreeTime?: number
    partnerId?: number
    accessLevel: number
    createdAt?: string
    updatedAt?: string
}

export class Users extends Model {
    constructor() {
        super('Users', 'userId', {
            userId: { type: 'number', name: '사용자 No' },
            userNickname: { type: 'string', name: '사용자 이름' },
            profileImageUrl: { type: 'string', name: '사용자 프로필 이미지' },
            accountId: { type: 'string', name: '사용자 ID' },
            password: { type: 'string', name: '비밀번호' },
            email: { type: 'string', name: '이메일' },
            gender: { type: 'string', name: '성별' },
            birth: { type: 'string', name: '생년월일' },
            md5Mobile: { type: 'string', name: 'MD5모바일' },
            marketingAgreeTime: { type: 'number', name: '약관동의' },
            partnerId: { type: 'number', name: '기관 아이디' },
            accessLevel: { type: 'number', name: '권한 구분' },
            createdAt: { type: 'string', name: '입력일자' },
            updatedAt: { type: 'string', name: '수정일자' },
        })
    }
}
