Ext.define('Common.util.Url', {
    alternateClassName: 'URI',
    singleton: true,

    config: {
    },

    constructor: function (config) {
        this.initConfig(config);
        this.callParent(arguments);
    },

    defaultActions: {
        create: 'create',
        read: 'getAll',
        update: 'update',
        destroy: 'delete',
        details: 'get'
    },

    actions: {},

    urlFormat: '{0}/{1}/{2}',
    defaultPath: '/api/services/app',
   

    get: function (controller, action, notDefaultPath) {
        var me = this;
        if (!Ext.isString(controller) || Ext.isEmpty(controller)) Ext.raise('非法的控制器名称');
        if (!Ext.isString(action) && !Ext.isNumber(action)) Ext.raise('非法的操作名称');
        return Ext.String.format(me.urlFormat, ROOTPATH + (notDefaultPath ? '' : me.defaultPath), controller, me.defaultActions[action] || me.actions[action] || action);
    },

    crud: {
        c: 'create',
        r: 'read',
        u: 'update',
        d: 'destroy'
    },

    getApi: function (controller, action) {
        var me = this, act, ln, i, result = {};
        action = Ext.isString(action) ? action.toLowerCase() : '';
        ln = action.length;
        for (i = 0; i < ln; i++) {
            act = me.crud[action[i]];
            if (act) {
                result[act] = me.get(controller, act);
            }
        }
        return result;
    },

    resources: {
        logo: 'resources/images/company-logo.png',
        holder: 'resources/images/holder.png'
    },

    getResource: function (res) {
        var me = this;
        return me.resources[res];
    }

});
