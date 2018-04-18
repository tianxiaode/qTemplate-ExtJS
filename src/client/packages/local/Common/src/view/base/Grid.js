Ext.define('Common.view.base.Grid',{
    extend: 'Ext.grid.Panel',
    xtype: 'baseViewGrid',

    requires:[
        'Common.view.base.ToolBar'
    ],
    

    emptyText: I18N.EmptyText,
    reference: 'MainGrid',
    selModel: {
        selType: 'checkboxmodel',
        showHeaderCheckbox: false
    }, 
    cls: 'email-inbox-panel shadow',
    headerBorders: false,
    rowLines: false,
    padding: 20,

    bind: { selection: '{selection}' , store: '{mainStore}'}        

})