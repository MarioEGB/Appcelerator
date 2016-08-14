/**
 * ------- VENTANA PRINCIPAL -------
 */

var ventana = Titanium.UI.createWindow({
	backgroundImage : '/images/fondo_chica.png',
	layout : 'vertical'
});

/**
 * ------- VISTA SUPERIOR -------
 */

var view_sup = Titanium.UI.createView({
	//backgroundColor : 'red',
	//opacity : 0.5,
	width : Titanium.UI.FILL,
	height : '60%'
});

/**
 * ------- VISTA MES HORA -------
 */

var view_mes_hora = Titanium.UI.createView({
	//backgroundColor : 'pink',
	//opacity : 0.5,
	width : Titanium.UI.SIZE,
	height : Titanium.UI.SIZE,
	top : '15%',
	layout : 'vertical'
});

/**
 * ------- LABEL MES -------
 */

var lb_mes = Titanium.UI.createLabel({
	text : 'Ago',
	color : '#FFFFFF',
	font : {
		fontSize : 24
	}
});

/**
 * ------- LABELS HORA -------
 */

var lb_hora = Titanium.UI.createLabel({
	text : '21:30',
	color : '#FFFFFF',
	font : {
		fontSize : 40
	}
});

view_mes_hora.add(lb_mes);
view_mes_hora.add(lb_hora);

/**
 * ------- VISTA INFERIOR -------
 */
var view_inf = Titanium.UI.createView({
	//backgroundColor : 'blue',
	//opacity : 0.5,
	width : Titanium.UI.FILL,
	height : '40%',
	layout : 'vertical'
});

/**
 * ------- VISTA DIAS DE LA SEMANA -------
 */
var view_dias = Titanium.UI.createView({
	//backgroundColor : 'purple',
	//opacity : 0.5,
	width : Titanium.UI.FILL,
	height : '25%',
	layout : 'horizontal'
});

/**
 * ------- VISTA ALARMA 1 -------
 */

var view_alarma_1 = Titanium.UI.createView({
	//backgroundColor : 'orange',
	//opacity : 0.5,
	width : Titanium.UI.FILL,
	height : '25%',
	layout : 'horizontal'
});

/**
 * ------- VISTA ALARMA 2 -------
 */
var view_alarma_2 = Titanium.UI.createView({
	//backgroundColor : 'yellow',
	//opacity : 0.5,
	width : Titanium.UI.FILL,
	height : '25%',
	layout : 'horizontal'
});

/**
 * ------- VISTA ALARMA 3 -------
 */
var view_alarma_3 = Titanium.UI.createView({
	//backgroundColor : 'cyan',
	//opacity : 0.5,
	width : Titanium.UI.FILL,
	height : '25%',
	layout : 'horizontal'
});

/**
 * ------- LABELS DIAS -------
 */

var dias = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

for (var i = 0; i < 7; i++) {
	var x = '14%';
	if (i == 6) {
		x = '15%';
	}
	var lbl = Titanium.UI.createLabel({
		height : Ti.UI.FILL,
		width : x,
		font : {
			fontSize : 20
		},
		textAling : Ti.UI.TEXT_ALIGNMENT_CENTER,
		color : 'blue',
		text : dias[i]
	});
	view_dias.add(lbl);
}

/**
 * ------- VENTANAS DENTRO DE ALARMAS -------
 */

var campana = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	backgroundImage : '/images/bell.png',
	width : '15%',
	//backgroundColor: 'blue',
	layout : 'absolute'
});

var campana_2 = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	backgroundImage : '/images/bell.png',
	width : '15%',
	//backgroundColor: 'blue',
	layout : 'absolute'
});

var campana_3 = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	backgroundImage : '/images/bell.png',
	width : '15%',
	//backgroundColor: 'blue',
	layout : 'absolute'
});

var hora = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	width : '70%',
	//backgroundColor: 'red',
	layout : 'vertical'
});

var hora_2 = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	width : '70%',
	//backgroundColor: 'red',
	layout : 'vertical'
});

var hora_3 = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	width : '70%',
	//backgroundColor: 'red',
	layout : 'vertical'
});

var view_swth = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	width : '15%',
	//backgroundColor: 'yellow',
	layout : 'absolute'
});

var view_swth_2 = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	width : '15%',
	//backgroundColor: 'yellow',
	layout : 'absolute'
});

var view_swth_3 = Titanium.UI.createView({
	height : Titanium.UI.FILL,
	width : '15%',
	//backgroundColor: 'yellow',
	layout : 'absolute'
});

var swth = Titanium.UI.createSwitch({

});

view_swth.add(swth);

var swth_2 = Titanium.UI.createSwitch({

});
view_swth_2.add(swth_2);

var swth_3 = Titanium.UI.createSwitch({

});
view_swth_3.add(swth_2);

view_alarma_1.add(campana);
view_alarma_1.add(hora);
view_alarma_1.add(view_swth);

view_alarma_2.add(campana_2);
view_alarma_2.add(hora_2);
view_alarma_2.add(view_swth_2);

view_alarma_3.add(campana_3);
view_alarma_3.add(hora_3);
view_alarma_3.add(view_swth_3);

/**
 * ------- AGREGANDO ELEMENTOS -------
 */

var alrm_h_lbl1 = Titanium.UI.createLabel({
	text : '9:20',
	font : {
		fontSize : 20,
		fontWeight : 'bold'
	},
	left : 12
});

var alrm_msj_lbl1 = Titanium.UI.createLabel({
	text : 'Alarma 1',
	font : {
		fontSize : 15,
		fontWeight : 'bold'
	},
	left : 12
});

var alrm_h_lbl2 = Titanium.UI.createLabel({
	text : '5:43',
	font : {
		fontSize : 20,
		fontWeight : 'bold'
	},
	left : 12
});

var alrm_msj_lbl2 = Titanium.UI.createLabel({
	text : 'Alarma 2',
	font : {
		fontSize : 15,
		fontWeight : 'bold'
	},
	left : 12
});

var alrm_h_lbl3 = Titanium.UI.createLabel({
	text : '3:56',
	font : {
		fontSize : 20,
		fontWeight : 'bold'
	},
	left : 12
});

var alrm_msj_lbl3 = Titanium.UI.createLabel({
	text : 'Alarma 3',
	font : {
		fontSize : 15,
		fontWeight : 'bold'
	},
	left : 12
});

hora.add(alrm_h_lbl1);
hora.add(alrm_msj_lbl1);

hora_2.add(alrm_h_lbl2);
hora_2.add(alrm_msj_lbl2);

hora_3.add(alrm_h_lbl3);
hora_3.add(alrm_msj_lbl3);
/**
 * ------- AGREGANDO ELEMENTOS -------
 */

ventana.add(view_sup);
ventana.add(view_inf);

view_sup.add(view_mes_hora);
view_inf.add(view_dias);
view_inf.add(view_alarma_1);
view_inf.add(view_alarma_2);
view_inf.add(view_alarma_3);




ventana.open();
