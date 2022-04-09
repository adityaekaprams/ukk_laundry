import React from "react";
import { MdDashboard } from "react-icons/md";
import {BsPlusLg} from 'react-icons/bs'
import {MdDryCleaning} from 'react-icons/md'
import {VscServerEnvironment} from 'react-icons/vsc'

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <MdDashboard/>,
        className: 'nav-text'
    },

    {
        title : "User",
        path : '/user',
        icon: <BsPlusLg/>,
        className: 'nav-text'
    },

    {
        title : "Member",
        path : '/member',
        icon: <MdDryCleaning/>,
        className:'nav-text'
    },

    {
        title : 'Transaksi',
        path : '/transaksi',
        icon : <VscServerEnvironment/>,
        className : 'nav-text'
    }
]