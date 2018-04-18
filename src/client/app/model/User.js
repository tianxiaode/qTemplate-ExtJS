Ext.define('Admin.model.User', {
    extend: 'Admin.model.Base',

    fields: [
        { name: 'userName', defaultValue: '' },
        { name: 'name', defaultValue: '' },
        { name: 'surname', defaultValue: '' },
        { name: 'emailAddress', defaultValue: '' },
        { name: 'fullName', defaultValue: '' },
        { name: 'creationTime', type: 'date', dateFormat: I18N.DateTimeIsoFormat },
        { name: 'lastLoginTime', type: 'date', dateFormat: I18N.DateTimeIsoFormat },
        { name: 'isActive', type: 'bool', defaultValue: true },
        { name: 'roleNames'}
    ]
        
})