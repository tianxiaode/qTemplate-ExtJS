Ext.define('Common.overrides.form.action.Submit', {
    override: "Ext.form.action.Submit",

    jsonSubmit: true,

    onFailure: function(response) {
        var me = this,
            form = me.form,
            formActive = form && !form.destroying && !form.destroyed,
            result;

        me.response = response;
        //this.failureType = Ext.form.action.Action.CONNECT_FAILURE;

        if (response.status === 400) {
            result = me.processResponse(response);
            if (result.error.validationErrors) {
                me.form.markInvalid(me.processValidationErrors(result.error.validationErrors));
                me.failureType = "validationErrors";
            }
        } else {
            me.failureType = Ext.form.Action.CONNECT_FAILURE;
        }


        if (formActive) {
            form.afterAction(me, false);
        }
    },

    processValidationErrors: function(errors) {
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
                field.push(error['message']);
            }
        }
        return result;
    }


});