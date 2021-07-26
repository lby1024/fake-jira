import styled from "@emotion/styled";
import React, { FC, ReactNode } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

const Content = styled.div<{
  isDraggingOver: boolean,
  bg: string,
  hoverBg: string,
}>`
  background-color: ${(props) => (props.isDraggingOver ? props.hoverBg : props.bg)};
`;

interface IXDrop extends Omit<DroppableProps, "children"> {
  children: ReactNode;
  className?: string;
  bg?: string;
  hoverBg?: string;
}

const XDrop: FC<IXDrop> = ({ children, className, bg, hoverBg, ...props }) => {
  return (
    <Droppable {...props}>
      {(provided, snapshot) => (
        <Content
          {...provided.innerRef}
          ref={provided.innerRef}
          className={className}
          isDraggingOver={snapshot.isDraggingOver}
          bg={bg || "#fff"}
          hoverBg={hoverBg || "#f7f7f7"}
        >
          {children}
          {provided.placeholder}
        </Content>
      )}
    </Droppable>
  );
};

export default XDrop;
