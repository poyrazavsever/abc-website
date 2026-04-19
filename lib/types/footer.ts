export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type FooterData = {
  brand: {
    title: string;
    description: string;
  };
  sections: FooterSection[];
  socialLinks: FooterLink[];
  bottomLinks: FooterLink[];
  copyright: string;
};
