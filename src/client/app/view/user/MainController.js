Ext.define('Admin.view.user.MainController', {
    extend: 'Common.view.base.ViewController',
    alias: 'controller.user',

    onUserCheckChange: function (column, rowIndex, checked, record, e, eOpts) {
        var me = this;
        me.doColumnCheckChange(URI.get('user','checkchange'), record, column.dataIndex);
    },

    entityName: 'User',
    deleteMessageField: 'userName'


});
