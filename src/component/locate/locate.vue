<template>
  <div>
    <guide-bar/>
    <el-card>
      <el-row class='row-gap'>
        <el-button type='warning' icon='el-icon-s-home' @click="getIPData">获取IP</el-button>
      </el-row>
			<el-row class='row-gap'>
				<el-input :value="IP" class='locate-input' size='small' readonly />
			</el-row>
      <el-row class='row-gap'>
        <el-button type='danger' icon='el-icon-s-promotion' @click="locate" :disabled="!IP">根据IP获取地理位置</el-button>
      </el-row>
			<el-row class='row-gap'>
				<div id='Amap' />
				<el-input v-model="storageGet" class='locate-input' size='small' readonly />
			</el-row>
    </el-card>
  </div>
</template>

<script>
import { loadScript } from 'util';
// import LocationManger from '@/lib/location.js';

export default {
  name: 'locate',
  data() {
    return {
			locationManger: null,
			IP: this.ip,
      storageGet: ''
    }
	},
  methods: {
		getIPData() {
			this.$getIP();
		},
		locate() {
			this.locationManger
				.locate()
				.then((res) => {
					console.log('location data: ', res); // 定位数据 (!在 Firefox 里定位成功率很高, Chrome 中定位失败率很高)
				})
				.catch((err) => {
					console.log('error: ', err);
				});
		},
		// 初始化 LocationManger (基于高德地图SDK封装)
		initialAmap() {
			// this.locationManger = new LocationManger();
		},
	},
	mounted() {
		// 高德地图 SDK url
		const GAODE_MAP_URL = 'https://webapi.amap.com/maps?v=2.0&key=7c81a5163b7f86d8558d807f7500818c&plugin=AMap.Geolocation';
		// 加载高德地图 JS SDK
		loadScript(GAODE_MAP_URL, this.initialAmap, 'Amap');
	}
}
</script>

<style lang="scss" scoped>
.locate-input {
  width: 360px;
}
.row-gap {
  margin-bottom: 12px;
}
</style>
