export interface AppStyle {
    logosrc: String,
    faviconsrc: String
    backgroundcolor: String,
    actioncolor: String,
    notifcolor: String,
}

export interface FooterLink {
    name: String,
    url: String
}

export interface Links {
    weburl: String,
    supporturl: String,
    supportemail: String,
    supportphone: String,
    footers: Array<FooterLink>,
}