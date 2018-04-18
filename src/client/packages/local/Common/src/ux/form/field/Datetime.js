Ext.define('Common.ux.form.field.Datetime', {
    extend:'Ext.form.field.Date',
    alias: 'widget.datetimefield',
    requires: ['Common.ux.picker.Datetime'],
    
    createPicker: function() {
        var me = this,
            format = Ext.String.format;
 
        // Create floating Picker BoundList. It will acquire a floatParent by looking up 
        // its ancestor hierarchy (Pickers use their pickerField property as an upward link) 
        // for a floating component. 
        return new Common.ux.picker.Datetime({
            id: me.id + '-picker',
            pickerField: me,
            floating: true,
            preventRefocus: true,
            hidden: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            ariaDisabledDatesText: me.ariaDisabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            ariaDisabledDaysText: me.ariaDisabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            ariaMinText: format(me.ariaMinText, me.formatDate(me.minValue, me.ariaFormat)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            ariaMaxText: format(me.ariaMaxText, me.formatDate(me.maxValue, me.ariaFormat)),
            listeners: {
                scope: me,
                select: me.onSelect,
                tabout: me.onTabOut
            },
            keyNavConfig: {
                esc: function() {
                    me.inputEl.focus();
                    me.collapse();
                }
            }
        });
    }
    
});