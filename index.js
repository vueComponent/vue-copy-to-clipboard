import copy from 'copy-to-clipboard'

export const CopyToClipboardProps = {
  text: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    default: () => {}
  }
}

const CopyToClipboard = {
  name: 'VueCopyToClipboard',
  functional: true,
  props: CopyToClipboardProps,
  render (h, ctx) {
    const { props: { text, options = {} }, listeners: { copy: onCopy } } = ctx

    const handleClick = (e) => {
      // Bypass onClick if it was present
      e.preventDefault()
      e.stopPropagation()

      const result = copy(text, options)

      if (onCopy) {
        onCopy(text, result)
      }
    }

    return h('span', { on: { click: handleClick }}, ctx.children)
  }
}

/* istanbul ignore next */
CopyToClipboard.install = function (Vue) {
  Vue.component(CopyToClipboard.name, CopyToClipboard)
}

export default CopyToClipboard
