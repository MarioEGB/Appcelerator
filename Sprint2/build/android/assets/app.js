function main() {
	var win = Titanium.UI.createWindow({
		theme : 'materialThemeNoAB',
		backgroundImage : '/imgs/fondo.png',
		layout : 'horizontal'
	});

	var win2 = Titanium.UI.createWindow({
		theme : 'materialThemeNoAB',
		layout : 'vertival'
	});

	var view_1 = Titanium.UI.createView({
		height : '12%',
		width : Titanium.UI.FILL,
		layout : 'Absolute'
	});

	var boton = Titanium.UI.createLabel({
		text : 'FAVORITOS',
		width : Titanium.UI.SIZE,
		height : Titanium.UI.SIZE,
		color : '#000000',
		borderWidth : '3px',
		borderColor : '#1b5e20',
		borderRadius : '12px	',
		font : {
			fontSize : 28,
			fontWeight : 'bold'
		}

	});

	view_1.add(boton);

	boton.addEventListener('click', function() {
		favoritos();
	});

	function favoritos() {
		var wind = Ti.UI.createWindow({
			theme : 'materialThemeNoAB',
			backgroundImage : '/imgs/fondo.png',
			layout : 'vertical'
		});
		wind.addEventListener('android:back', function() {
			main();
		});
		var vw = Titanium.UI.createView({
			width : Titanium.UI.FILL,
			height : '15%',
			layout : 'horizontal'
		});
		vw.addEventListener('click', function() {
			var query=db.execute('SELECT * FROM favoritos');
			var datos=0;
			while(query.isValidRow()){
				datos++;
				query.next();
			}
			
			console.log(datos);
			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Ok', 'Cancelar'],
				message : 'Desea eliminar todos los favoritos?',
				title : 'Eliminar'
			});
			if(datos>0){
			dialog.show();
			}
			dialog.addEventListener('click', function(e) {
				if (e.index === e.source.cancel) {

				} else {
					db.execute('delete from favoritos where 1');
					favoritos();
					var dialog2 = Ti.UI.createAlertDialog({
						buttonNames : ['Ok'],
						message : 'Favoritos eliminados con exito',
						title : 'Exito'
					});
					dialog2.show();
				}
			});
		});
		var lbl1 = Ti.UI.createImageView({
			width : '35%',
			height : '100%',
			backgroundImage : '/imgs/favoritos.png'
		});
		var lbl2 = Ti.UI.createLabel({
			width : '55%',
			height : Titanium.UI.FILL,
			text : 'Favoritos',
			color : 'white',
			left : '10%',
			font : {
				fontSize : 35,
				fontWeight : 'bold'
			}

		});

		vw.add(lbl1);
		vw.add(lbl2);
		wind.add(vw);

		var sview = Ti.UI.createScrollView({
			layout : 'vertical'
		});

		var validar = db.execute('SELECT * FROM favoritos');
		while (validar.isValidRow()) {
			var title = validar.fieldByName('titulo');
			var html = validar.fieldByName('descripcion');
			var nombre_url = validar.fieldByName('url');

			var noticias = Ti.UI.createView({
				width : '90%',
				height : '200dp',
				layout : 'horizontal'
			});
			var titulo = Titanium.UI.createLabel({
				text : "---" + title,
				color : '#424242',
				left : '20dp'
			});
			var desc = Titanium.UI.createWebView({
				html : html,
				width : '75%',
				left : 0,
				backgroundImage : '/imgs/fondo_w.png',
				height : '300dp'
			});
			var delete_fav = Titanium.UI.createImageView({
				height : '15%',
				width : "15%",
				right : 0,
				top : 0,
				backgroundImage : "/imgs/favoritos.png"
			});
			var linea = Titanium.UI.createView({
				top : 2,
				height : "10dp",
				width : Ti.UI.FILL,
				backgroundColor : "#1b5e20"
			});
			eventos(delete_fav, desc, title, html, nombre_url, true);
			noticias.add(titulo);
			noticias.add(desc);
			noticias.add(delete_fav);
			sview.add(noticias);
			sview.add(linea);
			validar.next();
		}
		wind.add(sview);
		wind.open();

	}


	Ti.Database.install('rss.sqlite', 'rss2');
	var db = Ti.Database.open('rss2');
	var colores = ['/imgs/entretenimiento.png', '/imgs/ciencia.png', '/imgs/cine.png', '/imgs/deportes.png', '/imgs/tecnologia.png', '/imgs/musica.png', '/imgs/salud.png', '/imgs/libros.png'];
	var nom = ['DISTRACCION', 'CIENCIA', 'CINE', 'DEPORTES', 'TECNOLOGIA', 'MUSICA', 'SALUD', 'LIBROS'];
	var news = ['http://rss.informador.com.mx/informador-entretenimiento?format=xml', 'http://www.investigacionyciencia.es/rss/noticias', 'http://www.elmulticine.com/rss.php', 'http://as.com/rss/tags/ultimas_noticias.xml', 'http://www.eluniversal.com.mx/rss/computo.xml', 'http://www.metacritic.com/rss/music', 'http://www.who.int/feeds/entity/mediacentre/news/es/rss.xml', 'http://trabalibros.com/rssfeed/58/116.xml'];
	var letras = [' #2196f3', '#ff5722', '#ffeb3b', '#795548', '#004d40', '#673ab7', '#ffffff', ' #f44336'];
	win.add(view_1);

	for (var j = 0; j < 8; j++) {
		var views = Titanium.UI.createView({
			height : '22%',
			width : '50%',
			layout : 'vertical'
		});

		var Iviews = Titanium.UI.createImageView({
			height : '70%',
			width : '70%',
			backgroundImage : colores[j]
		});

		var lbls = Titanium.UI.createLabel({
			height : '20%',
			width : '100%',
			color : letras[j],
			left : '10%',
			font : {
				fontSize : 22
			},
			text : nom[j]
		});
		views.add(Iviews);
		views.add(lbls);
		win.add(views);

		abrir(j);

	}

	function abrir(j) {
		views.addEventListener('click', function() {

			var xhr = Titanium.Network.createHTTPClient();
			//xhr.setTimeout(10);

			xhr.onload = function() {
				var window = Ti.UI.createWindow({
					theme : 'materialThemeNoAB',
					backgroundImage : '/imgs/fondo.png',
				});
				var sview = Ti.UI.createScrollView({
					layout : 'vertical'
				});

				var lbltit = Ti.UI.createImageView({
					width : '35%',
					height : '80%',
					backgroundImage : colores[j]
				});
				var vw2 = Titanium.UI.createView({
					width : Titanium.UI.FILL,
					height : '150dp',
					layout : 'horizontal'
				});

				var lbltit2 = Ti.UI.createLabel({
					width : '65%',
					height : '100%',
					text : nom[j],
					color : letras[j],
					//left : "2",
					font : {
						fontSize : 25,
						fontWeight : 'bold'
					}

				});
				vw2.add(lbltit);
				vw2.add(lbltit2);
				sview.add(vw2);
				var data = [];
				var xml = this.responseXML.documentElement;
				var items = xml.getElementsByTagName("item");
				var doctitle = xml.evaluate("//channel/title/text()").item(0).nodeValue;

				for (var i = 0; i < items.length; i++) {
					var noticias = Ti.UI.createView({
						width : '90%',
						height : '200dp',
						layout : 'horizontal'
					});
					var title = items.item(i).getElementsByTagName("title").item(0).text;
					var titulo = Titanium.UI.createLabel({
						text : "---" + title,
						color : '#424242',
						left : '20dp'
					});
					var html = items.item(i).getElementsByTagName("description").item(0).text;
					var desc = Titanium.UI.createWebView({
						html : html,
						width : '75%',
						left : 0,
						backgroundImage : '/imgs/fondo_w.png',
						color : 'white',
						height : '300dp'
					});
					var addfav = Titanium.UI.createImageView({
						height : '15%',
						width : "15%",
						right : 0,
						top : 0,
						backgroundImage : "/imgs/favoritos.png"
					});
					var linea = Titanium.UI.createView({
						top : 2,
						height : "10dp",
						width : Ti.UI.FILL,
						backgroundColor : "#1b5e20"
					});

					url = items.item(i).getElementsByTagName("link").item(0).text;
					eventos(addfav, desc, title, html, url, false);
					noticias.add(titulo);
					noticias.add(desc);
					noticias.add(addfav);
					sview.add(noticias);
					sview.add(linea);
				}

				window.add(sview);
				window.open();
			};

			xhr.onerror = function() {
				alert('Fallo en la carga de la pagina');
			};
			var url = news[j];
			console.log(url);
			xhr.open("GET", url);
			xhr.send();

		});
	}

	function eventos(view, w_view, title, html, url, refresh) {
		w_view.addEventListener('click', function() {
			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Ok', 'Cancelar'],
				message : 'Desea ir a la url de la noticia seleccionada?',
				title : 'Redirecionar'
			});
			dialog.addEventListener('click', function(e) {
				if (e.index === e.source.cancel) {

				} else {
					Titanium.Platform.openURL(url);
				}
			});

			dialog.show();
		});

		view.addEventListener('click', function() {
			var validar = db.execute('SELECT * FROM favoritos');
			var bool = false;
			while (validar.isValidRow()) {
				var nombre_url = validar.fieldByName('url');
				if (nombre_url == url) {
					var dialog = Ti.UI.createAlertDialog({
						message : 'sitio removido de favoritos',
						ok : 'Ok',
						title : 'Eliminado'
					});
					db.execute('DELETE FROM favoritos WHERE url=?', url);
					if (refresh) {
						favoritos();
					}
					dialog.show();
					bool = true;
					break;
				}
				validar.next();
			}
			validar.close();
			if (!bool) {
				var dialog = Ti.UI.createAlertDialog({
					message : 'sitio añadido a favoritos',
					ok : 'Ok',
					title : 'Agregado'
				});
				db.execute('INSERT INTO favoritos(titulo,descripcion,url) VALUES(?,?,?)', title, html, url);
				dialog.show();
			}
		});
	}


	win.open();

}

main();
