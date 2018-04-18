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
