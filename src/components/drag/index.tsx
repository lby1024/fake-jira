import React, { FC, ReactNode } from "react";
import { Draggable, DraggableProps } from "react-beautiful-dnd";

interface IXDrag extends Omit<DraggableProps, "children"> {
  className?: string;
  children: ReactNode;
  dragAll?: boolean;
}

const XDrag: FC<IXDrag> = ({ className, children, dragAll, ...props }) => {
  if (!React.isValidElement(children)) return <div />;
  return (
    <Draggable {...props}>
      {(provided) => {
        const dragHandleProps = dragAll ? provided.dragHandleProps : {};
        return (
          <div
            className={className}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...dragHandleProps} // 加上这个属性就可以被drag
          >
            {React.cloneElement(children, { provided })}
          </div>
        );
      }}
    </Draggable>
  );
};

XDrag.defaultProps = {
  dragAll: true
};

export default XDrag;
