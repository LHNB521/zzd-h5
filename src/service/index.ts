import { http } from '@/utils/http'

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

// 不动产审核列表
export const getDingAuditList = (query: any) => {
  return http.get('/nanxun/achievement/dingAuditList', query)
}
// 不动产审核详细列表
export const getDingAuditDetailsList = (query: any) => {
  return http.get('/nanxun/achievement/getList', query)
}
// 不动产审核
export const dingAudit = (data: any) => {
  return http.post('/nanxun/achievement/dingAudit', data)
}
// 不动产审核详情成果清单
export const achievementSheet = (query: any) => {
  return http.get('/nanxun/achievementSheet/list', query)
}
// 请求不动产实例
export const auditActivity = (query: any) => {
  return http.get('/nanxun/auditActivity/list', query)
}
