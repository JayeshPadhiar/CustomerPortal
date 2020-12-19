export interface Notification {
    condition: String,
    sms: String
    email: String,
    smschk: Boolean,
    emailchk: Boolean,
}

export interface NotifData {
    sms: String,
    email: String,
    title: String,
    logosrc: String
}