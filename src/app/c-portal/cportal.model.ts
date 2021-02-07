export interface AppStyle {
  brandLogoUrl: String;
  faviconUrl: String;
  backgroundColor: String;
  actionColor: String;
  noticeBackgroundColor: String;
}

export interface FooterLink {
  name: String;
  url: String;
}

export interface Links {
  websiteUrl: String;
  supportUrl: String;
  supportEmail: String;
  supportPhone: String;
  footerLinks: Array<FooterLink>;
}
