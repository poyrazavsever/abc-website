export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type NavFeatured = {
  title: string;
  description: string;
  href: string;
  icon?: string;
};

export type NavItem = {
  id: string;
  label: string;
  href?: string;
  groups?: NavGroup[];
  featured?: NavFeatured;
};

export type NavigationData = {
  brand: {
    label: string;
    href: string;
    imgUrl?: string;
  };
  items: NavItem[];
  auth: {
    loginLabel: string;
    loginHref: string;
    registerLabel: string;
    registerHref: string;
    profileLabel: string;
    logoutLabel: string;
  };
  cta: {
    label: string;
    href: string;
  };
};
