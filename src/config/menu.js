export const MENU = [
	{
		icon: "&#xe678;",
		name: "图表统计",
		children: [
			{
				name: "图表统计",
				href: "/customer_overview",
				component: 'customerOverview'
			},
		]
  },
  {
		icon: "&#xe678;",
		name: "缓存读写",
		children: [
			{
				name: "缓存读写",
				href: "/storage",
				component: 'storage'
			},
		]
	},
	{
		icon: "&#xe678;",
		name: "地图定位",
		children: [
			{
				name: "地图定位",
				href: "/locate",
				component: 'locate'
			},
		]
	},
];
