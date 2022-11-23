import styled from "@emotion/styled";
import { Select } from "antd";
import { FC } from "react";
import { useTaskTypes } from "tools/task";
import { useSelect } from "./use-select";

interface IXTaskTypeSelect extends React.ComponentProps<typeof Select> {}

const XTaskTypeSelect: FC<IXTaskTypeSelect> = (props) => {
  const { data: taskTypes } = useTaskTypes();

  const { options, defaultValue } = useSelect(taskTypes, "类型");

  return (
    <Content {...props} value={props.value || defaultValue} options={options} />
  );
};

export default XTaskTypeSelect;

const Content = styled(Select)`
  .ant-select-selection-item {
    text-align: left;
  }
`;
