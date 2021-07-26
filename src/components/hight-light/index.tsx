import { FC } from "react";

interface IXHightLight {
  txt: string;
  keyword: string;
}

const XHightLight: FC<IXHightLight> = ({ txt, keyword }) => {
  
  const arr = txt.split(keyword)
  
  if (!keyword) {
    return <>{txt}</>;
  }

  return (
    <>
      {arr.map((item, index) => (
        <span key={index}>
          {item}
          {index !== arr.length - 1 && (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};

export default XHightLight;
