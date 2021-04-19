import styled from "@emotion/styled";
import { Drawer, Spin } from "antd";
import AlertModel, { IProjectForm } from "models/alert";
import React, { FC, useState } from "react";
import { useProject } from "utils/use-project";
import XProjectForm from "./project-form";

const XAlertProjectForm: FC = () => {

    const [show, setShow] = useState(false)
    const [params, setParams] = useState<IProjectForm>()
    const project = useProject(params?.id)

    AlertModel.projectForm = (params: IProjectForm) => {
        setShow(true)
        setParams(params)
    }

    return <CSS>
        <Drawer 
            visible={show} 
            onClose={() => setShow(false)} 
            width='100%' >
            {
                project.isLoading 
                ? <Spin size='large' />
                : <XProjectForm />
            }    
        </Drawer>
    </CSS>
}

export default XAlertProjectForm

const CSS = styled.div`
`;