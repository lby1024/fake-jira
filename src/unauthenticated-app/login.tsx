import { useUser } from 'context/user-cotext';
import React, { FormEvent } from "react";

export const LoginScreen = () => {

  const { login, user } = useUser()

  // HTMLFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({username, password})
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        user && <div>wellcome: {user.name}</div>
      }
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>login</button>
    </form>
  );
};
