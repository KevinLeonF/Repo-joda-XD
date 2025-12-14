import { Icons } from "@/components/Icons";

export const navigation = [
  {
    name: "Home",
    href: "/dashboard/dashboard",
    icon: Icons.Home,
    permissions: [],
  },
  {
    name: "Courses",
    href: "/dashboard/dashboard",
    icon: Icons.Users,
    permissions: ["XYZ"],
  },
  {
    name: "Careers",
    href: "/dashboard/dashboard",
    icon: Icons.Folder,
    permissions: [],
  },
  {
    name: "Blog",
    href: "/dashboard/dashboard",
    icon: Icons.Calendar,
    permissions: [],
  },
  {
    name: "About Us",
    href: "/dashboard/dashboard",
    icon: Icons.Document,
    permissions: [],
  },
];

export const teams = [
  {
    id: 1,
    name: "Avengers",
    href: "/dashboard/team/avengers",
    initial: "A",
    current: false,
  },
  // { id: 2, name: 'Team 2', href: '#', initial: 'T', current: false },
  // { id: 3, name: 'Developer Hangout', href: '#', initial: 'W', current: false },
];

