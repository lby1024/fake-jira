export enum API {
    userInfo = 'me', // 获取用户信息
    login = 'login', // 登录
    register = 'register', // 注册    
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IRegist extends ILogin {

}