const sidebarNav = [
    {
        link: "/",
        section: "Dashboard",
        icon: "lucide:layout-dashboard", //width:"20"
        text: "Dashboard",
    },
    {
        link: "",
        section: "Employees",
        icon: "ph:users-bold",
        text: "Employees",
        submenu:[
            {
                link: "/employees/all",
                text: "All Employees----",
            },
            {
                link: "/employees/active",
                text: "Active Employees--",
            },
            {
                link: "/employees/inactive",
                text: "Inactive Employees",
            }
        ]
    },
    {
        link: "/projects",
        section: "Projects",
        icon: "icon-park-outline:ad-product",
        text: "Projects",
    },
    // {
    //     link: "/orders",
    //     section: "orders",
    //     icon: "icon-park-outline:transaction-order",
    //     text: "Orders",
    // },
    // {
    //     link: "/analytics",
    //     section: "analytics",
    //     icon: "carbon:analytics",
    //     text: "Analytics",
    // },
    {
        link: "/appr_pending",
        section: "Pending Approvals",
        icon: "fluent:approvals-app-24-regular",
        text: "Approvals",
    },
    {
        link: "/attendance",
        section: "Attendance",
        icon: "ion:book-outline",
        text: "Attendance",
    },
    {
        link: "/leave_mgmt",
        section: "Leave Management",
        icon: "ic:round-inventory",
        text: "Leave Management",
    },
    {
        link: "/holidays",
        section: "Holidays",
        icon: "clarity:on-holiday-line",
        text: "Holidays",
    }
];

export default sidebarNav;
