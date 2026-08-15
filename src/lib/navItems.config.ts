import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "@/utils/auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["ADMIN", "CUSTOMER"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["ADMIN", "CUSTOMER"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings", // ✅ String
          roles: ["ADMIN", "CUSTOMER"],
        },
      ],
    },
    {
      title: "Orders",
      items: [
        {
          title: "My Orders",
          href: "/my-orders",
          icon: "ShoppingCart", // ✅ String
          roles: ["ADMIN", "CUSTOMER"],
        },
      ],
    },
  ];
};

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      // {
      //     title: "Admins",
      //     href: "/admin/dashboard/admins-management",
      //     icon: "Shield", // ✅ String
      //     roles: ["ADMIN"],
      // },
      {
        title: "Customers",
        href: "/admin/dashboard/customers-management",
        icon: "User", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Products Management",
    items: [
      {
        title: "Products",
        href: "/admin/dashboard/products-management",
        icon: "Box", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Orders Management",
    items: [
      {
        title: "Orders",
        href: "/admin/dashboard/orders-management",
        icon: "ShoppingCart", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    // case "CUSTOMER":
    //     return [...commonNavItems, ...customerNavItems];

    default:
      return [];
  }
};
