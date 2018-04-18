Ext.define('Admin.store.BaseList',{
    extend: 'Ext.data.Store',
    alias: 'store.baseListStore',

    fields:['text'],
    pageSize:0,
    remoteFilter: false,
    remoteSort: false,
    sorters: {
        property: 'text',
        direction: ''
    }
});