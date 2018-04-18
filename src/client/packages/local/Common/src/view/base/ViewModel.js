Ext.define('Common.view.base.ViewModel', {
    extend: 'Ext.app.ViewModel',

    requires:[
        'Common.ux.data.proxy.Format'
    ],
    
    data: {
        count: 0,
        selection: null
    },

    formulas:{
        allowCreate: function(get){
            return true;
        },
        allowUpdate: function(get){
            return true;
        },
        allowDelete: function(get){
            return true;
        },
        disabledUpdate: function(get){
            return !get('selection');
        },
        disabledDelete: function(get){
            return !get('selection');
        }        
    }

});
