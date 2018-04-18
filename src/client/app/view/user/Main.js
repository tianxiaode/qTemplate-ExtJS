Ext.define('Admin.view.user.Main', {
    extend: 'Ext.container.Container',
    xtype: 'userView',

    requires: [
        'Admin.view.user.MainModel',
        'Admin.view.user.MainController',
        'Admin.view.user.List',
        'Admin.view.user.Edit'
    ],

    controller: 'user',
    viewModel: 'user',

    layout: 'card',

    items: [
        {
            xtype: 'userList'
        },
        {
            xtype: 'userEdit'
        }
    ]


})
