<template>
	<div>
		<el-card>
			<search-panel v-model="searchValue" :config="searchConfig" />
		</el-card>
	</div>
</template>

<script>
export default {
	name: 'displaySearchPanel',
	data() {
		return {
			searchConfig: [
				{
          label: '项目名称',
          key: 'name',
					value: '',
					type: 'input',
				},
				{
          label: '项目类型',
          key: 'type',
					value: '',
					options: [
						{ label: '运营后台', value: 'op' },
						{ label: 'PC门户', value: 'pc' },
						{ label: 'APP', value: 'service' },
					],
					type: 'select',
        },
        {
          label: '时间范围',
          key: 'timerange',
					value: [],
          type: 'datePicker',
          config: {
            type: 'daterange'
          }
        }
			],
			searchValue: {},
		};
	},
};
</script>