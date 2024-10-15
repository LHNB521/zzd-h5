import { http } from '@/utils/http'
// export interface IFooItem {
//   id: string
//   name: string
// }

// /** GET 请求 */
// export const getFooAPI = (name: string) => {
//   return http.get<IFooItem>('/foo', { name })
// }

// /** POST 请求 */
// export const postFooAPI = (name: string) => {
//   return http.post<IFooItem>('/foo', { name }, { name })
// }

// 项目公示
/** 查询列表 */
export const getInfoList = (query: any) => {
  return http.get('/nanxun/info/list', query)
}
// 出让用地
export const landTransferInfo = (query: any) => {
  return http.get('/nanxun/landTransferInfo/list', query)
}

// 项目列表
export const projectList = (query: any) => {
  return http.get('/nanxun/projectInfo/projectList', query)
}

// 字典
export const getDicts = (dictType: string) => {
  return http.get('/system/dict/data/type/' + dictType)
}
