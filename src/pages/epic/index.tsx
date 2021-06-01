import styled from "@emotion/styled";
import { Button, List, Modal } from "antd";
import { XRow } from "components/row";
import dayjs from "dayjs";
import { useProjectIdInUrl } from "pages/kanban/utils";
import { FC } from "react";
import AlertModel from "tools/alert";
import { useProject } from "tools/project";
import { IEpic, useDeleteEpic, useEpics } from "./utils";

const XEpic:FC = () => {

    const { data: epics } = useEpics()
    const { mutateAsync: deleteEpic } = useDeleteEpic()
    const { data: project } = useProject(useProjectIdInUrl())

    function del(param: IEpic) {
        Modal.confirm({
            title: `确定删除项目:${param.name}`,
            content: "点击确定删除",
            okText: "确定",
            onOk() {
                deleteEpic(param)
            }
        })
    }
    
    return <Content>
        <XRow between={true} >
            <h1>{project?.name}任务组</h1>
            <Button type="link" onClick={() => AlertModel.epicForm()} >创建任务组</Button>
        </XRow>
        <List  
            style={{overflow: "auto", height: "81vh"}}
            itemLayout="vertical"
            dataSource={epics}
            renderItem={epic => <List.Item>
                <List.Item.Meta 
                    title={<XRow between={true} >
                        <span>{epic.name}</span>
                        <Button type="link" onClick={() => del(epic)} >删除</Button>
                    </XRow>}
                    description={
                        <div>
                            <div>开始时间: {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                            <div>结束时间: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                        </div>
                    }
                />
            </List.Item>}
        />
    </Content>
}

export default XEpic

const Content = styled.div`
    padding: 2rem;
`