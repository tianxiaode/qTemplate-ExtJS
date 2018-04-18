Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    fields: [{
        name: 'text'
    }],

    root: {
        expanded: true,
        children: [
            {
                text: '空白',
                viewType: 'pageblank',
                leaf: true,
                visible: false
            },
            {
                text: '500页面',
                viewType: 'page500',
                leaf: true,
                visible: false
            },
            {
                text: '登录',
                viewType: 'login',
                leaf: true,
                visible: false
            },
            {
                text: '重置密码',
                viewType: 'passwordreset',
                leaf: true,
                visible: false
            },
            {
                text: '用户管理',
                viewType: 'userView',
                leaf: true
            }
        ]
    }
});
