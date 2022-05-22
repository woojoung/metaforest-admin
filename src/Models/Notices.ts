
import { Model } from '../Base/Model'

export interface Notice {
    noticeId?: number
    ordering?: number
    title?: string
    content: string
    adminId?: string
    isApproved?: string
    createdAt?: string
    updatedAt?: string
}

export class Notices extends Model {
    constructor() {
        super('Notices', 'noticeId', {
            noticeId: { type: 'number', name: '공지사항 No' },
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
