var groboviCM;
var groboviGrid;

//groboviStore = new Ext.data.Store({
//    id: 'groboviStore',
//    autoLoad: true,
//    proxy: new Ext.data.HttpProxy({
//              url: 'data_proba.php',      // File to connect to
//              method: 'POST'
//          }),
//          baseParams:{task: "LISTING"}, // this parameter asks for listing
//    reader: new Ext.data.JsonReader({   
//                // we tell the datastore where to get his data from
//      root: 'results',
//      totalProperty: 'total',
//      idProperty: 'gid'
//    },[ 
//        {name: 'gid', type: 'int', mapping: 'gid'},
//        {name: 'broj_groba', type: 'int', mapping: 'broj_groba'},
//        {name: 'polje', type: 'string', mapping: 'polje'},
//        {name: 'red', type: 'string', mapping: 'red'},
//        {name: 'vrsta_grobnog_mjesta', type: 'string', mapping: 'vrsta_grobnog_mjesta'},
//    ]),
//      sortInfo:{field: 'broj_groba', direction: 'ASC'}
//});

groboviCM = new Ext.grid.ColumnModel(
    [{
      header: 'gid',
      readOnly: true,
      dataIndex: 'gid', // this is where the mapped name is important!
      width: 50,
      hidden: true
    },{
      header: 'Br groba',
      dataIndex: 'id',
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
      width: 80,
      editor: new Ext.form.ComboBox({
        editable: false,
        triggerAction: 'all',
        store:new Ext.data.SimpleStore({
          fields:['naziv'],
          data: [['grob'],['grobnica'],['grob za...'],['grobnica za...']]
        }),
        mode: 'local',
        displayField: 'naziv',
        valueField: 'naziv',
        listClass: 'x-combo-list-small'
      })
    }]
    );

groboviGrid =  new Ext.grid.GridPanel({
    id: 'groboviGrid',
    store: wfsStore,     // the datastore is defined here
    cm: groboviCM,      // the columnmodel is defined here
    enableColLock: false,
    //clicksToEdit: 2,
    //selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
    selModel: new GeoExt.grid.FeatureSelectionModel({
        autoPanMapOnSelection: true
    }),
    listeners: {
        rowclick: function(grid, rowIndex) {
                    var record = grid.getStore().getAt(rowIndex);
                    if (record) {
                        Ext.StoreMgr.get('ukopaniDvStore').load({
                        params: {
                            broj_groba: record.get('id')
                        }
                        });
                        //Ext.StoreMgr.get('korisniciDv').load({
                        //params: {
                        //    broj_groba: record.get('id')
                        //}
                        //});
                    }
                  }         
    }
});