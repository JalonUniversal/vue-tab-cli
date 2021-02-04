/* eslint-disable */
// 高德地图 SDK
export default class LocationManger {
	constructor() {
		this.map = null;
		this.geolocation = null;

		this.map = new AMap.Map('container', { resizeEnable: true });
		// 初始化地图 SDK
		AMap.plugin('AMap.Geolocation', () => {
			this.geolocation = new AMap.Geolocation({
				enableHighAccuracy: true, // 使用高精度定位
				timeout: 10000, // 超时
				buttonPosition: 'RB',
				buttonOffset: new AMap.Pixel(10, 20),
				zoomToAccuracy: true,
			});
			this.map.addControl(this.geolocation);
		});
	}
	// 获取当前位置坐标
	locate() {
		return new Promise((resolve, reject) => {
			if(!this.geolocation) {
				setTimeout(this.locate, 1000);
				return false;
			}
			this.geolocation.getCurrentPosition((status, result) => {
				if (status === 'complete') {
					resolve(result);
				} else {
					reject(result);
				}
			});
		});
	}
}
/* eslint-disable */
