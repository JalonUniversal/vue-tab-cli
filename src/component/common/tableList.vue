/** * Table表格 */
<template>
	<div class="table_list_fix">
		<!-- 扩展性内容 -->
		<slot name="content_context"></slot>

		<!-- table表格 -->
		<el-table
			size="small"
			v-bind="$attrs"
			:border="border"
			:data="dataSource"
			v-loading="loading"
			v-on="tableEvents"
			ref="multipleTable"
			style="width: 100%"
			:max-height="$attrs.maxHeight"
			:highlight-current-row="true"
			@selection-change="handleSelectionChange"
		>
			<!-- 复选框 -->
			<el-table-column
				type="selection"
				style="width: 55px"
				v-if="options && options.selection && (!options.isShow || options.isShow())"
			/>

			<el-table-column
				width="60"
				align="left"
				type="index"
				v-if="options && options.index"
				:label="options && options.labelIndex"
			/>

			<!-- 表格数据 -->
			<template v-for="(column, index) in columns">
				<el-table-column
					:key="index"
					v-bind="column.props"
					:prop="column.prop"
					:label="column.label"
					:align="column.align"
					:width="column.width"
					v-if="!column.isShow || (column.isShow && column.isShow())"
				>
					<template slot-scope="scope">
						<template v-if="!column.render">
							<template v-if="column.formatter">
								<span
									v-html="column.formatter(scope.row, column, scope.$index)"
									@click="column.click && column.click(scope.row, scope.$index)"
								></span>
							</template>
							<template v-else-if="column.newjump">
								<router-link
									class="newjump"
									v-bind="{ target: '_blank', ...column.target }"
									:to="column.newjump(scope.row, column, scope.$index)"
									>{{ scope.row[column.prop] || column.content }}</router-link
								>
							</template>
							<template v-else>
								<span
									:style="column.click ? 'color: #409EFF; cursor: pointer;' : null"
									@click="column.click && column.click(scope.row, scope.$index)"
								>
									{{ scope.row[column.prop] || column.content }}
									{{ `${scope.row[column.prop] && column.unit ? column.unit : ''}` }}
								</span>
							</template>
						</template>
						<template v-else>
							<render :column="column" :row="scope.row" :render="column.render" :index="index"></render>
						</template>
					</template>
				</el-table-column>
			</template>

			<!-- slot插槽按钮 -->
			<el-table-column
				label="操作"
				align="center"
				fixed="right"
				:width="(options && options.operatesWidth) || 220"
				v-if="slotcontent"
			>
				<template slot-scope="scope">
					<slot :data="scope.row" :index="scope.$index" />
				</template>
			</el-table-column>

			<!-- 操作按钮 -->
			<el-table-column
				label="操作"
				align="left"
				fixed="right"
				v-bind="options && options.props"
				v-if="operates && operates.length > 0"
			>
				<template slot-scope="scope">
					<div class="operate-group">
						<template v-for="(btn, key) in operates">
							<span
								:key="key"
								style="margin-right: 18px"
								v-if="!btn.isShow || (btn.isShow && btn.isShow(scope.row, scope.$index))"
							>
								<template v-if="btn.isPopover">
									<el-popover placement="top" :value="visible" :key="key">
										<p style="text-align: center; margin-bottom: 20px">确定{{ btn.title }}吗？</p>
										<div style="text-align: right; margin: 0">
											<el-button size="mini" @click="onCancel">取消</el-button>
											<el-button type="primary" size="mini" @click="onConfirm">确定</el-button>
										</div>
										<el-button
											slot="reference"
											:size="btn.size || 'small'"
											:type="btn.type || `text`"
											:icon="btn.icon"
											:plain="btn.plain"
											:disabled="btn.disabled && btn.disabled(scope.row, scope.$index)"
											@click.native.prevent="btn.method(scope.row, scope.$index)"
											>{{ btn.title }}{{ operates.length >= 2 ? '&nbsp;&nbsp;' : '' }}</el-button
										>
									</el-popover>
								</template>
								<template v-else>
									<el-button
										:size="btn.size || 'small'"
										:type="btn.type || `text`"
										:icon="btn.icon"
										:plain="btn.plain"
										:disabled="btn.disabled && btn.disabled(scope.row, scope.$index)"
										@click.native.prevent="btn.method(scope.row, scope.$index)"
										>{{ btn.title }}{{ operates.length >= 2 ? '&nbsp;&nbsp;' : '' }}</el-button
									>
								</template>
							</span>
						</template>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<!-- 分页部分 -->
		<el-pagination
			background
			class="pagination"
			v-if="pagination"
			:total="dataTotal"
			:current-page.sync="pagination.currentPage"
			:page-size="pagination.pageSize"
			@current-change="handleChangePage"
			@size-change="handleSizeChange"
			layout="sizes, total , prev, pager, next, jumper"
		/>
		<div class="bottom-left">
			<slot name="bottom_left_btn"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tableList',
	props: {
		dataSource: {
			// 数据源
			type: Array,
			default: () => [],
		},
		columns: {
			// 表头
			type: Array,
			default: () => [],
		},
		border: {
			//边框
			type: Boolean,
			default: false,
		},
		loading: {
			// 加载
			type: Boolean,
			default: false,
		},
		pagination: {
			// 分页
			type: Object,
			default: null,
		},
		dataTotal: {
			// 总数
			type: Number,
			default: 0,
		},
		options: Object, // 多选框配置
		slotcontent: {
			// 插槽
			type: Boolean,
			default: false,
		},
		operates: {
			// 操作栏配置
			type: Array,
		},
		tableEvents: Object, // Table Events
	},
	data() {
		return {
			multipleSelection: [],
			visible: false,
		};
	},
	methods: {
		// 复选框选中项
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.$emit('handleSelectionChange', Array.from(val));
		},
		// 改变分页触发事件
		handleChangePage(val) {
			this.$emit('handleChangePage', val);
		},
		// 改变每页多少条下拉触发事件
		handleSizeChange(val) {
			this.$emit('handleSizeChange', val);
		},
		// 取消操作
		onCancel() {
			this.visible = false;
		},
		// 确定操作
		onConfirm() {
			this.visible = false;
		},
	},
	mounted() {
		// 初始化触发toggleRowSelection事件
		this.$nextTick(() => {
			this.$emit('toggleRowSelection', this.$refs.multipleTable);
		});
	},
	components: {
		render: {
			functional: true,
			props: {
				row: Object,
				render: Function,
				index: Number,
				column: {
					type: Object,
					default: null,
				},
			},
			render: (h, opt) => {
				const params = {
					row: opt.props.row,
					index: opt.props.index,
				};
				if (opt.props.column) params.column = opt.props.column;
				return opt.props.render(h, params);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.table_list_fix {
	overflow: hidden;
	.btn-operates {
		margin-bottom: 6px;
		a {
			color: #fff;
			text-decoration: none;
			display: inline-block;
		}
	}
}
.table-header {
	padding-top: 10px;
	.table-header_button {
		text-align: right;
		float: right;
		margin-bottom: 12px;
		line-height: 40px;
	}
}
.newjump {
	text-decoration: none;
	color: dodgerblue;
}
::v-deep.pagination {
	text-align: right;
}
.bottom-left {
	position: absolute;
	bottom: -15px;
	left: 20px;
}
</style>
