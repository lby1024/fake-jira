import { Menu } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function useRouteKey() {
    const arr = useLocation().pathname.split("/")
    return arr[arr.length-1]
}

const XMenu:FC = () => {

    const key = useRouteKey()

    return <Menu mode="inline" selectedKeys={[key]} >
        <Menu.Item key="kanban" >
            <Link to="kanban" >看板</Link>
        </Menu.Item>
        <Menu.Item key="epic">
            <Link to="epic" >任务组</Link>
        </Menu.Item>
    </Menu>
}

export default XMenu