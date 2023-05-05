
let ins = {}

export default ins.install = function (Vue, options) {
  Vue.directive(options.name, (el, params) => {
    el.innerHTML = params.value
  })
}