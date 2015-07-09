function GeneratingNodes(){
	this.boxInputs  		= $("div.box");							//object
	this.canvas     		= document.getElementById("Canvas");
	this.contentBox 		= $("section.content-boxes"); 			//object
	this.radio      		= $('<input>', { type: 'radio' , class : "node" } );
	this.descriptionRadio   = $("<div>" , { class: 'description-radio' , text: '' } );
}


/**
 * Criação dos elementos de contenção dos inputs type radio e do elemento de desenho
 * 
 * @param  Integer quantity  Quantidade de elementos por fila 
 * @return void
 */
GeneratingNodes.prototype.create = function( quantity ){

	$(this.boxInputs).find(".inputs").html(""); //limpa os inputs
	$(this.canvas).html("");    //limpa as linhas

	//rendizando os inputs
	for( var y = 1; y <= quantity; y++ ){ //percorre todos as posições horizontais
		for( x = 1; x <= quantity; x++ ){ //percorre todas as posiçõe verticais

			var input = $(this.radio).clone(); //clona o objeto radio default
			var description = $(this.descriptionRadio).clone();

			var left  = App.Nodes.position( App.Nodes.distance( boxSize , quantity ) , y ); 
			var top   = App.Nodes.position( App.Nodes.distance( boxSize , quantity ) , x );

			$(input).attr( "name" , "radio"+y+"_"+x ).attr("data-x",x).attr("data-y",y).css( "left" , left ).css( "top" , top ); //aplica atributos organizacionais graficamente
			$(description).attr("data-x",x).attr("data-y",y).css( "left" , left + padding ).css( "top" , top ); //aplica atributos organizacionais graficamente

			$(this.boxInputs).find(".inputs").append(input); 		//adiciona graficamente o input
			$(this.boxInputs).find(".inputs").append(description); 	//adiciona graficamente a div de descrição do input

			App.GeneratingNodes.addVector(x,y,left,top,input); //adiciona internamente 
		}
	}
}


/**
 * Adiciona o nodo criado ao vetor principal com seus respectivos valores
 * 
 * @param Integer vectorX  Posição x no vetor
 * @param Integer vectorY  Posição y no vetor
 * @param Integer x 	   Posição x do elemento na tela
 * @param Integer y 	   Posição y do elemento na tela
 * @param OBject  element  elemento do documento [nodo]
 * @return void
 */
GeneratingNodes.prototype.addVector = function( vectorX , vectorY , x , y ,element ){
	if( nodes[vectorX] == undefined ){
		nodes[vectorX] = new Array();
	}
	if( nodes[vectorX][vectorY] == undefined ){
		nodes[vectorX][vectorY] = new Object();
	}	
	//adicionando atributos
	nodes[vectorX][vectorY].value = "";
	nodes[vectorX][vectorY].x = x;
	nodes[vectorX][vectorY].y = y;
	nodes[vectorX][vectorY].before = new Array();
	nodes[vectorX][vectorY].after = new Array();
	nodes[vectorX][vectorY].element = element;
}