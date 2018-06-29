/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    stores: [
        // TODO: add global / shared stores here
        'NavigationTree'
    ],

    init: function(){
        Ext.util.Format.defaultValue = function (value, defaultValue) {
            return Ext.isEmpty(value) ? (Ext.isEmpty(defaultValue) ? '无': defaultValue) : value;
        }
        Ext.Ajax.on('beforerequest', this.onAjaxBeforeRequest, this);
        Ext.Ajax.cors = true; 
        SESSION.init().then(SESSION.processData);
    },    
    
    launch: function () {
        // TODO - Launch the application
    },

    onAppUpdate: function () {
        Ext.Msg.confirm(I18N.ApplicationUpdate, I18N.ApplicationUpdateMsg,
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    onAjaxBeforeRequest: function(conn , options , eOpts ){
        if(!options.headers) options.headers = {}
        Ext.apply( options.headers, HEADERS.getHeaders());
    },

    initSignalR: function(){
        var connection = new signalR.HubConnection(ROOTPATH +'/signalr');
        connection.start();               
    }
    
});
