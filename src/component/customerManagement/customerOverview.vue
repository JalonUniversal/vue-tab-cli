<template>
	<div>
		<guideBar />
		<el-card>
			<el-row slot="header" type="flex" justify="space-between">
				<h1>关键指标</h1>
				<el-select
					v-model="channels"
					multiple
					collapse-tags
					placeholder="请选择开通渠道"
					size="‘small’"
				>
					<el-option v-for="{ label, value } in CHANNEL_OPTIONS" :key="value" :label="label" :value="value" />
				</el-select>
			</el-row>
			<el-row :gutter="16" class="keyIndex">
				<el-col :span="8">
					<el-card shadow="hover">
						<div>新增普通顾客（今日）</div>
						<p>{{ keyIndexCount.todayCount.ordinaryCount }}</p>
						<div>新增转化优惠顾客（今日）</div>
						<p>{{ keyIndexCount.todayCount.discountsCount }}</p>
						<div>转化率（今日）</div>
						<p>{{ keyIndexCount.todayCount.ratio }}%</p>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card shadow="hover">
						<div>新增普通顾客（本月）</div>
						<p>{{ keyIndexCount.monthCount.ordinaryCount }}</p>
						<div>新增普通顾客（本月）</div>
						<p>{{ keyIndexCount.monthCount.discountsCount }}</p>
						<div>转化率（本月）</div>
						<p>{{ keyIndexCount.monthCount.ratio }}%</p>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card shadow="hover">
						<div>新增普通顾客（累计）</div>
						<p>{{ keyIndexCount.totalCount.ordinaryCount }}</p>
						<div>新增转化优惠顾客（累计）</div>
						<p>{{ keyIndexCount.totalCount.discountsCount }}</p>
						<div>转化率（累计）</div>
						<p>{{ keyIndexCount.totalCount.ratio }}%</p>
					</el-card>
				</el-col>
			</el-row>
		</el-card>
		<el-card>
			<el-tabs v-model="activeGraph">
				<el-tab-pane label="新增普通顾客" name="normal">
					<div id="normalCustomerGraph" ref="normalCustomerGraph" />
				</el-tab-pane>
				<el-tab-pane label="新增优惠顾客" name="discount">
					<div id="discountCustomerGraph" ref="discountCustomerGraph" />
				</el-tab-pane>
			</el-tabs>
		</el-card>
		<el-card>
			<h1 slot="header">数据详情</h1>
			<el-table :data="detail">
				<el-table-column prop="operateDate" label="日期" />
				<el-table-column prop="newCommonMember" label="新增普通顾客" />
				<el-table-column prop="newVipMember" label="新增优惠顾客" />
				<el-table-column prop="activeCommonMember" label="活跃普通顾客数" />
				<el-table-column prop="loginSuccessTotal" label="启动登录次数" />
			</el-table>
		</el-card>
	</div>
</template>

<script>
import echarts from '@/lib/echarts';
import { CHANNEL } from './config';
import { optionGenerator } from '../../util';

function padZero(val) {
	return Number(val) < 10 ? String(val).padStart(2, '0') : val + '';
}

function RandomNumBoth(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	var num = Min + Math.round(Rand * Range); //四舍五入
	num = (num * 2) / 3;
	num = parseInt(num, 10);
	return num;
}

function genData() {
	const result = [];
	for (let i = 0; i < 23; i++) {
		const item = RandomNumBoth(0, 10);
		result.push(item);
	}
	return result;
}

export default {
	name: 'customerOverview',
	data() {
		return {
			CHANNEL_OPTIONS: optionGenerator(CHANNEL),
			keyIndexCount: {
				monthCount: {
					discountsCount: 0,
					ordinaryCount: 0,
					ratio: 0,
				},
				todayCount: {
					discountsCount: 0,
					ordinaryCount: 0,
					ratio: 0,
				},
				totalCount: {
					discountsCount: 0,
					ordinaryCount: 0,
					ratio: 0,
				},
			},
			startTimeStr: this.generateTargetDay(-7),
			endTimeStr: this.generateTargetDay(),
			channels: [1, 2, 3, 4, 5],
			activeGraph: 'normal',
			customerGraph: null,
			VIPGraph: null,
			detail: [],
		};
	},
	watch: {
		activeGraph: {
			immediate: true,
			handler(tabName) {
				this.$nextTick(() => {
					if (tabName === 'normal') return this.loadNormalCustomerTrend();
					if (tabName === 'discount') return this.loadVIPCustomerTrend();
				});
			},
		},
	},
	methods: {
		// 生成最近一周时间
		generateTargetDay(dayGap = 0) {
			const date = new Date();
			const targetTimestamp = date.getTime() + 1000 * 60 * 60 * 24 * dayGap;
			date.setTime(targetTimestamp);
			const YYYY = date.getFullYear();
			const MM = date.getMonth() + 1;
			const DD = date.getDate();
			return `${YYYY}-${padZero(MM)}-${padZero(DD)}`;
		},
		// 构造数据
		mockData() {
			const data = {
				legendData: {
					0: '今日',
					1: '昨日',
					2: '7天前',
					3: '30天前',
				},
				seriesList: [
					{ name: '今日', data: genData() },
					{ name: '昨日', data: genData() },
				],
				xaxisData: Array(23)
					.fill(0)
					.map((item, index) => (item = String(index + 1))),
			};
			return data;
		},
		// 获取新增普通顾客趋势图
		loadNormalCustomerTrend() {
			const { legendData, xaxisData, seriesList } = this.mockData();
			this.customerGraph = echarts.init(this.$refs.normalCustomerGraph);
			const option = {
				title: { text: '趋势图' },
				legend: { data: legendData },
				tooltip: { trigger: 'axis' },
				xAxis: {
					type: 'category',
					data: xaxisData,
				},
				yAxis: { type: 'value' },
				series: seriesList.map(({ data, name }) => ({ data, type: 'line', name })),
			};
			this.customerGraph.setOption(option);
		},
		// 获取新增优惠顾客趋势图
		loadVIPCustomerTrend() {
			const { legendData, xaxisData, seriesList } = this.mockData();
			this.VIPGraph = echarts.init(this.$refs.discountCustomerGraph);
			const option = {
				title: { text: '趋势图' },
				legend: { data: legendData },
				tooltip: { trigger: 'axis' },
				xAxis: {
					type: 'category',
					data: xaxisData,
				},
				yAxis: { type: 'value' },
				series: seriesList.map(({ data, name }) => ({ data, type: 'line', name })),
			};
			this.VIPGraph.setOption(option);
		},
		// 获取数据统计详情
		loadDetailData() {
			const mockData = [
				{
					activeCommonMember: 9,
					loginSuccessTotal: 118,
					newCommonMember: 3,
					newVipMember: 14,
					operateDate: '2021-01-19',
				},
				{
					activeCommonMember: 21,
					loginSuccessTotal: 186,
					newCommonMember: 10,
					newVipMember: 30,
					operateDate: '2021-01-20',
				},
				{
					activeCommonMember: 0,
					loginSuccessTotal: 0,
					newCommonMember: 0,
					newVipMember: 0,
					operateDate: '2021-01-21',
				},
			];
			this.detail = mockData;
		},
	},
	mounted() {
		this.loadDetailData();
	},
};
</script>

<style lang="scss" scoped>
#normalCustomerGraph,
#discountCustomerGraph {
	width: 100%;
	height: 300px;
	margin: 8px auto;
}
.keyIndex div {
	font-size: 16px;
	color: $color-body;
	margin-bottom: 16px;
}
.keyIndex p {
	margin-bottom: 16px;
	text-align: left;
}
</style>
