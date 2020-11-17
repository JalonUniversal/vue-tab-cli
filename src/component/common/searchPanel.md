### 关于SearchPanel组件
> 全局通用列表搜索组件，包含了筛选栏自定义配置，查询重置操作。

----

#### 组件用到的config配置:

* config 当前模块查询配置项 必须设置 type: Object
> 在你的模块表格需要有默认的条件存在时，这个属性至关重要，可以传空对象

```
    config: {
        form: [                         //1. input类型
            {
                label: '',              // 标签  （字段必配）        
                key: '',                // 对应后端的请求字段 （字段必配）
                type: 'input',          // 类型   （字段必配）    
                value: '',              // 默认值 （字段必配）           
                placeholder: '',        //占位符 
                rules: {                // 验证规则
                    required: false, 
                    trigger: "blur",
                    validator: ()=>{}   
                }
            },
            {                           //2. 下拉类型
                label: '',
                key: '',
                type: 'select',                       
                value: '',
                options: [
                    {
                        value: '',
                        label: ''
                    },
                    {
                        value: '',
                        label: ''
                    }
                ],
                placeholder: ''
            },
            {                           //3. datePicker类型（此时可以配置config字段）
                label: '',
                key: '',
                type: 'datePicker',  
                value: '',
                config: {
                    type: 'daterange',              //daterange 日期范围类型
                    rangeSeparator: '~',
                    startPlaceholder: '开始日期',
                    endPlaceholder: '结束日期'
										pickerOptions:{}              // 支持快捷键日期配置
                }
            },
            {
                label: '',
                key: '',
                type: 'datePicker',     
                value: '',
                config: {
                    type: 'month',                  //month 月份类型     
                    placeholder: '请选择月份'
                },
            },
						{														//4. checkbox类型
                label: '',
                key: '',
                type: 'checkbox',    
                value: false,
            },
        ],
        col:3,   // 每行排列的个数，默认排列三个（此字段可以省略）
				buttonGroup:[
					{
						type:'', // 按钮类型
						title:'重置', // 按钮文案
						key:'reset'  // 按钮标识（标识触发对应事件）
						...        // 后续按钮属性继承配置
					},
				]
    }
```
* search查询函数

* reset 重置函数
----
# 总结

* 也就是说，你只需要设置 config={}， search，reset两个方法即可顺利使用此组件

