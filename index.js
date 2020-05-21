import copy from 'copy-to-clipboard';

export var CopyToClipboardProps = {
  text: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    'default': function _default() {
      return null;
    }
  }
};

var CopyToClipboard = {
  name: 'VueCopyToClipboard',
  functional: true,
  props: CopyToClipboardProps,
  render: function (h, ctx) {
    var props = ctx.props,
        listeners = ctx.listeners,
        children = ctx.children;
    var text = props.text,
        options = props.options || {};
    var onCopy = listeners.copy

    function handleClick(e) {
      // Bypass onClick if it was present
      e.preventDefault()
      e.stopPropagation()

      const result = copy(text, options)

      if (onCopy) {
        onCopy(text, result)
      }
    }

    return h('span', { on: { 'click': handleClick }}, children);
  }
};

/* istanbul ignore next */
CopyToClipboard.install = function (Vue) {
  Vue.component(CopyToClipboard.name, CopyToClipboard)
};

export default CopyToClipboard;
