import React, { FC, useEffect, useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import AlertModel, { ITaskForm } from 'models/alert';
import { useForm } from 'antd/lib/form/Form';
import XUserSelect from 'components/user-select';
import XTaskTypeSelect from 'components/tasktype-select';
import { ITask, useEditTask, useTask } from 'models/task';

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
}

const XAlertTaskForm: FC = () => {
  const [show, setShow] = useState(false);
  const [form] = useForm()
  const [param, setParam] = useState<ITaskForm>()
  const {data} = useTask(param?.taskId)
  const { mutate: updateTask, isLoading: updating } = useEditTask()

  AlertModel.taskForm = (param: ITaskForm) => {
    setShow(true);
    setParam(param);
  }

  const handleOk = () => {
    // updateTask()
    updateTask({...data, ...form.getFieldsValue()})
    setShow(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setShow(false);
  };

  useEffect(() => {
    if(show && data) {
      form.setFieldsValue(data)
    }
  }, [data, show])

  return <Modal 
        title="编辑任务" 
        okText='确认'
        cancelText='取消'
        confirmLoading={updating}
        visible={show} 
        onOk={handleOk} 
        onCancel={handleCancel}
        forceRender={true}
      >
        <Form form={form} {...layout} className='form' >
          <Form.Item 
            label='任务名' 
            name='name' 
            rules={[{required: true, message: '请输入任务名'}]} >
            <Input />
          </Form.Item>

          <Form.Item label='经办人' name='processorId' >
            <XUserSelect defaultName='经办人' />
          </Form.Item>

          <Form.Item label='类型' name='typeId' >
            <XTaskTypeSelect defaultName='类型' />
          </Form.Item>

          <div style={{textAlign: 'right'}} >
            <Button danger >删除</Button>
          </div>
        </Form>
    </Modal>
};

export default XAlertTaskForm
