import Toast from './Toast'
// 搞个index 让程序运行的时候就安装
const obj = {}

obj.install = function(Vue){
  // document.body.appendChild(Toast.$el)
  // Vue.protoType.$toast = Toast;

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式，更具组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;


}

export default obj