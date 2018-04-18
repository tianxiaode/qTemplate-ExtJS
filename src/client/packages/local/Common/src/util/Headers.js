Ext.define('Common.util.Headers',{
    alternateClassName: 'HEADERS',
    singleton: true,

    requires:[
        'Ext.util.Cookies'
    ],

    authTokenCookieName : 'Abp.AuthToken',
    authTokenHeaderName : 'Authorization',
    tenantIdCookieName : 'Abp.TenantId',
    tenantIdHeaderName: 'Abp.TenantId',
    cultureTCookieName: 'Abp.Localization.CultureName',
    cultureHeaderName: '.AspNetCore.Culture',
    encrptedAuthTokenName: 'enc_auth_token',

    getAuthToken: function(){
        return Ext.util.Cookies.get(this.authTokenCookieName);
    },

    getTenantId: function(){
        return Ext.util.Cookies.get(this.tenantIdCookieName);
    },


    getCulture: function(){
        return Ext.util.Cookies.get(this.cultureTCookieName);
    },

    setCookies: function(name, value , expires , path  ){
        Ext.util.Cookies.set(name, value , expires , path );
    },


    getHeaders: function(){
        var me = this;
        return {
            'Authorization' : 'Bearer ' +  me.getAuthToken(),
            'Abp.TenantId' : me.getTenantId(),
            '.AspNetCore.Culture' : me.getCulture()
        }
    }

    
});