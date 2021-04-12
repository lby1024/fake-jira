import styled from "@emotion/styled";
import { Drawer } from "antd";
import AlertModel from "models/alert";
import React, { FC, useState } from "react";
import XProjectForm from "./project-form";

const XAlertProjectForm: FC = () => {

    const [show, setShow] = useState(false)

    AlertModel.projectForm = () => setShow(true)

    return <CSS>
        <Drawer 
            visible={show} 
            onClose={() => setShow(false)} 
            width='100%' >
            <XProjectForm />    
        </Drawer>
    </CSS>
}

export default XAlertProjectForm

const CSS = styled.div`
`;