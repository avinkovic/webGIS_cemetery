/**
* WebGIS groblja
*
* @author    Adam Vinković
* @copyright (c) 2012, by Adam Vinković
* @date      27.05.2012
* @version   1.0
*/

Ext.BLANK_IMAGE_URL = 'ExtJS/resources/images/default/s.gif';

Ext.onReady(function() {

    //var groboviPanel = new Ext.Panel({
    //    region: 'center',
    //    collapsible: true,
    //    split: true,
    //    title: 'Popis grobova',
    //    width: 200,
    //    margins: '2 0 5 5',
    //    cmargins: '2 5 5 5',
    //    //items: groboviListingEditorGrid
    //    html: '<p>Tablica s popisom grobova</p>'
    //});


    //var ukopaniPanel = new Ext.Panel({
    //    title: 'Ukopane osobe',
    //    region: 'north',
    //    bodyStyle: 'padding:15px',
    //    split: true,
    //    height: 225,
    //    minSize: 150,
    //    maxSize: 300,
    //    items: ukopaniDv
    //    //html: '<p>Informacije o ukopanoj osobi</p>'
    //});
    //
    //var korisniciPanel = new Ext.Panel({
    //    title: 'Korisnici grobova',
    //    region: 'center',
    //    bodyStyle: 'padding:15px',
    //    items: korisniciDv
    //    //html: '<p>Informacije o korisniku groba</p>'
    //});
    
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [{
            xtype: 'box',
            id: 'header',
            region: 'north',
            html: '<h1> WebGIS groblja Velika Trapinska</h1>',
            height: 30,
        },{
            region: 'east',
            layout:'vbox',
            border: false,
            split: true,
            width: 250,
            margins: '2 5 5 0',
            layoutConfig : {
                align : 'stretch'
                },
            items: [{
                title: 'Ukopane osobe',
                layout: 'fit',
                //frame : true,
                flex: 1,
                items: ukopaniDv
                },
                {
                title: 'Korisnici grobova',
                layout: 'fit',
                //frame : true,
                flex: 1,
                items: korisniciDv
                }]
        },{
            region: 'center',
            layout: 'fit',
            border: false,
            margins: '2 0 5 0',
            items: mapPanel
        },{
            region: 'west',
            layout: 'fit',
            border: false,
            collapsible: true,
            split: true,
            title: 'Popis grobova',
            width: 200,
            margins: '2 0 5 5',
            cmargins: '2 5 5 5',
            items: groboviGrid
        }]
    });

});