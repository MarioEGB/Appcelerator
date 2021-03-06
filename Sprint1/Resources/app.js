// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	title:"Spring 1"
});



//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'gray'
});

var win3 = Titanium.UI.createWindow({  
    title:'Datos En la Base',
    backgroundColor:'gray',
    layout:'vertical'
});

var namelbl = Ti.UI.createLabel({
	font:{fontSize:20, fontWeight:'bold'},
	textAling:Ti.UI.TEXT_ALIGNMENT_CENTER,
	width: Ti.UI.size,
	height: Ti.UI.size,
	text:"Nombre"
	});

var last_namelbl = Ti.UI.createLabel({
	font:{fontSize:20, fontWeight:'bold'},
	textAling:Ti.UI.TEXT_ALIGNMENT_CENTER,
	width: Ti.UI.size,
	height: Ti.UI.size,
	text:"Apellido"
	});

var nameTf = Ti.UI.createTextField({
	width: 250,
	height: 60,
	color: "white",
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED	
	});
			
var last_nameTf = Ti.UI.createTextField({
	width: 250,
	height: 60,
	color: "white",
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

var add_btn = Ti.UI.createButton({
	width: 100,
	height: 50,
	title: "Agregar",
	color:"black"
	});


var win4 = Titanium.UI.createWindow({  
    title:'Agregar',
    layout:'vertical',   
     backgroundColor:'gray'
    
});


win4.add(namelbl);
win4.add(nameTf);
win4.add(last_namelbl);
win4.add(last_nameTf);
win4.add(add_btn);

var idlbl = Ti.UI.createLabel({
	font:{fontSize:20, fontWeight:'bold'},
	textAling:Ti.UI.TEXT_ALIGNMENT_CENTER,
	width: 50,
	height: Ti.UI.size,
	text:"Escribe id a eliminar"
	});


var idTf = Ti.UI.createTextField({
	width: 250,
	height: 60,
	color: "white",
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

var delete_btn = Ti.UI.createButton({
	width: 100,
	height: 50,
	title: "Eliminar",
	color:"black"
	});

var win5 = Titanium.UI.createWindow({  
    title:'Eliminar',
    backgroundColor:'gray',
    layout:'vertical'
});




//creando la base de datos
Ti.Database.install('Spdb.sqlite','spdb');
var db=Ti.Database.open('spdb');
	
function baseDatos(dato){
	switch(dato){
		case "MOSTAR DATOS":
			var datos=[];
			var mostrar=db.execute('SELECT * FROM Alumnos');
			while(mostrar.isValidRow()){
				var nombre=mostrar.fieldByName('nombre');
				var apellido=mostrar.fieldByName('apellido');
				datos.push({
					title:nombre+" "+apellido,
					color : "black",
					backgroundColor:"gray",
					height:70,
					borderColor:"black",
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					font:{fontSize:20, fontWeight:'bold'}			
				});mostrar.next();
			}
			mostrar.close();
			var t_mostrar = Titanium.UI.createTableView({
				editable:true
				});
			t_mostrar.setData(datos);	
			win3.add(t_mostrar);
			win3.open();
			win3.addEventListener('return',function(e){
			win3.close();
			});	 
		break;
		case "AGREGAR DATOS":
			win4.open();
			add_btn.addEventListener('click',function(e){
				var nombre=nameTf.value;
				var	apellido=last_nameTf.value;
				if(nombre=="" || apellido==""){
					alert('Ambos campos deben estar llenos');
				}else{
					db.execute('INSERT INTO Alumnos(nombre,apellido) VALUES(?,?)',nombre,apellido);
					alert('Añadido con exito');
				}	
				
			});	
			win4.addEventListener('return',function(e){
			win4.close();
			});		
		break;
		case "BORRAR DATOS":
			var datos=[];
			var mostrar=db.execute('SELECT * FROM Alumnos');
			while(mostrar.isValidRow()){
				var id=mostrar.fieldByName('id');
				var nombre=mostrar.fieldByName('nombre');
				var apellido=mostrar.fieldByName('apellido');
				datos.push({
					title:id+" "+nombre+" "+apellido,
					color : "black",
					backgroundColor:"gray",
					height:70,
					borderColor:"black",
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					font:{fontSize:20, fontWeight:'bold'}			
				});mostrar.next();
			}
			mostrar.close();
			var t_eliminar = Titanium.UI.createTableView({
				editable:true
				});
			t_eliminar.setData(datos);	
			win5.add(idlbl);
			win5.add(idTf);
			win5.add(delete_btn);
			win5.add(t_eliminar);
			win5.open();
			delete_btn.addEventListener('click',function(e){
				var num= parseInt(idTf.value);
				if(idTf.value==""){
					alert("No puede estar vacio el campo");
				}else if(datoid(num)){
					db.execute('DELETE FROM Alumnos WHERE id=?',idTf.value);
					alert('Eliminado con exito');
					var datos=[];
					var mostrar=db.execute('SELECT * FROM Alumnos');
					while(mostrar.isValidRow()){
						var id=mostrar.fieldByName('id');
						var nombre=mostrar.fieldByName('nombre');
						var apellido=mostrar.fieldByName('apellido');
						datos.push({
						title:id+" "+nombre+" "+apellido,
						color : "black",
						backgroundColor:"gray",
						height:70,
						borderColor:"black",
						textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
						font:{fontSize:20, fontWeight:'bold'}			
						});mostrar.next();
					}
					mostrar.close();
					t_eliminar.setData(datos);
					win5.addEventListener('return',function(e){
					win5.close();
					}); 
				}else{
					alert('Registro no  encontrado');
				}
			});
			
				
		break;
	}
	
}


function datoid(e){
	var id=db.execute('SELECT id FROM Alumnos');
	while(id.isValidRow()){
		var num=id.fieldByName('id');
		if(num==e){
			return true;
		}
		id.next();
	}id.close();
	return false;
}

function valida(e){
    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla==8){
        return true;
    }
        
    // Patron de entrada, en este caso solo acepta numeros
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

//Tab 1
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Base de datos',
    window:win1
});

var table1 =  Titanium.UI.createTableView({
	top:130,
	data:[
		{title:"MOSTAR DATOS",color : "black",backgroundColor:"gray",height:70,borderColor:"black",textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:20, fontWeight:'bold'}},
		{title:"AGREGAR DATOS", color : "black",backgroundColor:"gray",height:70,borderColor:"black",textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:20, fontWeight:'bold'}},
		{title:"BORRAR DATOS", color : "black",backgroundColor:"gray",height:70,borderColor:"black",textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,font:{fontSize:20, fontWeight:'bold'}}
	]	
});

table1.addEventListener('click',function(e){
 baseDatos(e.rowData.title);
});

win1.add(table1);

// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});

//mapa
var mapview = Titanium.Map.createView({
	top:0,
	//height:300,
	mapType: Titanium.Map.STANDARD_TYPE,
	animate:true,
	regionFit:true,
	userLocation:true
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Mapa',
    window:win2
});

win2.add(mapview);
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();



