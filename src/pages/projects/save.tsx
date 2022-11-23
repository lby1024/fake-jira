import { Rate } from "antd";
import { FC, useMemo } from "react";
import { IProject, useEditProject } from "tools/project";

interface IXSaveProject {
  project: Partial<IProject>;
}

const XSaveProject: FC<IXSaveProject> = ({ project }) => {
  const { mutateAsync: saveProject } = useEditProject();

  const value = useMemo(() => {
    return project.pin ? 1 : 0;
  }, [project.pin]);

  function onTap(v: number) {
    saveProject({
      id: project.id,
      pin: !!v,
    });
  }

  return <Rate value={value} count={1} onChange={onTap} />;
};

export default XSaveProject;
