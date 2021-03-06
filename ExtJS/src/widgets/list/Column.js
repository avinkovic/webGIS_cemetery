/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
/**
 * @class Ext.list.Column
 * <p>This class encapsulates column configuration data to be used in the initialization of a
 * {@link Ext.list.ListView ListView}.</p>
 * <p>While subclasses are provided to render data in different ways, this class renders a passed
 * data field unchanged and is usually used for textual columns.</p>
 */
Ext.list.Column = Ext.extend(Object, {
    /**
     * @private
     * @cfg {Boolean} isColumn
     * Used by ListView constructor method to avoid reprocessing a Column
     * if <code>isColumn</code> is not set ListView will recreate a new Ext.list.Column
     * Defaults to true.
     */
    isColumn: true,
    
    /**
     * @cfg {String} align
     * Set the CSS text-align property of the column. Defaults to <tt>'left'</tt>.
     */        
    align: 'left',
    /**
     * @cfg {String} header Optional. The header text to be used as innerHTML
     * (html tags are accepted) to display in the ListView.  <b>Note</b>: to
     * have a clickable header with no text displayed use <tt>'&#160;'</tt>.
     */    
    header: '',
    
    /**
     * @cfg {Number} width Optional. Percentage of the container width
     * this column should be allocated.  Columns that have no width specified will be
     * allocated with an equal percentage to fill 100% of the container width.  To easily take
     * advantage of the full container width, leave the width of at least one column undefined.
     * Note that if you do not want to take up the full width of the container, the width of
     * every column needs to be explicitly defined.
     */    
    width: null,

    /**
     * @cfg {String} cls Optional. This option can be used to add a CSS class to the cell of each
     * row for this column.
     */
    cls: '',
    
    /**
     * @cfg {String} tpl Optional. Specify a string to pass as the
     * configuration string for {@link Ext.XTemplate}.  By default an {@link Ext.XTemplate}
     * will be implicitly created using the <tt>dataIndex</tt>.
     */

    /**
     * @cfg {String} dataIndex <p><b>Required</b>. The name of the field in the
     * ListViews's {@link Ext.data.Store}'s {@link Ext.data.Record} definition from
     * which to draw the column's value.</p>
     */
    
    constructor : function(c){
        if(!c.tpl){
            c.tpl = new Ext.XTemplate('{' + c.dataIndex + '}');
        }
        else if(Ext.isString(c.tpl)){
            c.tpl = new Ext.XTemplate(c.tpl);
        }
        
        Ext.apply(this, c);
    }
});

Ext.reg('lvcolumn', Ext.list.Column);

/**
 * @class Ext.list.NumberColumn
 * @extends Ext.list.Column
 * <p>A Column definition class which renders a numeric data field according to a {@link #format} string.  See the
 * {@link Ext.list.Column#xtype xtype} config option of {@link Ext.list.Column} for more details.</p>
 */
Ext.list.NumberColumn = Ext.extend(Ext.list.Column, {
    /**
     * @cfg {String} format
     * A formatting string as used by {@link Ext.util.Format#number} to format a numeric value for this Column
     * (defaults to <tt>'0,000.00'</tt>).
     */    
    format: '0,000.00',
    
    constructor : function(c) {
        c.tpl = c.tpl || new Ext.XTemplate('{' + c.dataIndex + ':number("' + (c.format || this.format) + '")}');       
        Ext.list.NumberColumn.superclass.constructor.call(this, c);
    }
});

Ext.reg('lvnumbercolumn', Ext.list.NumberColumn);

/**
 * @class Ext.list.DateColumn
 * @extends Ext.list.Column
 * <p>A Column definition class which renders a passed date according to the default locale, or a configured
 * {@link #format}. See the {@link Ext.list.Column#xtype xtype} config option of {@link Ext.list.Column}
 * for more details.</p>
 */
Ext.list.DateColumn = Ext.extend(Ext.list.Column, {
    format: 'm/d/Y',
    constructor : function(c) {
        c.tpl = c.tpl || new Ext.XTemplate('{' + c.dataIndex + ':date("' + (c.format || this.format) + '")}');      
        Ext.list.DateColumn.superclass.constructor.call(this, c);
    }
});
Ext.reg('lvdatecolumn', Ext.list.DateColumn);

/**
 * @class Ext.list.BooleanColumn
 * @extends Ext.list.Column
 * <p>A Column definition class which renders boolean data fields.  See the {@link Ext.list.Column#xtype xtype}
 * config option of {@link Ext.list.Column} for more details.</p>
 */
Ext.list.BooleanColumn = Ext.extend(Ext.list.Column, {
    /**
     * @cfg {String} trueText
     * The string returned by the renderer when the column value is not falsey (defaults to <tt>'true'</tt>).
     */
    trueText: 'true',
    /**
     * @cfg {String} falseText
     * The string returned by the renderer when the column value is falsey (but not undefined) (defaults to
     * <tt>'false'</tt>).
     */
    falseText: 'false',
    /**
     * @cfg {String} undefinedText
     * The string returned by the renderer when the column value is undefined (defaults to <tt>'&#160;'</tt>).
     */
    undefinedText: '&#160;',
    
    constructor : function(c) {
        c.tpl = c.tpl || new Ext.XTemplate('{' + c.dataIndex + ':this.format}');
        
        var t = this.trueText, f = this.falseText, u = this.undefinedText;
        c.tpl.format = function(v){
            if(v === undefined){
                return u;
            }
            if(!v || v === 'false'){
                return f;
            }
            return t;
        };
        
        Ext.list.DateColumn.superclass.constructor.call(this, c);
    }
});

Ext.reg('lvbooleancolumn', Ext.list.BooleanColumn);