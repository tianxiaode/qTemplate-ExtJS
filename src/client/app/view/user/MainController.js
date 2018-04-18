Ext.define('Admin.view.user.MainController', {
    extend: 'Common.view.base.ViewController',
    alias: 'controller.user',

    onUserCheckChange: function (column, rowIndex, checked, record, e, eOpts) {
        var me = this;
        me.doColumnCheckChange(URI.get('user','checkchange'), record, column.dataIndex);
    },

    onRoleRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        return I18N.ValueList.roleDescription[value];
    },
    
    entityName: 'User',
    deleteMessageField: 'userName'


});
