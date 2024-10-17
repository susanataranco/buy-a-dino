import { Calendar, Egg, Heart, SquareGanttChart } from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon: Egg,
        label: "Dinos",
        href: "/dashboard"
    },
    {
        icon: Calendar,
        label: "Dinos Reserves",
        href: "/reserves"
    },
    {
        icon: Heart,
        label: "Loved Dinos",
        href: "/loved-dinos"
    }
]

export const dataAdminSidebar = [
    {
        icon: SquareGanttChart,
        label: "Manage Dinos",
        href: "/dashboard/admin/dinos-manager"
    },
    {
        icon: Calendar,
        label: "All Reserves",
        href: "/dashboard/admin/reserves-admin"
    }
]