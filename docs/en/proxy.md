# Configure submit and read parameters for proxy

In this template, all stores use the `Common.ux.data.proxy.Format` to normalize data reading and submission, so you can adjust the submission parameters and read parameters only if you modify the class, with the following source code:
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

