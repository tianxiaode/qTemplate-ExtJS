# 使用CRUD模版

在`src\client\packages\local\Common\src\view\base`文件夹下定义了创建CURD模版的基类，从这些类继承就可以很容易的扩展出所需的带CRUD功能的视图。


## 视图模型
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

以上是用户视图的视图模型，在代码中，必须将主存储（store）定义为`mainStore`。默认情况下，所有视图都将使用缓存存储，避免使用分页工具栏。使用缓存存储的主要问题是不能直接在存储中添加数据，在新增数据后必须刷新存储才有可能看到最新数据，这个还要根据排序来决定。如果希望用户能看到最新数据，可修改`src\client\packages\local\Common\src\view\base\ViewController.js`中的`onMainEditViewAfterSave`方法，在调用`onMainRefresh`方法前，修改存储的排序方式。`onMainEditViewAfterSave`方法会在新增数据并返回列表视图时触发。

如果要根据权限控制新增、编辑和删除按钮的状态，可在模型的`formulas`中重新定义以下对象：
* allowCreate: 是否显示新增按钮，默认值为true
* allowUpdate：是否显示编辑按钮，默认值为true
* allowDelete：是否显示删除按钮，默认值为true
* disabledUpdate：是否禁用编辑按钮，默认值为由数据对象`selection`的值来决定
* disabledDelete：是否禁用删除按钮，默认值为由数据对象`selection`的值来决定

在数据模型定义数据对象时，请不要使用`count`和`selection`来作为对象名称，因为`count`已绑定为主存储的记录总数，`selection`已绑定为网格（Grid）的选择记录。

## 视图控制器
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

在`Common.view.base.ViewController`中已经定义好CURD操作的操作代码，因而不需要重新定义，最简单情况是主要定义`entityName`和`deleteMessageField`这两个属性值就行了。`entityName`主要用来获取本地化信息。`deleteMessageField`则用来指定在删除确认对话框中要显示哪个字段的信息。

方法`onUserCheckChange`是用来实现网格中复合选项的值修改的。在未来版本应该可以合并在`Common.view.base.ViewController`中。

## 视图
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
由于视图中除了`layout`配置项是相同的外，其余各项都是不相同的，因而没有为它定义基类，直接从容器扩展就行了。

## 列表
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

列表的主要作用是装载网格并将网格固定在可视区域之内。

## 网格
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

网格默认使用了复选选择模型，并将存储绑定为`mainStore`,将选择绑定到数据对象`selection`。如果想更换这些东西，可自行修改基类。

由于网格的一些基本配置在基类中已经定义好了，因而在这里只需要定义列。在定义列中，`defaults`中的`entityName`用于列自动获取列标题，`autoText`则表示列要字段从本地化文件中获取列标题。如果某列需要自定义列标题，可在改列将`autoText`设置为false。

`doHighLightRenderer`的作用是在查询时高亮显示字段中的查询值。

如果不需要在工具栏中添加自定义按钮，可使用默认的工具栏`Common.view.base.ToolBar`。如果需要添加自定义组件，可以从`Common.view.base.ToolBar`派生工具栏，并将自定义组件写在`items`配置项中，而组件所对应的操作，在视图控制器中定义就行了。写好自定义的工具栏后，记得在网格中将默认工具栏修改为自定义工具栏。

## 编辑视图
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

由于表单的基本功能已封装好，因而在编辑视图中只需要指定`entityName`和`baseModel`的值，并定义表单组件就行了。`entityName`用于字段自动获取标签，`baseModel`则用来指定表单所对应的模型。

当字段定义`allowBlank`为`false`的时候，会自动在标签后添加红色的*号标记，以表示该字段为必须字段。

默认情况下，复选或单选会将标签作为boxLable显示，如果需要显示为标签，需要将`showFieldLabel`设置为true。

如果字段想自定义标签，不需要自动获取，可在字段定义中将`autoLabel`设置为`false`。


## 字段和列标题的本地化
要实现字段或列标题自动获取本地化文本，需要将信息定义在本地化文件的Model内，如以下代码：```javascript
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
以上代码就是用户视图所需的本地化文本。具体可参考`src\client\app\locale\zh_CN.js`文件。
