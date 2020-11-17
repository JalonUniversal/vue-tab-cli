export const busPlugin = {
	install(Vue) {
		Vue.prototype.$bus = new Vue();
		const warn = console.warn;
		Vue.mixin({
			data() {
				return {
					eventListeners: [], // 事件存放队列
				}
			},
			methods: {
				// 监听事件
				$listen(eventName, callback) {
					if(!eventName || typeof eventName !== 'string') {
						return warn('[注意] 请提供一个有效的事件名字');
					}
					if(!callback || typeof callback !== 'function') {
						return warn('[注意] 事件处理方法必须是一个有效的方法');
					}
					if(this.eventListeners.includes(eventName)) {
						return warn(`[注意] 事件: ${eventName} 已注册,无须重复注册`);
					}
					this.eventListeners.push(eventName);
					this.$bus.$on(eventName, callback);
				},
				// 触发事件
				$dispatch(eventName, data) {
					if(!eventName || typeof eventName !== 'string') {
						return warn('[注意] 请提供一个有效的事件名字');
					}
					this.$nextTick(() => {
						setTimeout(() => {
							this.$bus.$emit(eventName, data);
						}, 0);
					});
				}
			},
			beforeDestroy() {
				if(this.eventListeners.length) {
					this.eventListeners.forEach(eventName => {
						this.$bus.$off(eventName);
					});
				}
			}
		});
	}
}
