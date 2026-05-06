import type { NavigationData } from "@/lib/types/navigation";

export const navigationData: NavigationData = {
  brand: {
    label: "Shipin",
    href: "/",
    imgUrl: "/brand/shipin-logo.png",
    scrolledImgUrl: "/brand/shipin-logo.png",
    footerImgUrl: "/brand/shipin-logo.png",
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
      id: "community",
      label: "Community",
      groups: [
        {
          title: "Overview",
          links: [
            {
              label: "Community approach",
              href: "/",
              description:
                "Explore Shipin's shipping rhythm, operating model, and community framework.",
              icon: "lucide:building-2",
            },
            {
              label: "Join and membership",
              href: "/register",
              description:
                "Start your application and create your builder profile.",
              icon: "lucide:user-plus",
            },
            {
              label: "Builder directory",
              href: "/builders",
              description:
                "Browse registered builders, roles, and collaboration intent across the community.",
              icon: "lucide:users",
            },
          ],
        },
        {
          title: "Programs",
          links: [
            {
              label: "Event calendar",
              href: "/events",
              description:
                "Track Deep Work, Sprint, and other community sessions.",
              icon: "lucide:calendar-days",
            },
            {
              label: "Partners and sponsors",
              href: "/sponsors",
              description:
                "Review the partnership model, sponsor visibility, and contact flow.",
              icon: "lucide:briefcase-business",
            },
          ],
        },
      ],
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
