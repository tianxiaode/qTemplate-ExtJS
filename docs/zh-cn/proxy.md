# 设置代理的提交参数和读取参数

在本模版中，所有的存储都会使用`Common.ux.data.proxy.Format`代理来实现标准化读取和提交数据，因而，只需要修改该类，就可调整提交参数和读取参数，具体的源代码如下：
```javascript
Ext.define('Common.ux.data.proxy.Format', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.format',

    requires: [
        'Common.util.Failed'
    ],

    limitParam: 'MaxResultCount',
    startParam: 'SkipCount', 
    sortParam: 'Sorting',

    reader: {
        type: 'json',
        rootProperty: "result.items",
        messageProperty: "msg",
        totalProperty: 'totalCount'
    },

    writer: {
        type: "json",
        encode: true,
        rootProperty: "data",
        allowSingle: false
    },

    listeners: {
        exception: FAILED.proxy
    }


})
```

