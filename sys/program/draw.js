function Draw(){
	this.canvas = document.getElementById("Canvas");
	this.canvas.width = boxSize;
	this.canvas.height = boxSize;

	this.flag = false;
	this.elementOrigin;
}


/**
 * Solicita um desenho de uma linha entre dois
 * nodos
 * 
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
Draw.prototype.line = function( element ){
	if( this.flag ){
		this.destination( element );
	}else{
		this.origin( element );
	}
	
}


Draw.prototype.removeActivateToDraw = function(){
	var inputs = $(".inputs").find("input[type='radio']");
	for( var i = 0; i < inputs.length; i++ ){
		if( inputs[i].checked ){
			$(inputs[i]).removeClass("activateToDraw");
		}
	}
	this.flag = false;
	this.elementOrigin = null;
}


/**
 * Define o elemento de origem para desenhar a linha
 * 
 * @param  Object element   elemento do documento [nodo]
 * @return void
 */
Draw.prototype.origin = function( element ){
	this.flag = true;

	this.elementOrigin = element;
	$(element).addClass("activateToDraw"); //element selected
}


/**
 * Define o elemento de destino para desenhar a linha
 * 
 * @param  Object   element  elemento do documento [nodo]
 * @return void
 */
Draw.prototype.destination = function( element ){
	if( App.Rules.antiSimmetry( this.elementOrigin , element ) ){
		if( App.Rules.transitivity( this.elementOrigin , element ) ){
			this.flag = false;
			this.drawLine( element ); //desenha a linha
			$(this.elementOrigin).removeClass("activateToDraw"); //element selected
			App.Nodes.addRelation( this.elementOrigin , element );

			this.elementOrigin = null;
		}
	}else if( App.Rules.reflective( this.elementOrigin , element ) ){
		alert( "Já está implicito a relação de reflexividade." );
	}else{
		alert( "Operação inválida, a relação de ordem deve atender as regras da anti-simetria" );
	}
}


/**
 * Desenha a linha de acordo com o nodo de origem e o nodo de destino
 * 
 * @param  Object  destination  elemento de destino do documento [nodo]
 * @return void
 */
Draw.prototype.drawLine = function( destination ){
	var ctx = this.canvas.getContext("2d");

	ctx.moveTo( App.Nodes.getX(this.elementOrigin) + errorMargin , App.Nodes.getY(this.elementOrigin) + errorMargin );	// origem
	ctx.lineTo( App.Nodes.getX(destination) + errorMargin , App.Nodes.getY(destination) + errorMargin );				// destino
	ctx.stroke(); //desenha
}


