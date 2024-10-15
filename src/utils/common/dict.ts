import { getDicts } from '@/service/index/foo'
import { useDictStore } from '@/store'
import { ref } from 'vue'

interface DictDataOption {
  label: string
  value: string
  cssClass: string
  listClass: string
}

/**
 * 获取字典数据
 */
export const useDict = (...args: string[]): { [key: string]: DictDataOption[] } => {
  const res = ref<{
    [key: string]: DictDataOption[]
  }>({})
  return (() => {
    args.forEach(async (dictType) => {
      res.value[dictType] = []
      const dicts = useDictStore().getDict(dictType)
      if (dicts) {
        res.value[dictType] = dicts
      } else {
        await getDicts(dictType).then((resp: any) => {
          res.value[dictType] = resp.data?.map(
            (p: any): DictDataOption => ({
              label: p.dictLabel,
              value: p.dictValue,
              cssClass: p.cssClass,
              listClass: p.listClass,
            }),
          )
          useDictStore().setDict(dictType, res.value[dictType])
        })
      }
    })
    return res.value
  })()
}
