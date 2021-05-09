import { FC } from "react";

interface IXHeightLight {
  txt: string;
  keyword: string;
}

const XHeightLight: FC<IXHeightLight> = ({ txt, keyword }) => {
  if (!keyword) {
    return <p>{txt}</p>;
  }
  const arr = txt.split(keyword);

  return (
    <p>
      {arr.map((item, index) => (
        <span key={index}>
          {item}
          {index !== arr.length - 1 && (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </p>
  );
};

export default XHeightLight;
