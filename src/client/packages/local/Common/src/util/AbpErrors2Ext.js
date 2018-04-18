Ext.define('Common.util.AbpErrors2Ext',{
    alternateClassName: 'Abp2Ext',

    statics:{
        convertErrors: function(errors){
            var result = {},
                ln = errors.length,
                i = 0,
                error, j, jn, fields, field;
            for (i; i < ln; i++) {
                error = errors[i];
                fields = error.members;
                jn = fields.length;
                for (j = 0; j < jn; j++) {
                    field = result[fields[j]];
                    if (!field) field = result[fields[j]] = [];
                    field.push(error.message);
                }
            }
            return result;            
        }
    }
})