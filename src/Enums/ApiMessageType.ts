
export enum eApiMessageType {
    NONE = 0,

    // SERVER_TEST
    SERVER_TEST_REQ = 10001,

    // USER = 11
    USER_SIGNUP_REQ = 11001,
    USER_LOGIN_REQ = 11002,
    USER_LOGOUT_REQ = 11003,
    USER_CHANGE_PASSWD_REQ = 11004,
    USER_GET_ONE_INFO_REQ = 11005,
    USER_GET_LIST_REQ= 11006,
    USER_UPDATE_REQ = 11007,
    USER_UPDATE_NICKNAME_REQ = 11008,
    USER_UPDATE_PROFILE_IMAGE_URL_REQ = 11009,

    USER_CREATE_INQUIRY_REQ = 11010,
    USER_UPDATE_INQUIRY_REQ = 11011,
    USER_DELETE_INQUIRY_REQ = 11012,
    USER_GET_ONE_INQUIRY_REQ = 11013,
    USER_GET_LIST_INQUIRY_REQ = 11014,

    USER_GET_ONE_NOTICE_REQ = 11015,
    USER_GET_LIST_NOTICE_REQ = 11016,
    USER_GET_COUNT_NOTICE_REQ = 11017,

    USER_GET_ONE_FAQ_REQ = 11018,
    USER_GET_LIST_FAQ_REQ = 11019,
    USER_GET_COUNT_FAQ_REQ = 11020,
    USER_GET_LIST_FAQ_BY_CATEGORY_REQ = 11021,

    USER_SIGNUP_AUTHCODE_REQ = 11022,
    USER_FIND_ACCOUNT_ID_REQ = 11023,
    USER_FIND_PASSWD_REQ = 11024,

    USER_GET_LIST_NOTICE_BY_SEARCHWORD_REQ = 11025,

    // ADMIN= 12
    ADMIN_LOGIN_REQ = 12001,
    ADMIN_LOGOUT_REQ = 12002,
    ADMIN_CHANGE_PASSWD_REQ = 12003,

    ADMIN_CREATE_ADMIN_REQ = 12004,
    ADMIN_UPDATE_ADMIN_REQ = 12005,
    ADMIN_DELETE_ADMIN_REQ = 12006,
    ADMIN_GET_ONE_ADMIN_REQ = 12007,
    ADMIN_DECRYPT_SESSION_REQ = 12008,

    ADMIN_CREATE_INQUIRY_REQ = 12009,
    ADMIN_UPDATE_INQUIRY_REQ = 12010,
    ADMIN_DELETE_INQUIRY_REQ = 12011,
    ADMIN_GET_ONE_INQUIRY_REQ = 12012,
    ADMIN_GET_LIST_INQUIRY_REQ = 12013,

    ADMIN_CREATE_NOTICE_REQ = 12014,
    ADMIN_UPDATE_NOTICE_REQ = 12015,
    ADMIN_DELETE_NOTICE_REQ = 12016,
    ADMIN_GET_ONE_NOTICE_REQ = 12017,
    ADMIN_GET_LIST_NOTICE_REQ = 12018,

    ADMIN_CREATE_FAQ_REQ = 12019,
    ADMIN_UPDATE_FAQ_REQ = 12020,
    ADMIN_DELETE_FAQ_REQ = 12021,
    ADMIN_GET_ONE_FAQ_REQ = 12022,
    ADMIN_GET_LIST_FAQ_REQ = 12023,

}
