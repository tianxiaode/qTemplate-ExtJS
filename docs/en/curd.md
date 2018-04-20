# Using curd Templates

The base class for creating curd templates is defined under the  `src\client\packages\local\common\src\view\base` folder, and inheriting from these classes makes it easy to extend the required view with CRUD functionality.

## View Model
```javascript
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
```

This is the view model for the user view, in which the primary store must be defined as `mainstore`. By default, all views will use `bufferstore` to avoid using the paging toolbar. The main problem with `bufferstore` is that you cannot add data directly to the store, and you must refresh the store to see the latest data after the new data is added, depending on the sort. If you want users to be able to see the latest data, modify the `Onmaineditviewaftersave` method in `Src\client\packages\local\common\src\view\base\viewcontroller.js` , modify how the store is sorted before calling the `Onmainrefresh` method.
The `Onmaineditviewaftersave` method fires when new data is added and returned to the list view.

If you want to control the status of add, edit, and delete buttons based on permissions, you can redefine the following objects in the model's `formulas`:
* `allowcreate`: Whether to show the `add` button, the default value is `true`
* `allowUpdate`: Display `edit` button, default value is `true`
* `allowDelete`: `Delete` button is displayed, the default value is `true`
* `disabledupdate`: `Edit` button is disabled, the default value is determined by the value of the data object `selection`
* `disableddelete`: Disable `Delete` button, default value is determined by the value of the data object `selection`

Do not use `count` and `selection` as object names when defining data objects in the data model, because `count` is bound to the total number of records in the primary store and `selection` has been bound to a selection record for the grid.

## View Controller
```javascript
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
```

The operation code for the curd operation has been defined in ` Common.view.base.ViewController`, so there is no need to redefine it, the simplest case being the primary definition of `entityname` and `deletemessagefield` These two property values are OK. `entityName` is primarily used to get localized information.`deletemessagefield` is used to specify which field to display in the delete confirmation dialog box. Method `OnUserCheckChange` is used to implement the value modification of the composite option in the grid. The future version should be merged into `Common.view.base.ViewController`.

## View
```javascript
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
```
Because the rest of the view is not the same except for the `layout` configuration item, there is no base class defined for it, and it is simply extended from the container.

## List View
```javascript
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
```
The main function of the list is to load the grid and secure the grid within the viewable area.

## Grid
```javascript
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
```
The grid defaults to the `checkboxmodel` and binds the store to `mainstore`, binding the selection to the data object `selection`.

If you want to change these things, you can modify the base class yourself. Because some of the basic configurations of the grid are already defined in the base class, you only need to define the columns here. In the definition column, `entityname` in `defaults` is used for columns to automatically get column headers, and `autoText` indicates that the column wants fields to get the column headers from the localized file.

If a column requires a custom column header, you can set `autoText` to false in the column change.

The role of `doHighlightRenderer` is to highlight the query value in the field when querying. If you don't need to add a custom button to the toolbar, use the default toolbar `Common.view.base.ToolBar`. If you need to add custom components, you can derive the toolbar from `Common.view.base.ToolBar` and write the custom component in the `items` configuration item, and the action for the component is defined in the view controller. After you've written your custom toolbar, remember to change the default toolbar to a custom toolbar in the grid.

## Edit View
```javascript
Ext.define('Admin.view.user.Edit', {
    extend: 'Common.view.base.Edit',
    xtype: 'userEdit',

    requires: [
        'Admin.model.User'
    ],
    
    entityName: 'User',
    baseModel: 'Admin.model.User',

    items:[
        { xtype: 'hidden', name:'id'},
        { name: 'userName', allowBlank: false , maxLength:32, minLength: 4},
        { name: 'name',maxLength:32, allowBlank: false},
        { name: 'surname',maxLength:32, allowBlank: false},
        { name: 'emailAddress',vtyep: 'email',maxLength: 256, allowBlank: false},
        { 
            name: 'password', inputType: 'password' ,maxLength: 32,  bind: { hidden: '{isEdit}'},
            afterLabelTextTpl: I18N.RequiredTpl,
            validator:function(){
                var f = this.up('form'),
                    isEdit = f.getViewModel().get('isEdit');
                if(!isEdit && Ext.isEmpty(this.getValue())){
                    return I18N.Required;
                }
                return true;
            }
        },
        { xtype: 'checkbox', name: 'isActive' , inputValue: true, uncheckedValue: false, showFieldLabel: true},
        { 
            xtype: 'tagfield', name: 'roleNames',  valueField: 'id', 
            store: { data: I18N.ValueList.roles}
        }
    ]


});

```

Because the basic functionality of the form is encapsulated, it is only necessary to specify the value of `entityname` and `baseModel` in the edit view, and to define the form component.

`entityName` is used to automatically get the label for the field, and `baseModel` is used to specify the model for the form.

When the field defines `allowblank` as `false`, it automatically adds a red asterisk mark after the label to indicate that it's a required field.

By default, a check or a single election displays the label as a `boxlable`, and if you need to display it as a label, you need to set `showfieldlabel` to true.
If the field wants to customize the label and does not need to be automatically fetched, set `autoLabel` to `false` in the field definition.

## Localized files
To implement a field or column header to automatically obtain localized text, you need to define localized information in model, such as the following code:
```javascript
        Model: {
            User: {
                userName: '用户名',
                surname: '姓',
                name: '名字',
                roleNames: '角色',
                emailAddress: '电子邮件',
                creationTime: '创建日期',
                lastLoginTime: '最后登录时间',
                fullName: '全名',
                isActive: '已激活',
                password: '密码'
            }
        },

```

The code above is the localized text required by the user view. Refer to the `src\client\app\locale\zh_cn.js` file specifically.