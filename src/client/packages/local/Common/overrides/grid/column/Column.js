Ext.define('Common.overrides.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    entityName: null,
    autoText: false,


    initComponent: function() {
        var me = this,
            entity = me.entityName,
            dataIndex = me.dataIndex;
        if(me.autoText){
            me.text = I18N['Model'][entity][dataIndex];
        }
        

        // Preserve the scope to resolve a custom renderer. 
        // Subclasses (TreeColumn) may insist on scope being this. 
        if (!me.rendererScope) {
            me.rendererScope = me.scope;
        }
 
        if (me.header != null) {
            me.text = me.header;
            me.header = null;
        }
 
        if (me.cellWrap) {
            me.tdCls = (me.tdCls || '') + ' ' + Ext.baseCSSPrefix + 'wrap-cell';
        }
 
        // A group header; It contains items which are themselves Headers 
        if (me.columns != null) {
            me.isGroupHeader = true;
            me.ariaRole = 'presentation';
 
            //<debug> 
            if (me.dataIndex) {
                Ext.raise('Ext.grid.column.Column: Group header may not accept a dataIndex');
            }
            if ((me.width && me.width !== Ext.grid.header.Container.prototype.defaultWidth)) {
                Ext.raise('Ext.grid.column.Column: Group header does not support setting explicit widths. A group header either shrinkwraps its children, or must be flexed.');
            }
            //</debug> 
 
            // The headers become child items 
            me.items = me.columns;
            me.columns = null;
            me.cls = (me.cls||'') + ' ' + me.groupHeaderCls;
 
            // A group cannot be sorted, or resized - it shrinkwraps its children 
            me.sortable = me.resizable = false;
            me.align = 'center';
        } else {
            // Flexed Headers need to have a minWidth defined so that they can never be squeezed out of existence by the 
            // HeaderContainer's specialized Box layout, the ColumnLayout. The ColumnLayout's overridden calculateChildboxes 
            // method extends the available layout space to accommodate the "desiredWidth" of all the columns. 
            if (me.flex) {
                me.minWidth = me.minWidth || Ext.grid.plugin.HeaderResizer.prototype.minColWidth;
            }
        }
        me.addCls(Ext.baseCSSPrefix + 'column-header-align-' + me.align);
 
        // Set up the renderer types: 'renderer', 'editRenderer', and 'summaryRenderer' 
        me.setupRenderer();
        me.setupRenderer('edit');
        me.setupRenderer('summary');
 
        // Initialize as a HeaderContainer 
        me.callParent(arguments);
    }    
});