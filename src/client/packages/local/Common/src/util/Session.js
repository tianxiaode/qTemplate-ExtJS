Ext.define('Common.util.Session',{
    alternateClassName: 'SESSION',
    singleton: true,

    requires:[
        'Common.util.Failed'
    ],

    init: function(){
        return new Ext.Promise(function (resolve, reject) {
            Ext.Ajax.request({
                url: URI.get('Session', 'GetCurrentLoginInformations'),   
                success: function (response) {
                    resolve(response.responseText);
                },   
                failure: function (response) {
                    reject(response.status);
                }
            });
        });
    },

    processData: function(content){
        var obj = Ext.decode(content, true);
        if(obj.success){
            Ext.apply(CFG, obj.result);
        }
    }
});