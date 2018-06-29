Ext.define('Admin.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        currentView: null,
        UserName: null
    },

    formulas:{
        lang: function(){
            var locale  =location.href.match(/lang=([\w-]+)/),
            lang = (locale && locale[1]) || 'zh_cn';
            return lang.toLowerCase();
        }
    }

});
