Ext.define('Admin.view.user.MainModel', {
    extend: 'Common.view.base.ViewModel',
    alias: 'viewmodel.user',

    requires: [
        'Admin.model.User'
    ],

    stores: {
        mainStore: {
            type: 'buffered',
            model: 'Admin.model.User',
            autoLoad: true,
            pageSize: 100,
            proxy: {
                type: 'format',
                url: URI.get('user', 'read')
            },
            sorters: {
                property: 'userName',
                direction: ''
            },
            listeners: {
                load: 'onMainStoreLoad'
            }
        }
    }
});
