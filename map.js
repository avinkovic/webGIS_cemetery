var map;
var wmsLayer;
var wfsLayer;
var selectControl;
var mapPanel;
var wfsStore;


OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

    var hdks6 = new OpenLayers.Projection("EPSG:900901");

    var google_mercator = new OpenLayers.Projection("EPSG:900913");

    var wgs84 = new OpenLayers.Projection("EPSG:4326");

    map = new OpenLayers.Map({
        projection: google_mercator,
        displayProjection: wgs84,
        units: "m",
        numZoomLevels: 8,
        maxResolution: 1.1,   
        maxExtent: new OpenLayers.Bounds(
            //6459650,5065950,
            //6460800,5066950
            1945458, 5738254,
            1947094, 5739699
        ),
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.KeyboardDefaults(),
            new OpenLayers.Control.Scale(),
            new OpenLayers.Control.ScaleLine(),
            new OpenLayers.Control.LayerSwitcher(),
        ]
    });

    var openstreetmap = new OpenLayers.Layer.OSM();
    
    //var google_streets = new OpenLayers.Layer.Google(
    //    "Google Streets",
    //    {numZoomLevels: 20, visibility: false}
    //);
    
    var google_satellite = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22, visibility: false}
    );

    wmsLayer = new OpenLayers.Layer.WMS(
        "DOF groblja",
        "http://31.147.204.28:8080/geoserver/adam_diplomski/wms",
        {
            layers: 'adam_diplomski:6E29-13-DOF',
            isBaseLayer: true,
        }
    );

    wfsLayer = new OpenLayers.Layer.Vector("Grobovi", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        reportError: true,
        visibility: true, 
        protocol: new OpenLayers.Protocol.WFS({
            version: "1.1.0",
            url:  "http://31.147.204.28:8080/geoserver/adam_diplomski/wfs",
            featureType: "grobovi",
            featurePrefix: "adam_diplomski",
            featureNS: "http://www.geof.hr",
            geometryName: "the_geom",
            srsName: "EPSG:3857",
        }),
        isBaseLayer: false
        //displayInLayerSwitcher : false
    });    

    map.addLayers([wmsLayer, wfsLayer, openstreetmap, google_satellite]);

    selectControl = new OpenLayers.Control.SelectFeature(
        [wfsLayer],
        {
            clickout: true, toggle: false,
            multiple: false, hover: false,
        }
    );

    map.addControl(selectControl);
    selectControl.activate();

    wfsLayer.events.on ({
        "featureselected": function(e) {
            var record = e.feature.data.id;
            if (record) {
                    Ext.Ajax.request({
                        url: 'data.php',
                        method: 'GET',
                        params: {broj_groba: record},
                        success: function(response, options) {
                                var json = Ext.decode(response.responseText);
                            ukopaniDvStore.loadData(json.ukopani);
                            korisniciDvStore.loadData(json.korisnici);
                             }, 
                        failure: function (){
                          alert("Pogreška!")
                        }             
                    });
            }
        }
    });

    mapPanel = new GeoExt.MapPanel({
        title: 'Karta',
        //region: 'center',
        map: map
    }); 

    wfsStore = new GeoExt.data.FeatureStore({
        autoload: true,
        layer: wfsLayer,
        fields: [ 
            {name: 'gid', type: 'int', mapping: 'gid'},
            {name: 'id', type: 'int', mapping: 'id'},
            {name: 'polje', type: 'string', mapping: 'polje'},
            {name: 'red', type: 'string', mapping: 'red'},
            {name: 'vrsta_grobnog_mjesta', type: 'string', mapping: 'vrsta_grobnog_mjesta'},
        ],
        sortInfo:{field: 'id', direction: 'ASC'}

    });
