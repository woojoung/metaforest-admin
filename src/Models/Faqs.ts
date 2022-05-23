
import { Model } from '../Base/Model'

export interface Faq {
    faqId?: number
    ordering?: number
    title?: string
    content: string
    adminId?: string
    isApproved?: string
    createdAt?: string
    updatedAt?: string
}

export class Faqs extends Model {
    constructor() {
        super('Faqs', 'faqId', {
            faqId: { type: 'number', name: 'FAQ No' },
            ordering: { type: 'number', name: '상단고정' },
            title: { type: 'string', name: '제목' },
            content: { type: 'string', name: '내용' },
            adminId: { type: 'string', name: '관리자ID' },
            isApproved: { type: 'string', name: '승인 여부' },
            createdAt: { type: 'string', name: '입력일자' },
            updatedAt: { type: 'string', name: '수정일자' },
        })
    }
}
