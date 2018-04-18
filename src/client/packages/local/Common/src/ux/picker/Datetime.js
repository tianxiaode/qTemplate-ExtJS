Ext.define('Common.ux.picker.Datetime', {
    extend: 'Ext.picker.Date',
    requires: [
        'Ext.form.field.Number'
    ],
    alias: 'widget.datetimepicker',
    
    renderTpl: [
        '<div id="{id}-innerEl" data-ref="innerEl" role="presentation">',
            '<div class="{baseCls}-header">',
                '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="presentation" title="{prevText}"></div>',
                '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
                '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="presentation" title="{nextText}"></div>',
            '</div>',
            '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" cellspacing="0" tabindex="0" aria-readonly="true">',
                '<thead>',
                    '<tr role="row">',
                        '<tpl for="dayNames">',
                            '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
                                '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
                            '</th>',
                        '</tpl>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                    '<tr role="row">',
                        '<tpl for="days">',
                            '{#:this.isEndOfWeek}',
                            '<td role="gridcell">',
                                '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
                            '</td>',
                        '</tpl>',
                    '</tr>',
                '</tbody>',
            '</table>',
			'<table role="grid" class="{baseCls}-footer" role="presentation" cellspacing="0" tabindex="0">',
				'<tr>',
					'<td style="width:102px;padding:5px">{%this.renderHourField(values, out)%}</td>',
					'<td style="width:104px;padding:6px">{%this.renderMinuteField(values, out)%}</td>',
					'<td style="width:102px;padding:5px">{%this.renderSecondField(values, out)%}</td>',
				'</tr>',
			'</table>',
            '<tpl if="showToday">',
                '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
            '</tpl>',
            '<div id="{id}-todayText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{todayText}.</div>',
            '<div id="{id}-ariaMinText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaMinText}.</div>',
            '<div id="{id}-ariaMaxText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaMaxText}.</div>',
            '<div id="{id}-ariaDisabledDaysText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaDisabledDaysText}.</div>',
            '<div id="{id}-ariaDisabledDatesText" class="' + Ext.baseCSSPrefix + 'hidden-clip">{ariaDisabledDatesText}.</div>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            },
			renderHourField: function (values, out) {
			    Ext.DomHelper.generateMarkup(values.$comp.hourField.getRenderTree(), out);
			},
			renderMinuteField: function (values, out) {
			    Ext.DomHelper.generateMarkup(values.$comp.minuteField.getRenderTree(), out);
			},
			renderSecondField: function (values, out) {
			    Ext.DomHelper.generateMarkup(values.$comp.secondField.getRenderTree(), out);
			}
        }
    ],

    initComponent: function() {
        var me = this,
            value = me.value;
            
        me.callParent();


        me.value = value || new Date();
    },

    getRefItems: function() {
        var results = [],
            monthBtn = this.monthBtn,
            todayBtn = this.todayBtn,
            hourField = this.hourField,
            minuteField = this.minuteField,
            secondField = this.secondField;

        if (monthBtn) {
            results.push(monthBtn);
        }

        if (todayBtn) {
            results.push(todayBtn);
        }

        if (hourField) {
            results.push(hourField);
        }

        if (minuteField) {
            results.push(minuteField);
        }

        if (secondField) {
            results.push(secondField);
        }
        
        return results;
    },
    
    numberFieldDefaults: {
        allowBlank: false,
        allowDecimals: false,
        width: 92,
        maxLength: 2,
        autoStripChars: true,
        ariaRole: 'presentation',
        enforceMaxLength: true
    },    

    beforeRender: function() {
        var me = this;



        me.hourField = new Ext.form.field.Number(Ext.apply({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            maxValue: 23,
            minValue: 0
        }, me.numberFieldDefaults));

        me.minuteField = new Ext.form.field.Number(Ext.apply({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            maxValue: 59,
            minValue: 0
        }, me.numberFieldDefaults));

        me.secondField = new Ext.form.field.Number(Ext.apply({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            maxValue: 59,
            minValue: 0
        }, me.numberFieldDefaults));
                

        me.callParent();
        

    },



    setValue: function(value) {
        // If passed a null value just pass in a new date object.        
        this.value = value || new Date();
        return this.update(this.value,true);
    },
    
    handleTabKey: function(e) {
        var me = this,
            t = me.getSelectedDate(me.activeDate),
            handler = me.handler,
            value ;

        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            value =  new Date(t.dateValue);
            me.setValue(new Date(value.getFullYear(),value.getMonth(), value.getDate(), me.hourField.getValue(), me.minuteField.getValue(), me.secondField.getValue() ));
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
            }
            me.onSelect();
        }
        else {
            me.fireEventArgs('tabout', [me]);
        }
    },

    selectToday: function() {
        var me = this,
            btn = me.todayBtn,
            handler = me.handler;

        if (btn && !btn.disabled) {
            me.setValue(new Date());
            me.fireEvent('select', me, me.value);
            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
            }
            me.onSelect();
        }
        return me;
    },
    

    fullUpdate: function(date) {
        var me = this;
        	
        me.hourField.setValue(date.getHours());
        me.minuteField.setValue(date.getMinutes());
        me.secondField.setValue(date.getSeconds());
        me.callParent(arguments);
    },
    
    onOkClick: function(picker, value) {
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, me.getActive().getDate(),me.hourField.getValue(), me.minuteField.getValue(), me.secondField.getValue());
 
        if (date.getMonth() !== month) {
            date = Ext.Date.getLastDateOfMonth(new Date(year, month, 1,me.hourField.getValue(), me.minuteField.getValue(), me.secondField.getValue()));
        }
        me.setValue(date);
        me.hideMonthPicker();
    },    

    handleDateClick: function(e, t) {
        var me = this,
            handler = me.handler,
            value = new Date(t.dateValue);
        e.stopEvent();
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            me.setValue(new Date(value.getFullYear(),value.getMonth(), value.getDate(), me.hourField.getValue(), me.minuteField.getValue(), me.secondField.getValue() ));
            me.fireEvent('select', me, me.value);
            
            if (handler) {
                Ext.callback(handler, me.scope, [me, me.value], null, me, me);
            }
            
            me.onSelect();
        }
    },
    
    getSelectedDate: function (date) {
        var me = this,
            t = Ext.Date.clearTime(date,true).getTime(),
            cells = me.cells,
            cls = me.selectedCls,
            cellItems = cells.elements,
            cLen = cellItems.length,
            cell, c;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = cellItems[c].firstChild;
            if (cell.dateValue === t) {
                return cell;
            }
        }
        return null;
    },    
    
    selectedUpdate: function(date) {
        var me        = this,
            t         = Ext.Date.clearTime(date,true).getTime(),
            cells     = me.cells,
            cls       = me.selectedCls,
            c,
            cLen      = cells.getCount(),
            cell;
        
        me.eventEl.dom.setAttribute('aria-busy', 'true');
        cell = me.activeCell;
        
        if (cell) {
            Ext.fly(cell).removeCls(cls);
            cell.setAttribute('aria-selected', false);
        }

        for (c = 0; c < cLen; c++) {
            cell = cells.item(c);

            if (me.textNodes[c].dateValue === t) {
                me.activeCell = cell.dom;
                me.eventEl.dom.setAttribute('aria-activedescendant', cell.dom.id);
                cell.dom.setAttribute('aria-selected', true);
                cell.addCls(cls);
                me.fireEvent('highlightitem', me, cell);
                break;
            }
        }
        
        me.eventEl.dom.removeAttribute('aria-busy');
    },
    

    doDestroy: function() {
        var me = this;

        if (me.rendered) {
            Ext.destroy(
                me.hourField,
                me.minuteField,
                me.secondField
            );
        }
        
        me.callParent(arguments);
    },
    

    onMouseDown: function(e) {
        var cmp = Ext.Component.fromElement(e.target);
        if (cmp.isFormField) return;
        e.preventDefault();
    },    

    privates: {

        finishRenderChildren: function () {
            var me = this;

            me.callParent(arguments);
		    me.hourField.finishRender();
		    me.minuteField.finishRender();
		    me.secondField.finishRender();
        }
        
    }
});
