Ext.define('Admin.view.user.Grid',{
    extend: 'Common.view.base.Grid',
    xtype: 'userGrid',

    columns:{
        defaults:{
            entityName: 'User',
            autoText: true
        },
        items:[
            { xtype: 'rownumberer' },
            { dataIndex: 'userName', flex: 1, renderer: 'doHighLightRenderer' },
            { dataIndex: 'name', flex: 1, renderer: 'doHighLightRenderer' },
            { dataIndex: 'surname', flex: 1, renderer: 'doHighLightRenderer' },
            { dataIndex: 'emailAddress', flex: 1, renderer: 'doHighLightRenderer' },
            { dataIndex: 'roleNames', flex: 1, sortable: false },
            { xtype: 'datecolumn',  dataIndex: 'creationTime', format: I18N.DefaultDatetimeFormat, width: 150 },
            { xtype: 'datecolumn',  dataIndex: 'lastLoginTime', format: I18N.DefaultDatetimeFormat, width: 150 },
            { xtype: 'checkcolumn',  dataIndex: 'isActive', width: 100, listeners: { checkchange: 'onUserCheckChange' }}    
]        
    },

    dockedItems:[
        { xtype: 'baseViewToolbar', dock: 'top'}
    ]
})