import type { NavigationData } from "@/lib/types/navigation";

export const navigationData: NavigationData = {
  brand: {
    label: "Shipin",
    href: "/",
    imgUrl: "/brand/logonew-w.png",
    scrolledImgUrl: "/brand/logoblack.png",
    footerImgUrl: "/brand/logonew-w.png",
  },
  items: [
    {
      id: "events",
      label: "Events",
      href: "/events",
    },
    {
      id: "builders",
      label: "Builders",
      href: "/builders",
    },
    {
      id: "projects",
      label: "Projects",
      href: "/projects",
    },
    {
      id: "sponsors",
      label: "Sponsors",
      href: "/sponsors",
    },
  ],
  auth: {
    loginLabel: "Sign in",
    loginHref: "/login",
    registerLabel: "Sign up",
    registerHref: "/register",
    profileLabel: "My profile",
    logoutLabel: "Sign out",
  },
  cta: {
    label: "Join the community",
    href: "/register",
  },
};
