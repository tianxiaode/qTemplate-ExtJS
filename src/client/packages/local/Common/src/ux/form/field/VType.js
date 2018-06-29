Ext.define("Common.ux.form.field.VTypes", {
    override: "Ext.form.field.VTypes",

    daterange: function (val, field) {
        var date = field.parseDate(val);

        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up(field.parentXtype).down('#' + field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up(field.parentXtype).down('#' + field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    },

    daterangeText: I18N.DaterangeText,

    compareText: I18N.CompareText,
    compare: function (val, field) {
        if (field.initialField) {
            var pwd = field.up('form').down('#' + field.initialField);
            return (val == pwd.getValue());
        }else{
            Ext.raise('No define initialField');
        }
        return true;
    },

    passwordText: I18N.PasswordText,

    password: function(val, field){
        var isEmpty = Ext.isEmpty(val);
        if(isEmpty) return true;
        if(field.requireNonLetterOrDigit && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(val)) return false;
        if(field.requireDigit && ! /[\d]+/.test(val)) return false;
        if(field.requireLowercase && ! /[a-z]+/.test(val)) return false;
        if(field.requireUppercase && ! /[A-Z]+/.test(val)) return false;
        return true;
    }
});
