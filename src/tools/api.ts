export enum API {
    userInfo = 'me', // 获取用户信息
    login = 'login', // 登录
    register = 'register', // 注册    
    projects = 'projects', // 项目列表
    users = "users",    // 获取人员列表
    kanbans = "kanbans", //
    kanbansReorder = "kanbans/reorder",
    tasks = "tasks", 
    taskTypes = "taskTypes",
    tasksReorder = "tasks/reorder",
    epics = "epics",
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
/**
 * 排序看板
 * 排序task
 */
export interface ISort {
    // 要重新排序的 item
    fromId: number;
    // 目标 item
    referenceId: number;
    // 放在目标item的前还是后
    type: "before" | "after";
    fromKanbanId?: number;
    toKanbanId?: number;
  }