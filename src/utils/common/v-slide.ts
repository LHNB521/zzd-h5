const DISTANCE = 100
const DURATION = 200
const animationMap = new WeakMap()
const ob = new IntersectionObserver((entries: any) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = animationMap.get(entry.target)
      animation.play()
      ob.unobserve(entry.target)
    }
  }
})
function isBelowViewport(el: any) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}
export default {
  mounted(el: any) {
    if (!isBelowViewport(el)) {
      return
    }
    const animation = el.animate(
      [
        {
          transform: `translateY(${DISTANCE}px)`,
          opacity: 0.5,
        },
        {
          transform: 'translateY(0)',
          opacity: 1,
        },
      ],
      {
        duration: DURATION,
        easing: 'ease',
      },
    )
    animation.pause()
    animationMap.set(el, animation)
    ob.observe(el)
  },
  unmounted(el: any) {
    ob.unobserve(el)
  },
}
