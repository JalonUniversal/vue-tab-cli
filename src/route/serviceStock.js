const AsyncInventoryQuery = () => import(/* webpackChunkName: 'Inventory Query'*/ '../component/serviceStock/inventoryQuery.vue');
const AsyncStockAddSubstraction = () => import(/* webpackChunkName: 'Stock Add Substraction'*/ '../component/serviceStock/stockAddSubstraction.vue');
const AsyncInventoryReconciliation  = () => import(/* webpackChunkName: 'Inventory Reconciliation'*/ '../component/serviceStock/inventoryReconciliation.vue');
const AsyncPrintSwitch  = () => import(/* webpackChunkName: 'print Switch'*/ '../component/serviceStock/printSwitch.vue');
const AsyncPackageSplit  = () => import(/* webpackChunkName: 'package Split'*/ '../component/serviceStock/packageSplit.vue');
const AsyncPackageRetain  = () => import(/* webpackChunkName: 'package Retain'*/ '../component/serviceStock/packageRetain.vue');
const AsyncPackageCombination  = () => import(/* webpackChunkName: 'package Combination'*/ '../component/serviceStock/packageCombination.vue');

export default [
	{
		path: '/inventory_query',
		component: AsyncInventoryQuery,
		meta: { title: '库存查询' }
	},
	{
		path: '/Stock_Add_Substraction',
		component: AsyncStockAddSubstraction,
		meta: { title: '库存增减明细' }
	},	
	{
		path: '/inventory_Reconciliation',
		component: AsyncInventoryReconciliation,
		meta: { title: '库存对账单' }
	},
	{
		path: '/print_switch',
		component: AsyncPrintSwitch,
		meta: { title: '库存对账单打印开关' }
	},
	{
		path: '/package_Split',
		component: AsyncPackageSplit,
		meta: { title: '套装拆分' }
	},
	{
		path: '/package_Retain',
		component: AsyncPackageRetain,
		meta: { title: '套装保留' }
	},
	{
		path: '/package_Combination',
		component: AsyncPackageCombination,
		meta: { title: '套装组合' }
	},
];
