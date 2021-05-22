export enum API {
    userInfo = 'me', // 获取用户信息
    login = 'login', // 登录
    register = 'register', // 注册    
    projects = 'projects', // 项目列表
    users = "users",    // 获取人员列表
    kanbans = "kanbans", //
    tasks = "tasks", 
    taskTypes = "taskTypes",
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IRegist extends ILogin {}

export interface IGetTasks {
    name: string,
    processorId: number,
    typeId: number,
    tagId: number,
    projectId: number,
}
