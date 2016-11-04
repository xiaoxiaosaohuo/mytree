# jstree 插件
1. ####  [API 文档]()
1. ####  [使用示例]()


1. 1 参数说明

参数 | 类型  | 含义 |默认值
---|---|---|---
dataSource | function |  数据处理函数|无
multiSelect | Boolean |  是否开启多选|false
cacheItems | Boolean |  是否缓存已经渲染的选项|true
folderSelect | Boolean |  是否允许选择折可折叠项|true
folderIcon | string | 可折叠项图标|plus-square-o
folderOpenIcon | string | 折叠项打开后图标| minus-square-o
itemIcon | string | 叶子节点图标|angle-right
itemSelectedIcon | string |叶子节点选中图标|check
folderIcon | string |可折叠项图标|plus-square-o
folderIcon | string |可折叠项图标|plus-square-o
folderIcon | string |可折叠项图标|plus-square-o


1.2  数据格式

key | type | des
---|---|---
title  | string | 节点标题
type  | string |节点类型
attr | object | 附加数据
attr.classNames | string |添加到节点的class名
attr.icon | string |自定义节点图标的class名
attr.id | string | 附加的id
1.3  自定义事件

eventsType  |  des
---|---
selected.tree.js | 当选择一项的时候，返回一个对象，该对象包含该项的数据
loaded.tree.js | 当子项加载成功时触发，返回父级对象
disclosedFolder.tree.js | 当展开的时候触发，返回打开项的数据对象
beforedisclosedFolder.tree.js | 展开之前触发，返回被选择项的数据对象
closed.tree.js | 当关闭的时候触发，返回被关闭项的数据对象





