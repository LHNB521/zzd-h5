import { Source } from 'ol/source'
import { View } from 'ol'
import { useMapStore } from '@/store'
import VectorSource from 'ol/source/Vector'

/**
 * 将视图调整到矢量源中的第一个特征的范围。
 * @param source - OpenLayers中的矢量源对象，必须包含要素。
 * @param view - (可选) OpenLayers中的视图对象。如果未提供，将使用默认的视图对象。
 */
export function fitFirstFeature(source: Source, view?: View) {
  const { viewer } = useMapStore()
  if (source instanceof VectorSource) {
    try {
      // 如果未提供视图对象，则使用从状态管理中获取的视图
      const targetView = view || viewer
      // 调整视图，使其适应矢量源中所有要素的范围
      targetView.fit(source.getExtent(), { padding: [100, 100, 100, 100] })
    } catch (e) {
      console.error('Error fitting view to feature extent:', e)
    }
  } else {
    console.warn('Source is undefined or null.')
  }
}
