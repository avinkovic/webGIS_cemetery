var ukopaniDvStore;
var ukopaniDVTpl;
var ukopaniDv;
var korisniciDvStore;
var korisniciDVTpl;
var korisniciDv;


//proxy: new Ext.ux.data.BufferedPagingMemoryProxy([])

ukopaniDvStore = new Ext.data.Store({
	autoLoad: false,
	//proxy: new Ext.data.HttpProxy({
    //       url: 'data_proba.php',
    //       method: 'POST'
    //}),
	id: 'ukopaniDvStore',
	reader: new Ext.data.JsonReader({   
      	    root: 'results_ukopani',
      	    totalProperty: 'total_ukopani',
      	    //idProperty: 'id'
      	},
	[
	{ name: 'id', mapping: 'id' },
	{ name: 'broj_groba', mapping: 'broj_groba' },
	{ name: 'redni_broj', mapping: 'redni_broj' },
	{ name: 'ime', mapping: 'ime' },
	{ name: 'prezime', mapping: 'prezime' },
	{ name: 'spol', mapping: 'spol' },
	{ name: 'nadnevak_rodjenja', mapping: 'nadnevak_rodjenja' },
	{ name: 'nadnevak_smrti', mapping: 'nadnevak_smrti' }
	])
});

ukopaniDVTpl = new Ext.XTemplate(
	'<tpl for=".">',
	'<div class="Wrap" id="ukopani_{id}">',
	'<div class="Name">{broj_groba} {prezime} {ime}</div>',
	'<div>',
	'<span class="title">Redni broj: </span>',
	'{redni_broj}',
	'</div>',
	'<div>',
	'<span class="title">Spol: </span>',
	'{spol}',
	'</div>',
	'<div>',
	'<span class="title">Nadnevak rođenja: </span>',
	'{nadnevak_rodjenja}',
	'</div>',
	'<div>',
	'<span class="title">Nadnevak smrti: </span>',
	'{nadnevak_smrti}',
	'</div>',
	'</div>',
	'</tpl>'
);

ukopaniDv = new Ext.DataView({
	tpl: ukopaniDVTpl,
	store: ukopaniDvStore,
	singleSelect: true,
	itemSelector: 'div.Wrap',
	selectedClass: 'Selected',
	overClass: 'Over',
	style: 'overflow:auto; background-color: #FFFFFF;'
});

korisniciDvStore = new Ext.data.Store({
	autoLoad: false,
	//proxy: new Ext.data.HttpProxy({
    //       url: 'data_proba.php',
    //       method: 'POST'
    //}),
	//baseParams:{task_korisnici: "LISTING_KORISNICI"},
	id: 'korisniciDvStore',
	reader: new Ext.data.JsonReader({   
      	    root: 'results_korisnici',
      	    totalProperty: 'total_korisnici',
      	    //idProperty: 'id'
      	},
	[
	{ name: 'id', mapping: 'id' },
	{ name: 'ime', mapping: 'ime' },
	{ name: 'prezime', mapping: 'prezime' },
	{ name: 'broj_groba', mapping: 'broj_groba' },
	{ name: 'jmbg', mapping: 'jmbg' },
	{ name: 'adresa', mapping: 'adresa' },
	{ name: 'osnova_stjecanja', mapping: 'osnova_stjecanja' },
	{ name: 'placanje', mapping: 'placanje' },
	{ name: 'iznos_uplate', mapping: 'iznos_uplate' }
	])
});

korisniciDVTpl = new Ext.XTemplate(
	'<tpl for=".">',
	'<div class="Wrap" id="korisnik_{id}">',
	'<div class="Name">{prezime} {ime}</div>',
	'<div>',
	'<span class="title">ID: </span>',
	'{id}',
	'</div>',
	'<div>',
	'<span class="title">Broj groba: </span>',
	'{broj_groba}',
	'</div>',
	'<div>',
	'<span class="title">JMBG: </span>',
	'{jmbg}',
	'</div>',
	'<div>',
	'<span class="title">Adresa: </span>',
	'{adresa}',
	'</div>',
	'<div>',
	'<span class="title">Osnova stjecanja: </span>',
	'{osnova_stjecanja}',
	'</div>',
	'<div>',
	'<span class="title">Placanje: </span>',
	'{placanje}',
	'</div>',
	'<div>',
	'<span class="title">Iznos uplate: </span>',
	'{iznos_uplate}',
	'</div>',
	'</div>',
	'</tpl>'
);

korisniciDv = new Ext.DataView({
	tpl: korisniciDVTpl,
	store: korisniciDvStore,
	singleSelect: true,
	itemSelector: 'div.Wrap',
	selectedClass: 'Selected',
	overClass: 'Over',
	style: 'overflow:auto; background-color: #FFFFFF;'
});