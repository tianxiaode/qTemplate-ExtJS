Ext.define('Common.overrides.form.field.Base', {
    override: 'Ext.form.field.Base',

    entityName: null,
    showFieldLabel: false,
    autoLabel: false,

    initComponent: function () {
        var me = this,
            form,
            entity,
            name = me.name,
            label;
        if (me.autoLabel) {
            form = me.up('form');
            entity = me.entityName || ( form ? form.entityName : null );
            if(!entity) Ext.raise('No define entityName');
            label = I18N['Model'][entity][name];
            if((me.isCheckbox || me.isRadio) && !me.showFieldLabel){
                me.boxLabel = label;
            }else{
                me.fieldLabel = label;
            }
        }
        if(me.allowBlank === false){
            me.afterLabelTextTpl = '<span style="color:red;font-weight:bold">*</span>';
        }
        me.callParent();

        me.subTplData = me.subTplData || {};

        // Init mixins 
        me.initLabelable();
        me.initField();
        me.initDefaultName();

        // Add to protoEl before render 
        if (me.readOnly) {
            me.addCls(me.readOnlyCls);
        }

        me.addCls(Ext.baseCSSPrefix + 'form-type-' + me.inputType);

        // formatText is superseded by ariaHelp but we still apply it for compatibility 
        if (me.format && me.formatText && !me.ariaHelp) {
            me.ariaHelp = Ext.String.format(me.formatText, me.format);
        }
    }

});
