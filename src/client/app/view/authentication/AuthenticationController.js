Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    getToastEl: function(view){
        return view.xtype === 'login' ? view.down('panel').el : view.up('panel').el;
    },

    onLoginButton: function () {
        var me = this,
            view =me.getView(),
            f = me.getView().getForm();
        if (f.isValid()) {
            f.submit({
                jsonSubmit:true,
                url: URI.get('api/TokenAuth', 'Authenticate', true),
                waitMsg: I18N.LoginSubmitWaitMsg,
                waitTitle: I18N.LoginSubmitWaitTitle,
                success: function(form, action) {
                    var rememberMe = form.getValues().rememberClient || false,
                        obj = Ext.decode(action.response.responseText, true),
                        view = this.getView(),
                        tokenExpireDate,
                        msg = I18N.UnknownError;
                    if (obj.success) {
                        tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * obj.result.expireInSeconds)) : null
                        HEADERS.setCookies(HEADERS.authTokenCookieName, obj.result.accessToken, tokenExpireDate);
                        HEADERS.setCookies(HEADERS.encrptedAuthTokenName, obj.result.encryptedAccessToken, tokenExpireDate, LOCALPATH);
                        window.location.reload();
                    } else {
                        if (result.error && result.error.message)
                            msg = result.error.message + (result.error.details ? result.error.details : '');
                        TOAST.show(
                            msg,
                            this.getToastEl(view),
                            'bl'
                        );
                    }
                },
                failure: function(form, action) {
                    FAILED.form(form, action);
                },
                scope: me
            });
        }
    },

    onResetClick:  function() {
        var me = this,
            view = me.getView(),
            f = view.getForm();
        if (f.isValid()) {
            f.submit({
                url: URI.get('Profile', 'ChangePassword'),
                waitMsg: I18N.SaveWaitMsg,
                waitTitle: I18N.PasswordResetTitle,
                success: function (form, action) {
                    TOAST.show(I18N.PasswordResetSuccess, view.el, 'bl', function () {
                        HEADERS.setCookies(HEADERS.authTokenCookieName, null, null, null);
                        HEADERS.setCookies(HEADERS.encrptedAuthTokenName, null, null, LOCALPATH);
                        window.location.reload(); 
                
                    });
                },
                failure: function(form, action) {
                    FAILED.form(form, action);
                },
                scope: me
            });
        }
    },

    onReturnClick: function () {
        window.history.back();
    }


    
});