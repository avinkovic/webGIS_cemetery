var groboviStore;         // this will be our datastore
var groboviCM;       // this will be our columnmodel
var groboviListingEditorGrid;
var groboviListingWindow;
 
Ext.onReady(function(){
    
    Ext.QuickTips.init();

    groboviStore = new Ext.data.Store({
        id: 'groboviStore',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({
                  url: 'data_proba.php',      // File to connect to
                  method: 'POST'
              }),
        baseParams:{task: "LISTING"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({   
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          idProperty: 'gid'
        },[ 
            {name: 'gid', type: 'int', mapping: 'gid'},
            {name: 'broj_groba', type: 'int', mapping: 'broj_groba'},
            {name: 'polje', type: 'string', mapping: 'polje'},
            {name: 'red', type: 'string', mapping: 'red'},
            {name: 'vrsta_grobnog_mjesta', type: 'string', mapping: 'vrsta_grobnog_mjesta'},
        ]),
        sortInfo:{field: 'broj_groba', direction: 'ASC'}
    });

    groboviCM = new Ext.grid.ColumnModel(
      [{
        header: 'gid',
        readOnly: true,
        dataIndex: 'gid', // this is where the mapped name is important!
        width: 50,
        hidden: true
      },{
        header: 'Br groba',
        dataIndex: 'broj_groba',
        width: 50,
        editor: new Ext.form.TextField({  // rules about editing
            allowBlank: false,
            maxLength: 4,
            maskRe: /[0-9]$/   // alphanumeric + spaces allowed
        })
      },{
        header: 'Polje',
        dataIndex: 'polje',
        width: 50,
        editor: new Ext.form.TextField({
          allowBlank: true,
          maxLength: 20,
          maskRe: /([a-zA-Z0-9\s]+)$/
          })
      },{
        header: 'Red',
        dataIndex: 'red',
        width: 50,
        hidden: true,
        editor: new Ext.form.TextField({
          allowBlank: true,
          maxLength: 20,
          maskRe: /([a-zA-Z0-9\s]+)$/
          })
      },{
        header: "Vrsta grobnog mjesta",
        dataIndex: 'vrsta_grobnog_mjesta',
        width: 100,
        editor: new Ext.form.ComboBox({
          typeAhead: true,
          triggerAction: 'all',
          store:new Ext.data.SimpleStore({
          fields:['naziv'],
          data: [['grob'],['grobnica'],['grob za čišćenje :)...'],['grobnica za...']]
                 }),
          mode: 'local',
          displayField: 'naziv',
          valueField: 'naziv',
          listClass: 'x-combo-list-small'
        })
      }]
    );
    //groboviCM.defaultSortable= false;

    groboviListingEditorGrid =  new Ext.grid.EditorGridPanel({
        id: 'GroboviListingEditorGrid',
        store: groboviStore,     // the datastore is defined here
        cm: groboviCM,      // the columnmodel is defined here
        enableColLock:false,
        clicksToEdit:1,
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
    });
 
    groboviListingWindow = new Ext.Window({
        id: 'GroboviListingWindow',
        title: 'Grobovi',
        closable:true,
        width:700,
        height:350,
        plain:true,
        layout: 'fit',
        items: groboviListingEditorGrid  // We'll just put the grid in for now...
    });
 
  //groboviStore.load();      // Load the data
  //groboviListingWindow.show();   // Display our window
 
});