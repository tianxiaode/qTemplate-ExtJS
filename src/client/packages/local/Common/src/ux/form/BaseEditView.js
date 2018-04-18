Ext.define('Common.ux.form.BaseEditView',{
    extend: 'Common.ux.form.BaseForm',

    requires: [
        'Common.ux.button.SaveAndNew',
        'Ext.layout.container.Column'
    ],

    defaultButton: 'saveandnewbutton',

    header: {
        titlePosition: 1,
        items: [
            {
                xtype: 'button',
                weight: 0,
                iconCls: 'x-fa fa-arrow-left',
                tooltip: I18N.Return,
                ui: 'action',
                margin: '0 10px 0 0',
                handler: 'onReturnMainView'
            }, {
                xtype: 'tbtext',
                //weight: 2,
                html: I18N.RequiredTips
            }
        ]
    },
    
    ui: 'light',
    cls: 'pages-faq-container shadow',
    titleCmp: 'self',
    padding:20,
    bodyPadding: 15,

    layout: 'column',
    defaults:{
        autoLabel: true,
        labelSeparator:'：',
        labelWidth: 80,
        cls: 'auth-textbox',
        columnWidth: 0.5,
        padding: 5
    },

    bbar: {
        ui: 'footer',
        layout: { pack: 'center' },
        items:[
            {
                width: 120, disabled: true, formBind: true, ui: 'blue',   saveMenuSaved: 'custom',
                xtype: 'saveandnewbutton'
                 //saveMenuStateId: 'usereditview-savemenu', saveAndNewMenuStateId: 'usereditview-saveandnewmenu'
            },
            { text: I18N.Reset, width: 120, itemId: 'resetButton', ui: 'soft-purple' }
        ]
    },

    listeners:{
        aftersaved: 'onMainEditViewAfterSave'
    }    
    
})