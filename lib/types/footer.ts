export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type FooterContact = {
  title: string;
  email: string;
  location: string;
  cta: FooterLink;
};

export type FooterData = {
  brand: {
    title: string;
    description: string;
  };
  sections: FooterSection[];
  socialLinks: FooterLink[];
  contact: FooterContact;
  bottomLinks: FooterLink[];
  copyright: string;
};
