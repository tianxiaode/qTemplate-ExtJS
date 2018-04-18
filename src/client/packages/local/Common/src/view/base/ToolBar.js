Ext.define('Common.view.base.ToolBar',{
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'baseViewToolbar',

    requires:[
        'Ext.toolbar.Separator',
        'Common.ux.form.field.Search'
    ],

    crudButtons:[
        { iconCls: "x-fa fa-file", ui: 'soft-green', tooltip: I18N.Add, handler: 'onMainAdd', bind:{ hidden: '{!allowCreate}' } },
        { iconCls: "x-fa fa-pencil", ui: 'soft-blue', tooltip: I18N.Edit, handler: 'onMainEdit', bind:{ disabled: '{disabledUpdate}', hidden: '{!allowUpdate}'} },
        { iconCls: "x-fa fa-trash", ui: 'soft-red', tooltip: I18N.Delete, handler: 'onMainDelete', bind: { disabled: '{disabledDelete}', hidden: '{!allowDelete}' } },
        { iconCls: "x-fa fa-refresh", ui: 'soft-cyan', tooltip: I18N.Refresh, handler: 'onMainRefresh', bind: { hidden: '{!displayRefreshButton}' } }
        //{ xtype: 'tbseparator', bind: { hidden: '{!showSeparator}' } }
        //{ xtype: 'uxsearchfield', fieldLabel: I18N.Search, labelWidth: 40, width: 260, bind: { store: '{mainStore}'  } }
        //{ xtype: 'tbtext', bind: I18N.Count, bind: { hidden: '{!ShowCountMessage}'} }
    ],

    displayQueryField: true,
    displayCountMessage: true,
    queryFiledWidth: 260,


    initComponent: function(){
        var me = this,
            userItems = me.items || [],
            items = me.crudButtons,
            queryFiledWidth = me.queryFiledWidth;
        if(me.displayQueryField){
            items.push('-');
            items.push({ xtype: 'uxsearchfield', fieldLabel: I18N.Search, labelWidth: 40, width: queryFiledWidth, bind: { store: '{mainStore}'  } });
        }
        items.concat(userItems);
        if(me.displayCountMessage){
            if(items.indexOf('->')<0) items.push('->');
            items.push({ xtype: 'tbtext', bind: I18N.Count})
        }
        me.items = items;

        me.callParent();
    }


})