
/////////////// Plugin TT for PirotecnitaTomas  2019*/////////////////////////////////////////////////////////////////////////
/*
plugins para usar por url agregar al directorio y registrar en app.js  code >>> App.pluginRegistry=   pyro1:"/plugins/pyro1.js",pyro2:"/plugins/pyro2.js",
ruta para las librerias ejemplo 'Lib/baterias.xml para ello cro dir en ruta webapp
para crear una figura o stencil-shape es usar escala 10mm = 2px  , ejemplo bat75mm sera de 150px
<shape name="Bat75" h="150" w="15" aspect="variable" strokewidth="inherit">

solucion para reajustar contonrno shapes  es darle valor variable  y ajustar manualmente una vez creado editando darle medidas
que pusimos en la creacion del shape i guardar en la libreria, no olvidarnos de cambiar le el nombre en la libreria i darle atributos
tipos de atributos: Name,Disparos,Efecto,Cadencia,Cadencia

graph.getChildVertices(graph.getDefaultParent()); para no cojer flechas i otra
las figuras se intancian i pueden recoger atributos si estan selecionados ambos
click menu funcion 1 procesar , vacia array_name y empuja todos las figuas de pagina-actual dentro del array
click menu funcion 2  muestra cuantos names hay diferentes y que numero de ellos hay en el array-name de  pagina-actual

IMPORTANTE poner archivo efectos.txt en la ruta de la app  , palabras en una misma linea separadas por comas.

para mejorar///
1-contar todas las paginas y no solo la actual
  if un cell tiene parent=cell.id 

  <mxGraphModel dx="717" dy="859" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
  </root>
</mxGraphModel>  
  
<mxGraphModel dx="717" dy="859" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="r-UZ8igVGSpfonwKMBKW-0"/>
    <mxCell id="r-UZ8igVGSpfonwKMBKW-1" parent="r-UZ8igVGSpfonwKMBKW-0"/>
  </root>
</mxGraphModel>

<mxGraphModel dx="717" dy="859" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="r-UZ8igVGSpfonwKMBKW-0"/>
    <mxCell id="r-UZ8igVGSpfonwKMBKW-1" parent="r-UZ8igVGSpfonwKMBKW-0"/>
    <object label="" placeholders="1" Name="Bateria_60mm" Efecto="" Disparos="10" Cadencia="" Linea="" id="OLUTDO3E-KnrEg16JvGu-0">
      <mxCell style="shape=stencil(xVTLTsMwEPwaH0GuHZVwhJT+h5tuGqvGjuylD76epGujJkCQEKpP0cxaM7vjjZmsQqs6YIJb9QpMrpgQzwqXvP/2ZEvMQkR8TJigCh3USNxBea02BqgS0Ls9HPUWo4S2LXiNQ1W+MP7EBknOZLVR9X7n3Zvdjgqp7AcDwU+kEts4j9CkqUnP64lfz/xgKavGeZjppdHG0GBT2XQC4TR02ziLQb/HPMvPSAincNNM98V4qoSV0TtLnIEGiTxcsei6SIJHXSszisU7VKidTar8SvWObp2C+iamNA8Yo7sAf7yAGeH5GH+xTUa39hVFHl+5zONblHl80w9ya9+HTHtVZtqrx0x7teD/vViXZ/3L631h40s3EB8=);whiteSpace=wrap;html=1;horizontal=0;" vertex="1" parent="r-UZ8igVGSpfonwKMBKW-1">
        <mxGeometry x="20" y="20" width="12" height="120" as="geometry"/>
      </mxCell>
    </object>
  </root>
</mxGraphModel>

2-generar una pagina de listado con toda info parseada piruli

bug/////
1-si clikamos procesar i estan atributos selecionados se cambiaran todos los de las fijuras a dichos valores
solucion poner alert i un if

para que cuente tiempos tiene que estar puesto ya en la figura , o clikar 2 veces procesar para poner les atodos automatico
*/

