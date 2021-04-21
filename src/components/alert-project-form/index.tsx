import styled from "@emotion/styled";
import { Drawer, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { FC } from "react";
import useProjectsParam from "screens/project-list/use-projects-param";
import { useAddProject, useEditProject, useProjectsQuery } from "utils/use-project";
import XProjectForm from "./project-form";
import { useAlertProject } from "./use-alert-project";

const XAlertProjectForm: FC = () => {

    const formModel = useAlertProject()
    const useMutate = formModel.data ? useEditProject : useAddProject
    const action = useMutate(
        useProjectsQuery()
    )
    const [form] = useForm()

    const submit = async (data: any) => {
        await action.mutateAsync({...formModel.data, ...data})
        form.resetFields()
        formModel.close()
    }    


    return <CSS>
        <Drawer 
            visible={formModel.show} 
            onClose={formModel.close} 
            width='100%' >
            {
                formModel.isLoading 
                ? <Spin size='large' />
                : <XProjectForm form={form} loading={action.isLoading} onFinish={submit} />
            }    
        </Drawer>
    </CSS>
}

export default XAlertProjectForm

const CSS = styled.div`
`;