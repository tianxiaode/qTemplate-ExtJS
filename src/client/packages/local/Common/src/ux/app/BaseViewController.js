Ext.define('Common.ux.app.BaseViewController', {
    extend: 'Ext.app.ViewController',

    doHighLightRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this,
            proxy = store.getProxy(),
            query = proxy.extraParams['query'];
        return Ext.isEmpty(query) || Ext.isEmpty(value) ? value : value.replace(new RegExp('(' + query + ')', "gi"), '<span style="color:red;">$1</span>');
    },

    doColumnCheckChange: function (url, record, field) {
        var me = this,
            id = record.getId();
        me.send({
            url: url,
            record: record,
            jsonData: { id: id, field: field },
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                Ext.Msg.hide();
                if (obj.result) {
                    opts.record.commit();
                } else {
                    opts.record.reject();
                    TOAST.show(obj.msg, null, 'b');
                }
            }
        });
    },

    send: function (config, waitMsg) {
        var me = this,
            cfg = Ext.apply({
                scope: me,
                failure: function (response, opts) {
                    Ext.Msg.hide();
                    FAILED.ajax(response, opts);
                }
            }, config);
        if (!Ext.isEmpty(waitMsg)) Ext.Msg.wait(waitMsg);
        Ext.Ajax.request(cfg);
    },

    //messageList: '<div class="message-tips"><ul class="message-tips-list">{0}</ul></div>',
    //messageListItem: '<li class="{0}">{1}</li>',
    
    confirmDeleteMessageTemplate:[
        '<div class="message-tips">',
        '<ul class="message-tips-list">',
        '<tpl for=".">', 
        '<li class="pointthree">{.}</li>',
        '</tpl>',
        '</div>'
    ],

    getConfirmDeleteMessageTemplate: function(){
        var me = this,
            template = me.confirmDeleteMessageTemplate;
        if(Ext.isArray(template)){
            template = me.confirmDeleteMessageTemplate = new Ext.XTemplate(template);
        }
        return template;
    },
     
    doDelete: function (selections, url, msgField, objectName, success) {
        var me = this,
            fm = Ext.String.format,
            ln = selections.length,
            ids = [], contents = [], i, record;
        if (ln === 0) {
            Ext.Msg.alert(I18N.DefaultMessageTitle, fm(I18N.DeleteNoSelection, objectName));
            return;
        }
        for (i = 0; i < ln; i++) {
            record = selections[i];
            ids.push(record.getId());
            contents.push(record.get(msgField));
        }
        Ext.Msg.confirm(
        	I18N.DeleteConfirmMessageTitle, 
        	fm(I18N.DeleteConfirmMessage, objectName, me.getConfirmDeleteMessageTemplate().apply(contents)),
            function (btn) {
                if (btn === "yes") {
                    me.send(
	                    {
                            method: 'DELETE',
	                        url: url,
	                        params: { id: ids },
	                        success: success
	                    }, 
	                    I18N.DeleteWaitMsg
                    );
                }
            },
            me
        );

    }



});
