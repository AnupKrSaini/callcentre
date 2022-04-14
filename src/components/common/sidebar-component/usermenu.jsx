import {
    Home,
    //Box,
    //Command,
    Users,
    Headphones,
    Search,
    FileText
} from 'react-feather';

export const USERMENUITEMS = [
    {
        title: 'Dashboard', icon: Home, type: 'link', path: '/user/dashboard', active: true
    },
    {
        title: 'Outbound Calls', icon: Headphones, type: 'sub', active: false, children: [
            { path: '/admin/outbound/assignedcalls', title: 'Assigned Calls', type: 'link' },
            // { path: '/pages/outboundCalling/UnassignedLeads', title: 'Unassign Calls', type: 'link' },
            // { path: '/pages/outboundCalling/CustomerFollowUp', title: 'Customer Follow Up', type: 'link' },
        ]
    },
    {
        title: 'Admin', icon: Users, type: 'sub', active: false, children: [
            {
                title: 'Outbound Calls ', type: 'sub', children: [
                    { title: 'Manual Sheets', type: 'link', path: '/admin/outbound/uploadcalls' },
                    { title: 'Automated Sheets', type: 'link', path: '/admin/outbound/automationcalls' },
                ]
            },
            // { path: '/pages/admin/UnassignedLeads', title: 'Unassign Calls', type: 'link' },
            // { path: '/pages/admin/UserManagement', title: 'User Management', type: 'link' },
            // { path: '/pages/admin/RoleManagement', title: 'Role Management', type: 'link' },
            { path: '/admin/purposemanagement', title: 'Purpose Management', type: 'link' },
            { path: '/admin/sourcemanagement', title: 'Source Management', type: 'link' },
            { path: '/admin/teammanagement', title: 'Team Management', type: 'link' },
            // { path: '/pages/admin/DepartmentManagement', title: 'Department Management', type: 'link' },
           // { path: '/admin/apimanagement', title: 'API Management', type: 'link' },
            // { path: '/pages/admin/AddOutboundCalling', title: 'Add Outbound Calling', type: 'link' },
            // { path: '/pages/admin/ManageOutboundCalling', title: 'Manage Outbound Calling', type: 'link' }, 
        ]
    },
    {
        //title: 'Search Customers', icon: Search, type: 'link', path: '/pages/SearchCustomers', active: false
    },
    // {
    //     title: 'Reports', icon: FileText, type: 'sub', active: false, children: [
    //         { path: '/pages/reports/CancelReport', title: 'Cancel Report', type: 'link' },
    //         { path: '/pages/reports/CollectionReportUserWise', title: 'Collection Report User Wise', type: 'link' },
    //         { path: '/pages/reports/LogReport', title: 'Log Report ', type: 'link' },
    //     ]
    // },
]
