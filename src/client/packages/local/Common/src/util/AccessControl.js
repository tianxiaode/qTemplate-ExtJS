Ext.define('Common.util.AccessControl',{
    alternateClassName: 'ACL',
    singleton: true,

    permission: {},

    constructor: function (config) {
        this.initConfig(config);
        this.callParent(arguments);
    },

    setPermission: function(data){
        if(Ext.isObject(data)){
            Ext.apply(this.permission,data);
        }else{
            Ext.raise('权限数据不符合要求');
        }
    },

    getPermission:function(key){
        if(Ext.isEmpty(key)) return null;
        return this.permission[key];
    },

    checkPermission: function(key){
        if(Ext.isEmpty(key)) return false;
        return this.permission[key] == true;
    }

});