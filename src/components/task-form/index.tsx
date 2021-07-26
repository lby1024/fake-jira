import styled from "@emotion/styled";
import { Button, Modal, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import XTaskTypeSelect from "components/select/task-type-select";
import XUserSelect from "components/select/user-select";
import React, { FC, useState } from "react";
import AlertModel from "tools/alert";
import { ITask, useDeleteTask, useEditTask } from "tools/task";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}

const XTaskForm:FC  = () => {

    const [ form ] = useForm()
    const [ visible, setVisible ] = useState(false)
    const [param, setParam] = useState<Partial<ITask>>()
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask()
    const { mutateAsync: deleteTask, isLoading: deleteLoading } = useDeleteTask()

    AlertModel.taskForm = async (param?: Partial<ITask>) => {
        setVisible(!visible)
        if(!param?.id) return
        setParam(param)
        form.setFieldsValue(param)
    }

    function onFinish() {
        const data = form.getFieldsValue()
        editTask({...param, ...data}).then(() => close())
    }

    function close() {
        form.resetFields()
        setVisible(false)
    }

    async function delTask() {
        if(param) {
            await deleteTask(param)
        }
        close()
    }

    return <Content  
        title="编辑任务"
        okText="确认"
        cancelText="取消"
        confirmLoading={editLoading}
        visible={visible}
        onOk={onFinish}
        onCancel={close}
    >
        <Form className="form" {...layout} form={form} >
            <Form.Item label="任务名" name="name" rules={[{required: true, message: "请输入任务名"}]} >
                <Input placeholder="输入任务名" />
            </Form.Item>

            <Form.Item label="经办人" name="processorId" >
                <XUserSelect />
            </Form.Item>

            <Form.Item label="类型" name="typeId" >
                <XTaskTypeSelect />
            </Form.Item>
            
            <div className="btn-content" >
                <Button 
                    type="primary" 
                    loading={deleteLoading} 
                    onClick={delTask}
                    size="small" >删除</Button>
            </div>
        </Form>
    </Content>
}

export default XTaskForm

const Content = styled(Modal)`
    .btn-content {
        text-align: right;
    }
`