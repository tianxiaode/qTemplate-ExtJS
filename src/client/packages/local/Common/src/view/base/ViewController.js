Ext.define('Common.view.base.ViewController',{
    extend: 'Common.ux.app.BaseViewController',

    onMainStoreLoad: function (store, records, successful, operation, eOpts) {
        var me = this,
            refs = me.getReferences(),
            grid = refs.MainGrid;
        grid.getSelectionModel().deselectAll();
        me.getViewModel().set('count', store.getTotalCount());
    },

    onMainAdd: function(){
        var me = this,
            refs = me. getReferences(),
            view = me.getView(),
            editView =refs.MainEdit;
        editView.addRecord(true);
        view.setActiveItem(editView);
    },

    onMainEdit: function(){
        var me = this,
            refs = me.getReferences(),
            entity = me.entityName,            
            grid = refs.MainGrid,
            selection,
            editView =refs.MainEdit;
        selection = grid.getSelection()[0];
        if (!selection) {
            Ext.Msg.alert(I18N.DefaultMessageTitle, Ext.String.format(I18N.NoSelection, I18N[me.entityName], I18N.Edit));
            return;
        }
        me.getView().setActiveItem(editView);
        editView.loadRecord(selection);
        editView.editRecord(true);

    },

    onMainDelete: function() {
        var me = this,
            refs = me.getReferences(),
            entity = me.entityName,            
            grid = refs.MainGrid,
            msgField = me.deleteMessageField;
        if(!msgField) Ext.raise('No define deleteMessageField');
        me.doDelete(grid.getSelection(),
            URI.get(entity, 'delete'),
            msgField,
            I18N[entity],
            me.onMainDeleteSuccess);
    },

    deletedMessageTemplate : [
        '<div class="message-tips">',
        '<ul class="message-tips-list">',
        '<tpl for="deleted">', 
        '<li class="pointthree">{.:this.msg(0)}</li>',
        '</tpl>',
        '<tpl for="notDelete">', 
        '<li class="pointtwo">{.:this.msg(1)}</li>',
        '</tpl>',
        '</ul>',
        '</div>',
        {
            msg: function(v,index,entity){
                var fm = Ext.String.format;
                return fm(I18N.ValueList.deleteMessage[index], v);
            }
        }
    ],
    
    getDeletedMessageTemplate: function(){
        var me = this,
            template = me.deletedMessageTemplate;
        if(Ext.isArray(template)){
            template = me.deletedMessageTemplate = new Ext.XTemplate(template);
        }
        return template;
    },

    onMainDeleteSuccess: function(response, opts){
        var me = this,
            obj = Ext.decode(response.responseText),
            refs = me.getReferences(),
            entity = me.entityName,                        
            grid = refs.MainGrid,
            template = me.getDeletedMessageTemplate(),
            msg;
        Ext.Msg.hide();
        if (obj.success) {
            me.onMainRefresh();
            grid.getSelectionModel().deselectAll();
        }
        msg =template.apply(obj.result);
        TOAST.show(msg.replace(/##/g, I18N[entity]), null, 'b');

    },

    

    onMainRefresh: function() {        
        this.getStore('mainStore').load();        
    },

    onReturnMainView: function(){
        var me = this,
            refs = me.getReferences(),
            edit = refs.MainEdit;
        if(edit.hasNew){
            me.onMainRefresh();
        }
        me.getView().setActiveItem(0);        
    },
    
    onMainEditViewAfterSave: function(){
        this.onMainRefresh();
        this.onReturnMainView();
    }          
      
    
})