Ext.define('Admin.view.user.List',{
    extend: 'Common.view.base.List',
    xtype: 'userList',

    requires:[
        'Admin.view.user.Grid'
    ],

    items:[
        { xtype: 'userGrid'}
    ]

})