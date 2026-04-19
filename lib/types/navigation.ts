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
  };
  items: NavItem[];
  cta: {
    label: string;
    href: string;
  };
};