// FUNCION UI MAIN //////////////////////////////////////////////////////////////////////////////////////
Draw.loadPlugin(function(ui) {
  mxLog.show();//mostrar consola mxgraph modo debuger
  mxLog.debug('Pirodraw piro.js Author TT 2019');
  mxLog.debug('Start ... OK');
  
  /////////////add piro.css 
var ss = document.createElement("link");
ss.type = "text/css";
ss.rel = "stylesheet";
ss.href = "styles/piro.css";
document.getElementsByTagName("head")[0].appendChild(ss);
 mxLog.debug('Load styles/piro.css  ... OK ');
//// cargar Sidebar libs xml ///////////////////////////////////////////////
var url1 = 'Lib/baterias.xml';
mxLog.debug('Load ' + url1 +' ... OK ');
var url2 = 'Lib/abanicos.xml';
mxLog.debug('Load ' + url2 +' ... OK ');
var url3 = 'Lib/canones.xml';
mxLog.debug('Load  ' + url3 +' ... OK ');
//var url4 = 'Lib/varios.xml';
mxUtils.get(url1, function(req){ ui.loadLibrary(new LocalLibrary(this, req.getText(),url1));   });
mxUtils.get(url2, function(req){ ui.loadLibrary(new LocalLibrary(this, req.getText(),url2));   });
mxUtils.get(url3, function(req){ ui.loadLibrary(new LocalLibrary(this, req.getText(),url3));   });
//// fin cargar Sidebar libs xml  ///////////////////////////////////////////

/////variables y arrays /////////////////////////////////////////////////////
var graph = ui.editor.graph;
var piro_name = [];
var piro_disparos = ['0','1','3','5','10','20','30','50'];
var array_piro_lineas = []; // array de lineas
var array_piro_id = []; //declaramos array gloval id de fiuguras
var array_piro_name = []; //declaramos array gloval name de figuras
var array_pagina_id = [];
var array_piro_id_time = []; // guardara tiempo = cadencia x disparos
 var array_piro_efectos = []; // array  guardara los efectos leidos de un txt
var strLabelCustom = "%Name% %Disparos% %Cadencia% %Efecto%  %Linea%";
/////fin variables y arrays /////////////////////////////////////////////////

/////////////////////////////txt to array txtGetPiroEfectos///////////////////////////////////
function txtGetPiroEfectos(palabra, callback) {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", palabra, false );
    xmlhttp.send();    
}

txtGetPiroEfectos("efectos.txt", function(textFile){
     array_piro_efectos = textFile.slice(1, -1).split(",");
     mxLog.debug('Load efectos.txt ... OK');
  //  alert(array_piro_efectos);
});

////////////////////////fin txt to array txtGetPiroEfectos///////////////////////////////////////
 
 ////panel PiroDivPanel /////////////////////////////////////////////////
var div_tagTitle = document.createElement('div');
div_tagTitle.id = 'PiroDivPanel';
div_tagTitle.setAttribute('class', 'class_PiroDiv');
if (!ui.editor.chromeless){div_tagTitle.setAttribute('class', 'class_PiroDivPanel class_PiroDiv');}  
div_tagTitle.innerHTML = '<h3> Pirodraw Control Panel </h3>';
document.body.appendChild(div_tagTitle);
////fin PiroDivPanelTag ///////////////////////////////////////////////
  
////panel PiroDivPanelTag /////////////////////////////////////////////////
var div_tag = document.createElement('div');
div_tag.id = 'PiroDiv';
div_tag.setAttribute('class', 'class_PiroDivPanelTag');
if (!ui.editor.chromeless){div_tag.setAttribute('class', 'class_PiroDivPanelTag class_PiroDiv');}  
div_tag.innerHTML = '<p><i>Selecciona un objeto ...</i></p>';
document.body.appendChild(div_tag);
////fin PiroDivPanelTag ///////////////////////////////////////////////
	
	
////panel PiroDivPanelEfectos /////////////////////////////////////////////////
var div_efectos = document.createElement('div');
div_efectos.id = 'PiroDivPanelEfectos';
div_efectos.setAttribute('class', 'class_PiroDiv');
div_efectos.innerText = "Efectos";
if (!ui.editor.chromeless){div_efectos.setAttribute('class', 'class_PiroDivPanelEfectos class_PiroDiv');}
document.body.appendChild(div_efectos);
/////fin PiroDivPanelEfectos /////////////////////////////////////////////////
   
///////PiroDivPanelEfectos select efectos y checkbox ////////////////////////
var PiroDivPanelEfectos = document.getElementById("PiroDivPanelEfectos");
var checkbox_selectList_piro_efectos = document.createElement("input");
checkbox_selectList_piro_efectos.setAttribute("type", "checkbox");
checkbox_selectList_piro_efectos.setAttribute("id", "idcheckbox_selectList_piro_efectos");
checkbox_selectList_piro_efectos.setAttribute("name", "checkbox_selectList_piro_efectos");
checkbox_selectList_piro_efectos.setAttribute("value", "ff");
// cambiar a true para que salga por defetcto activado
checkbox_selectList_piro_efectos.checked = false; 
PiroDivPanelEfectos.appendChild(checkbox_selectList_piro_efectos);

//Create and append select list
var selectList_piro_efectos = document.createElement("select");
selectList_piro_efectos.setAttribute("id", "Select_piro_efectos");
PiroDivPanelEfectos.appendChild(selectList_piro_efectos);
//Create and append the options
for (var i = 0; i < array_piro_efectos.length; i++)
	{
		var optionEfectos = document.createElement("option");
		optionEfectos.setAttribute("value", array_piro_efectos[i]);
		optionEfectos.text = array_piro_efectos[i];
		selectList_piro_efectos.appendChild(optionEfectos);
	}
 
  /////////////input text efectos
  var inputEfectos = document.createElement("input");
  PiroDivPanelEfectos.appendChild(inputEfectos); 
 
   /////////////btn add efectos
   var BtnAdinputEfectos = document.createElement("input");
   BtnAdinputEfectos.setAttribute("type", "button");
   BtnAdinputEfectos.setAttribute("name", "button");
   BtnAdinputEfectos.setAttribute("value", "+");
   PiroDivPanelEfectos.appendChild(BtnAdinputEfectos);
 
 
   BtnAdinputEfectos.onclick = function(){
    alert("Nueva opcion " + inputEfectos.value + " se agrego con exito");
    var option = document.createElement("option");
    option.text = inputEfectos.value;
    option.value = inputEfectos.value;
    var select = document.getElementById("Select_piro_efectos");
    select.appendChild(option);
   
    return false;
    };
    /////////////fin btn add efectos
    
///////fin PiroDivPanelEfectos select efectos y checkbox ////////////////////////    

////panel PiroDivPanel cadencia /////////////////////////////////////////////////
var div_cadencia = document.createElement('div');
div_cadencia.id = 'PiroDivPanelCadencia';
div_cadencia.setAttribute('class', 'class_PiroDiv');
div_cadencia.innerText = "Cadencia";
if (!ui.editor.chromeless){div_cadencia.setAttribute('class', 'class_PiroDivPanelCadencia class_PiroDiv');}
document.body.appendChild(div_cadencia);
/////fin PiroDivPanelCadencia /////////////////////////////////////////////////
   
///////PiroDivPanelCadencia select cadencia y checkbox ////////////////////////
var PiroDivPanelCadencia = document.getElementById("PiroDivPanelCadencia");
var checkbox_selectList_piro_cadencia = document.createElement("input");
checkbox_selectList_piro_cadencia.setAttribute("type", "checkbox");
checkbox_selectList_piro_cadencia.setAttribute("id", "idcheckbox_selectList_piro_cadencia");
checkbox_selectList_piro_cadencia.setAttribute("name", "checkbox_selectList_piro_cadencia");
checkbox_selectList_piro_cadencia.setAttribute("value", "ff");
// cambiar a true para que salga por defetcto activado
checkbox_selectList_piro_cadencia.checked = false; 
PiroDivPanelCadencia.appendChild(checkbox_selectList_piro_cadencia); 
//array de options
var array_piro_cadencia = ['0','1','2','3','4','5'];
//Create and append select list
var selectList_piro_cadencia = document.createElement("select");
selectList_piro_cadencia.setAttribute("id", "Select_piro_cadencia");
PiroDivPanelCadencia.appendChild(selectList_piro_cadencia);
//Create and append the options
for (var i = 0; i < array_piro_cadencia.length; i++)
	{
		var option = document.createElement("option");
		option.setAttribute("value", array_piro_cadencia[i]);
		option.text = array_piro_cadencia[i];
		selectList_piro_cadencia.appendChild(option);
	}
 
 
///////fin PiroDivPanelCadencia select cadencia y checkbox ////////////////////////

////panel PiroDivPanelLinea /////////////////////////////////////////////////
var div_lineas = document.createElement('div');
div_lineas.id = 'PiroDivPanelLineas';
div_lineas.setAttribute('class', 'class_PiroDiv');
div_lineas.innerText = "Lineas";
if (!ui.editor.chromeless){div_lineas.setAttribute('class', 'class_PiroDivPanelLineas class_PiroDiv');}
document.body.appendChild(div_lineas);
/////fin PiroDivPanelLineas /////////////////////////////////////////////////

///////PiroDivPanelLinea select  y checkbox ////////////////////////
var PiroDivPanelLinea = document.getElementById("PiroDivPanelLineas");
var checkbox_selectList_piro_lineas = document.createElement("input");
checkbox_selectList_piro_lineas.setAttribute("type", "checkbox");
checkbox_selectList_piro_lineas.setAttribute("id", "idcheckbox_selectList_piro_lineas");
checkbox_selectList_piro_lineas.setAttribute("name", "checkbox_selectList_piro_lineas");
checkbox_selectList_piro_lineas.setAttribute("value", "ff");
// cambiar a true para que salga por defetcto activado
checkbox_selectList_piro_lineas.checked = false; 
PiroDivPanelLinea.appendChild(checkbox_selectList_piro_lineas); 
//array de options
 
//Create and append select list
var selectList_piro_lineas = document.createElement("input");
selectList_piro_lineas.setAttribute("id", "Select_piro_lineas");
PiroDivPanelLinea.appendChild(selectList_piro_lineas);
//Create and append the options 
///////fin PiroDivPanelLinea select   y checkbox ////////////////////////

////panel PiroDivPanelviewer /////////////////////////////////////////////////
var div_viewer = document.createElement('div');
div_viewer.id = 'PiroDivPanelViewer';
div_viewer.setAttribute('class', 'class_PiroDiv');
div_viewer.innerText = "Label";
if (!ui.editor.chromeless){div_viewer.setAttribute('class', 'class_PiroDivPanelViewer class_PiroDiv');}
document.body.appendChild(div_viewer);
/////fin PiroDivPanelviewers /////////////////////////////////////////////////
   
///////PiroDivPanelviewer select viewer y checkbox ////////////////////////
var PiroDivPanelViewer = document.getElementById("PiroDivPanelViewer");
var checkbox_selectList_piro_viewer = document.createElement("input");
checkbox_selectList_piro_viewer.setAttribute("type", "checkbox");
checkbox_selectList_piro_viewer.setAttribute("id", "idcheckbox_selectList_piro_viewer");
checkbox_selectList_piro_viewer.setAttribute("name", "checkbox_selectList_piro_viewer");
checkbox_selectList_piro_viewer.setAttribute("value", "ff");
// cambiar a true para que salga por defetcto activado
checkbox_selectList_piro_viewer.checked = false; 
PiroDivPanelViewer.appendChild(checkbox_selectList_piro_viewer); 
//array de options
var array_piro_viewer = ['Name', 'Disp','Cad','Fx','Line','Line+Fx+Cad','Fx+Line','Name+Fx+Line','Full'];
//Create and append select list
var selectList_piro_viewer = document.createElement("select");
selectList_piro_viewer.setAttribute("id", "Select_piro_viewer");
PiroDivPanelViewer.appendChild(selectList_piro_viewer);
//Create and append the options
for (var i = 0; i < array_piro_viewer.length; i++)
	{
		var option = document.createElement("option");
		option.setAttribute("value", array_piro_viewer[i]);
		option.text = array_piro_viewer[i];
		selectList_piro_viewer.appendChild(option);
	}
///////fin PiroDivPanelviewer select viewer y checkbox ////////////////////////


////panel PiroDivPaneltimeline /////////////////////////////////////////////////
var div_timeline = document.createElement('div');
div_timeline.id = 'PiroDivPanelTimeline';
div_timeline.setAttribute('class', 'class_PiroDiv');
div_timeline.innerText = "TimeLine";
if (!ui.editor.chromeless){div_timeline.setAttribute('class', 'class_PiroDivPanelTimeline class_PiroDiv');}
document.body.appendChild(div_timeline);
/////fin PiroDivPaneltimelines /////////////////////////////////////////////////
   
///////PiroDivPaneltimeline select timeline y checkbox ////////////////////////
var PiroDivPanelViewer = document.getElementById("PiroDivPanelTimeline");
var checkbox_selectList_piro_timeline = document.createElement("input");
checkbox_selectList_piro_timeline.setAttribute("type", "checkbox");
checkbox_selectList_piro_timeline.setAttribute("id", "idcheckbox_selectList_piro_timeline");
checkbox_selectList_piro_timeline.setAttribute("name", "checkbox_selectList_piro_timeline");
checkbox_selectList_piro_timeline.setAttribute("value", "ff");
// cambiar a true para que salga por defetcto activado
checkbox_selectList_piro_timeline.checked = false; 
PiroDivPanelViewer.appendChild(checkbox_selectList_piro_timeline); 
//array de options
var array_piro_timeline = ['Normal','Duplicado'];
//Create and append select list
var selectList_piro_timeline = document.createElement("select");
selectList_piro_timeline.setAttribute("id", "Select_piro_timeline");
PiroDivPanelViewer.appendChild(selectList_piro_timeline);
//Create and append the options
for (var i = 0; i < array_piro_timeline.length; i++)
	{
		var option = document.createElement("option");
		option.setAttribute("value", array_piro_timeline[i]);
		option.text = array_piro_timeline[i];
		selectList_piro_timeline.appendChild(option);
	}
///////fin PiroDivPaneltimeline select viewer y checkbox ////////////////////////


//funciones recount alls objects///////////////////////////////////////////////////////
//funcion que recorera todos los objetos recogera en arrays los valores
//funciones para current cell  //////////////////////////////////////////////////////

var highlight = new mxCellHighlight(graph, '#00ff00', 8);

function cellClicked(cell)
	{
		// Forces focusout in IE
		graph.container.focus();
        
		// Gets the selection cell
		if (cell == null)
		{
			highlight.highlight(null);
			div_tag.innerHTML = '<p><i>Selecciona un objeto ...</i></p>';
		}
		else
		{                                  
  //show id propia cell  IMPORTANTE tiene forma de hash autoincrement cambia si cambiamos de pagina
  //lo que no cambia es el id del stencil-shape osea el objeto o figura xml importado e instanciado 
  //podemos asi diferenciar o agrupar para poder contar nuestras figuras  ejemplo para filtrado  shape=stencil
  var styleshape = cell.style;
 // var patron = "shape=stencil(";// patro para difenciar los objetos de drawio de los nuestros
 // if (styleshape.indexOf(patron) > -1){ styleshape = styleshape.substr(380,7) ;} // esto acorta el id de nuestro objeto xml
  var selfId =  cell.id;
 // alert(selfId);
   ///////////////////////////////////////////////////obteniendo attributos de los custom-shapes y guardando en vars  
 var cellgetatlab = cell.getAttribute('label'); //obtine el label del shape
 var cellgetatName = cell.getAttribute('Name');
 var cellgetatEfecto = cell.getAttribute('Efecto');
 var cellgetatCadencia  = cell.getAttribute('Cadencia');
 var cellgetatLinea  = cell.getAttribute('Linea');
 var cellgetatDisparos  = cell.getAttribute('Disparos');
 var cellgetatTimeLine = cell.getAttribute('TimeLine');
 ///////////// agrupar los tipos de Name para contar cuantos hay de cada uno
 //// array con los diferentes names y un contador para cada name repetido
//array_piro_id = [];//vaciamos el array de id de figuras que declaramos priviamente fuera de function cellClicked(cell)
//array_piro_name = [];//vaciamos el array de name de figuras que declaramos previamente fuera de esta function cellClicked(cell)
var add_array_piro_name = array_piro_name.push(cellgetatName); // empujamos nuevo valor name al array de names 
var add_array_piro_id = array_piro_id.push(selfId); // empujamos nuevo valor name al array de names
var add_array_piro_lineas = array_piro_lineas.push(cellgetatLinea); // empujamos nuevo valor name al array de names

//alert(parseInt(cellgetatDisparos));
//alert(parseInt(cellgetatCadencia));
//if (cellgetatDisparos == null || cellgetatCadencia == null){alert('Alguna de las figuras no tiene cadencia asignada');}
if (cellgetatTimeLine == 'Normal'){
var selTime = parseInt(cellgetatDisparos) * parseInt(cellgetatCadencia);// multiplica disparos x cadencia , da nan si aun no tiene algun valor 
var add_array_piro_id_time = array_piro_id_time.push(selTime); //enpuja un nuevo valor al array de tiempos
}
//alert(selTime);
//var array_piro_name_count = [];
  
// alert(contadorNombre);
     	//for (var i = 0; i < array_piro_name.length; i++){
       //if (array_piro_name == array_piro_name ){ array_piro_name_count.push(); };
//alert(cantidadNombres);

      //};
 
 ////////////////////////////////// log de variables

 //mxLog.debug(array_piro_id);
  // mxLog.debug(selfId);
  // mxLog.debug(styleshape);
  // mxLog.debug(cellgetatName);
  // mxLog.debug(cellgetatDisparos);
  // mxLog.debug(cellgetatEfecto);
  // mxLog.debug(cellgetatCadencia);
  // mxLog.debug(cellgetatLinea);
  //mxLog.debug(cellgetatlab);
  ////fin show id
   
			var attrs = (cell.value != null) ? cell.value.attributes : null;
   

            if (attrs != null)
			{
                   ///////////// cambiar atributo efecto segun select y checkbox
                    var rec_piro_efecto = document.getElementById("Select_piro_efectos").value;
                    var rec_piro_efecto_check = document.getElementById("idcheckbox_selectList_piro_efectos").checked;
                    var rec_piro_viewer_sel = document.getElementById("Select_piro_viewer").value;
                    if (rec_piro_efecto_check == true)               
                   {
                      // var cell = evt.getProperty("cell");

                       cell.setAttribute("Efecto", rec_piro_efecto);
                      // cell.setAttribute('label', rec_piro_viewer_sel);
                      // cell.setAttribute('label', strLabelCustom);///muestra label ejemplo %Atributos%
                       graph.refresh();
					   
                   }
                   //////////////fin cambiar atributo efecto segun select y checkbox
				   
				    ///////////// cambiar atributo cadencia segun select y checkbox
                    var rec_piro_cadencia = document.getElementById("Select_piro_cadencia").value;
                    var rec_piro_cadencia_check = document.getElementById("idcheckbox_selectList_piro_cadencia").checked;
                    var rec_piro_viewer_sel = document.getElementById("Select_piro_viewer").value;
                    if (rec_piro_cadencia_check == true)               
                   {
                      // var id =  cell.id;
                       cell.setAttribute("Cadencia", rec_piro_cadencia);
                   //  cell.setAttribute('label', rec_piro_cadencia);
                    //   cell.setAttribute('label', rec_piro_viewer_sel);///muestra label ejemplo %Atributos%
                       graph.refresh();
					   
                   }
                   //////////////fin cambiar atributo cadencia segun select y checkbox
                   
                   				    ///////////// cambiar atributo lineas segun select y checkbox
                    var rec_piro_lineas = document.getElementById("Select_piro_lineas").value;
                    var rec_piro_lineas_check = document.getElementById("idcheckbox_selectList_piro_lineas").checked;
                    var rec_piro_viewer_sel = document.getElementById("Select_piro_viewer").value;
                    if (rec_piro_lineas_check == true)               
                   {
                      // var id =  cell.id;
                       cell.setAttribute("Linea", rec_piro_lineas);
                     //  cell.setAttribute('label', rec_piro_lineas);
                    //   cell.setAttribute('label', rec_piro_viewer_sel);///muestra label ejemplo %Atributos%
                       graph.refresh();
					   
                   }
                   //////////////fin cambiar atributo cadencia segun select y checkbox
                   
                   
                 ///////////// cambiar visor
                 
                   //Name','Cad','Fx','Line','Name+Fx+Line'
                    var rec_piro_viewer_sel = document.getElementById("Select_piro_viewer").value;
                    switch (rec_piro_viewer_sel){
                     case "Name":
                      rec_piro_viewer_sel = "%Name%";
                      break;
                     case "Disp":
                      rec_piro_viewer_sel = "%Disparos%";
                      break;                     
                     case "Cad":
                      rec_piro_viewer_sel = "%Cadencia%";
                      break;
                     case "Fx":
                      rec_piro_viewer_sel ="%Efecto%";
                      break;                     
                     case "Line":
                      rec_piro_viewer_sel ="%Linea%";
                      break;
                     case "Fx+Line":
                      rec_piro_viewer_sel ="%Efecto% %Linea%";
                      break;
                     case "Line+Fx+Cad":
                      rec_piro_viewer_sel ="%Linea% %Efecto% %Cadencia%";
                      break;                     
                     case "Name+Fx+Line":
                      rec_piro_viewer_sel ="%Name% %Efecto% %Linea%";
                      break;
                     case "Full":
                      rec_piro_viewer_sel ="%Name% %Disparos% %Cadencia% %Efecto% %Linea%";
                      break;                      
                     default:
                      rec_piro_viewer_sel = "%Name%";
                     
                    }
                    
                   var rec_piro_viewer_check= document.getElementById("idcheckbox_selectList_piro_viewer").checked;
                    if (rec_piro_viewer_check == true)               
                   {
                      // var id =  cell.id;
                     
                     //  cell.setAttribute('label', rec_piro_lineas);
                       cell.setAttribute('label', rec_piro_viewer_sel);///muestra label ejemplo %Atributos%
                       graph.refresh();
					   
                   }
                   //////////////fin cambiar visor
                   
                   
                   				    ///////////// cambiar atributo timeline segun select y checkbox
                    var rec_piro_timeline = document.getElementById("Select_piro_timeline").value;
                    var rec_piro_timeline_check = document.getElementById("idcheckbox_selectList_piro_timeline").checked;
                    var rec_piro_viewer_sel = document.getElementById("Select_piro_viewer").value;
                    if (rec_piro_timeline_check == true)               
                   {
                      // var id =  cell.id;
                       cell.setAttribute("TimeLine", rec_piro_timeline);
                   //  cell.setAttribute('label', rec_piro_cadencia);
                    //   cell.setAttribute('label', rec_piro_viewer_sel);///muestra label ejemplo %Atributos%
                       graph.refresh();
					   
                   }
                   //////////////fin cambiar atributo cadencia segun select y checkbox
                   
                
				var ignored = ['label', 'tooltip', 'placeholders'];
				highlight.highlight(graph.view.getState(cell));
				var label = graph.sanitizeHtml(graph.getLabel(cell));
				 				
				if (label != null && label.length > 0)
				{
					div_tag.innerHTML = '<h3>' + label + '</h3>';
					
					
				}
				else
				{
					div_tag.innerHTML = '';
					 
				}
				
				for (var i = 0; i < attrs.length; i++)
				{
					if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 &&
						attrs[i].nodeValue.length > 0)
					{
						div_tag.innerHTML += '<h4>' + graph.sanitizeHtml(attrs[i].nodeName) + '</h4>' +
							'<p>' + graph.sanitizeHtml(attrs[i].nodeValue) + '</p>';
					}
				}
			}
		}
	};

	/**
	 * Creates the textfield for the given property.
	 */
	function createTextField(graph, form, cell, attribute)
	{
		var input = form.addText(attribute.nodeName + ':', attribute.nodeValue);

		var applyHandler = function()
		{
			var newValue = input.value || '';
			var oldValue = cell.getAttribute(attribute.nodeName, '');

			if (newValue != oldValue)
			{
				graph.getModel().beginUpdate();
                
                try
                {
                	var edit = new mxCellAttributeChange(
                           cell, attribute.nodeName,
                           newValue);
                   	graph.getModel().execute(edit);
                   	graph.updateCellSize(cell);
                }
                finally
                {
                    graph.getModel().endUpdate();
                }
			}
		}; 

		mxEvent.addListener(input, 'keypress', function (evt)
		{
			// Needs to take shift into account for textareas
			if (evt.keyCode == /*enter*/13 &&
				!mxEvent.isShiftDown(evt))
			{
				input.blur();
			}
		});

		if (mxClient.IS_IE)
		{
			mxEvent.addListener(input, 'focusout', applyHandler);
		}
		else
		{
			// Note: Known problem is the blurring of fields in
			// Firefox by changing the selection, in which case
			// no event is fired in FF and the change is lost.
			// As a workaround you should use a local variable
			// that stores the focused field and invoke blur
			// explicitely where we do the graph.focus above.
			mxEvent.addListener(input, 'blur', applyHandler);
		}
	};
	
	graph.click = function(me)
	{
		// Async required to enable hyperlinks in labels
		window.setTimeout(function()
		{
			cellClicked(me.getCell());
		}, 0);
	};
//fin funciones para current cell  //////////////////////////////////////////////////////





////Custom menu ////////////////////////////////////////////////////////////////////////////////////////
//// Adds resource for action
mxResources.parse('pyroAction1=Procesar');
mxResources.parse('pyroAction2=Resultados');
mxResources.parse('pyroAction3=PyroAction3');
///accion botton1
ui.actions.addAction('pyroAction1', function() {
//var patron = "shape=stencil(";  ///patron que usan los objetos creados
//var styleshape = cell.style;  ///
//if (styleshape.indexOf(patron) > -1){ var styleshape = styleshape.substr(380,6) ;}
//var  cellsdetect = graph.getChildCells(graph.getDefaultParent());  // muestra tantos objetos como haya en la pagina donde estemos , tiene q ser de todas paginas
//var  cellsdetect = graph.getChildVertices(graph.getDefaultParent());  // muestra tantos objetos como haya
// var totalcellsdetect = 0;
	//for (var i = 0; i < cellsdetect.length; i++)
	  //{
		//totalcellsdetect++;    
	 // }
   //mxLog.show();
   //mxLog.debug(totalcellsdetect);
   //mxUtils.alert("Se detectaron " + totalcellsdetect + " objetos ");
      
var model = graph.getModel();
var parent = graph.getDefaultParent();
var index = model.getChildCount(parent);
var labelcell = graph.getChildVertices(graph.getDefaultParent()); //devuelve tantos objetos como hijos tiene un parent
//IMPORTANTE llama ala funcion cell desde aqui manejar los objetos de un padre sacar id y shape para agrupar i contar cada tipo 
// graph.getChildVertices(graph.getDefaultParent()).forEach(cellClicked); //clase que llama a funcion cell para cada hijo de defaultparent
array_piro_id = [];//vaciamos el array de id de figuras que declaramos priviamente fuera de function cellClicked(cell)
array_piro_name = [];//vaciamos el array de name de figuras que declaramos previamente fuera de esta function cellClicked(cell)
array_piro_id_time = [];
array_piro_lineas = [];
 
var  analizaHijos = graph.getChildVertices(graph.getDefaultParent()).forEach(cellClicked);


//var idIndex = model.getId(parent);
//alert(idIndex);
//mxLog.debug(labelcell);
// mxLog.debug(array_piro_id);
//array_piro_id = selfId;    
//alert(array_piro_name);  
   
   
 });
///fin accion botton1

///accion botton2	
ui.actions.addAction('pyroAction2', function() {
  // mxUtils.alert('Pyro Menu vacio2');
    /////funcion repetidos que busca nombres iguales dentro de un array y nos dice cuantos hay de cada uno  
    function buscarRepes(para) {
      var countRepes = {};
      para.forEach(function(para) {
      countRepes[para] = (countRepes[para] || 0) + 1;
      });
      return countRepes;
    }   
     
  // mxLog.debug(buscarRepes(array_piro_name));
   // console.log(buscarRepes(str));
  //  console.log(buscarRepes(array_piro_name));//muestra en un array todos los names y cuantos de cada uno
    ////////////////////////////////////////////////////////////////
   // var array_piro_name_unicos = [buscarRepes(array_piro_name)];
    
     //mxLog.debug(array_piro_name_unicos);
  //  mxLog.debug(forEach.buscarRepes(array_piro_name));
 
 



    
       //if (array_piro_name == array_piro_name ){ array_piro_name_countRepes.push(); };
//alert(cantidadNombres);
      
 // console.log(JSON.stringify(buscarRepes(array_piro_name)));
  //console.log(buscarRepes(array_piro_name));
      // alert(buscarRepes(array_piro_name));
    // Object.keys(buscarRepes(array_piro_name)).forEach(e => console.log(`key=${e}  value=${buscarRepes(array_piro_name)[e]}`));
    // Object.keys(buscarRepes(array_piro_name)).forEach(e => mxLog.debug(`key=${e}  value=${buscarRepes(array_piro_name)[e]}`));
     for (var i = 0, sumTime = 0; i < array_piro_id_time.length; sumTime += array_piro_id_time[i++]); /// suma total time del array id_time
      Object.keys(buscarRepes(array_piro_name)).forEach(e => mxLog.debug(`${e}  ${buscarRepes(array_piro_name)[e]}`));
    // mxLog.debug(array_piro_id_time).forEach(array_piro_id_time++);
      mxLog.debug('time total ' + sumTime/60 + 'min.');
      // mxLog.debug(array_piro_lineas);  
  /////////fin funcion repetidos que busca nombres iguales dentro de un array y nos dice cuantos hay de cada uno
   
   ///////////////popup output//////////////////////
   // alert('SALIDA'); //tested - ouputs 'blah blah'
      var popup = window.open('output.html',"'SALIDA'",'height=300,width=300,location=no,resizable=yes,scrollbars=yes');       
  var element = document.createElement('div');
  element.setAttribute('id', 'mydiv');
  //element.appendChild(document.createTextNode('blah blah'));
  //element.appendChild(document.createTextNode);
  Object.keys(buscarRepes(array_piro_name)).forEach(e => element.appendChild(document.createTextNode(`${e}  ${buscarRepes(array_piro_name)[e]}`)) + element.appendChild(document.createElement("br")) );

  popup.window.onload = function() {

      var win = popup.document.body;
      win.appendChild(element);
      win.appendChild(document.createTextNode('time total ' + sumTime/60 + 'min.')); /// tiempo estimado de todas las figuras 
      var el = popup.window.document.getElementById('mydiv').innerHTML;
      //alert(el); //tested - ouputs 'blah blah'
      
 };
    ///////////////popup output//////////////////////  
   
   
   
   });
///fin accion botton2

///accion botton3	
ui.actions.addAction('pyroAction3', function() {
    mxUtils.alert('Pyro Menu vacio3');
  


  
   });
///fin accion botton3
 
//// Adds menu
ui.menubar.addMenu('PyroMenu', function(menu, parent) {
    ui.menus.addMenuItem(menu, 'pyroAction1');
			 ui.menus.addMenuItem(menu, 'pyroAction2');
			 ui.menus.addMenuItem(menu, 'pyroAction3');
			 
   });
//// fin Adds menu

//// Reorders menubar
    ui.menubar.container.insertBefore(ui.menubar.container.lastChild,
    ui.menubar.container.lastChild.previousSibling.previousSibling);
////fin Custom menu //////////////////////////////////////////////////////////////////////////////////////




	
});
// FIN FUNCION UI MAIN //////////////////////////////////////////////////////////////////////////////////////