
import React, { FC, BaseSyntheticEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Indexable } from '../../Base/Type'
import { storage } from '../../Libs/Storage'
import styles from '../../Styles/Style.module.css'

export const AdminNavigation: FC<Indexable> = (props: Indexable): JSX.Element => {
    const [isClicked, setIsClicked] = useState(false)

    const onClickIcon = (evt: BaseSyntheticEvent): void => {
        evt.preventDefault()

        const _isClicked = !isClicked
        setIsClicked(_isClicked)
    }

    const navigate = useNavigate()

    return (
        <ul className={styles.navBox}>
            {/* <Link to='/admin/home'><i className='styles.fas fa-home'></i></Link> */}

            <li className={styles.navList}>
                <div className={styles.dropbtn} onClick={() => navigate('/admin/home')}>홈</div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>비디오</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/video/list'>비디오 목록</Link>
                    <Link to='/admin/video/form'>비디오 추가</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>상품</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/product/list'>상품 목록</Link>
                    <Link to='/admin/product/form'>상품 추가</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>운동</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/exercise/list'>운동 목록</Link>
                    <Link to='/admin/exercise/form'>운동 추가</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>사용자</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/user/list'>사용자 목록</Link>
                    <Link to='/admin/usersns/list'>사용자 SNS 목록</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>운영</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/app_version/list'>앱버전 목록</Link>
                    <Link to='/admin/app_version/form'>앱버전 추가</Link>
                    <Link to='/admin/review_version/list'>검수버전 목록</Link>
                    <Link to='/admin/review_version/form'>검수버전 추가</Link>
                    <Link to='/admin/access/list'>접속허용 IP 목록</Link>
                    <Link to='/admin/access/form'>접속허용 IP 추가</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>통계</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/report/dau'>DAU</Link>
                    <Link to='/admin/report/mau'>MAU</Link>
                    <Link to='/admin/report/pu'>PU</Link>
                    <Link to='/admin/report/arppu'>ARPPU</Link>
                    <Link to='/admin/report/arpdau'>ARPDAU</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>Rank24</div>
                <div className={styles.dropdownContent}>
                    <Link to='/admin/rank24/list'>Rank24 목록</Link>
                </div>
            </li>

            <li className={styles.navList + ' ' + styles.dropdown1}>
                <div className={styles.dropbtn}>관리자</div>
                <div className={styles.dropdownContent}>
                    <Link to='#'>{storage.getString('adminId')}</Link>
                    <Link to='/admin/token/form'>Token</Link>
                    <Link to='/admin/passwd'>비밀번호 변경</Link>
                    <Link to='/admin/logout'>로그아웃</Link>
                </div>
            </li>
            {/* <a className='styles.nav-icon' onClick={onClickIcon}>&#9776;</a> */}
        </ul>
    )
}

export default AdminNavigation
