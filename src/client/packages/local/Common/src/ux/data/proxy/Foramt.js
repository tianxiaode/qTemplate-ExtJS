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
