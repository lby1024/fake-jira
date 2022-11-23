import styled from "@emotion/styled";
import { Menu } from "antd";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

function useRouteKey() {
  const arr = useLocation().pathname.split("/");
  return arr[arr.length - 1];
}

const XMenu: FC = () => {
  const key = useRouteKey();

  return (
    <Content mode="inline" selectedKeys={[key]}>
      <Menu.Item key="kanban">
        <Link to="kanban">看板</Link>
      </Menu.Item>
      <Menu.Item key="epic">
        <Link to="epic">任务组</Link>
      </Menu.Item>
    </Content>
  );
};

export default XMenu;

const Content = styled(Menu)`
  height: 100%;
  .ant-menu-item {
    margin-top: 0;
  }
`;
