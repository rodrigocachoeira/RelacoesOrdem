function Results(){
	this.minimumElements;
	this.maximumElements;
	this.lowerLimit;
	this.maximumLimit;
	this.higherBorders;
	this.lowerBorders;
	this.minimumHigherBorder;
	this.maximumLowerBorder;
}


/**
 * Realiza o print de um simples array contendo
 * nodos
 * 
 * @param  Array elements
 * @return String
 */
Results.prototype.simplePrint = function( elements ){
	var string = "";
	if( elements == undefined || elements.length == 0  ){
		return "Não existe";
	}
	for( var i = 0; i < elements.length; i++ ){
		string += elements[i] + " ";
	}

	return string;
}


/**
 * Realiza o print dos elementos
 * 
 * @param  Array | Object  elements
 * @return String
 */
Results.prototype.print = function( elements ){
	var string = "";
	if( elements == undefined ){
		return "Não existe";
	}else if( elements.value != undefined ){
		return elements.value;
	}
	for( var i = 0 ; i < elements.length; i++ ){
		string +=" "+elements[i].value;
		if( i + 1 < elements[i].length ){
			string +=" ,";
		}
	}
	return string;
}


/**
 * Realiza a chamada de todos os métodos
 * de cálculos possiveis com a definição
 * do diagrama de ordem
 * 
 * @return void
 */
Results.prototype.calculate = function(){
	App.Results.calcMinimumElements();
	App.Results.calcMaximumElements();
	App.Results.calcLowerLimit();
	App.Results.calcMaximumLimit();
}


/**
 * Realiza o cálculo das fronteiras
 * 
 * @param  array elements elementos informados pelo usuário
 * @return void
 */
Results.prototype.borders = function( elements ){
	App.Results.calcHigherBorders( elements );
	App.Results.calcLowerBorders( elements );
}


/**
 * Realiza o cálculo e retorna os elementos minimos
 *
 * Um nodo é considerado elemento minimo quando não há
 * nenhum outro nodo precedendo-o. 
 * 
 * @return Array[Object]
 */
Results.prototype.calcMinimumElements 	 = function(){
	this.minimumElements = new Array(); // resetando / instanciando

	var elements = $("input[type=radio]").not(".hidden"); //seleciona apenas os elementos visiveis
	for( var i = 0; i < elements.length; i++ ){
		var nodo = nodes[ App.Nodes.getVectorX( elements[i] ) ][ App.Nodes.getVectorY( elements[i] ) ];
		if( nodo.before.length == 0 ){
			this.minimumElements[ this.minimumElements.length ] = nodo;
		}
	}
}


/**
 * Realiza o cálculo e retorna os elementos máximos
 *
 * Um nodo é considerado elemento máxima quando não há
 * nenhum outro elemento após ele.
 * 
 * @return Array[Object]
 */
Results.prototype.calcMaximumElements 	 = function(){
	this.maximumElements = new Array(); // resetando/instanciando

	var elements = $("input[type=radio]").not(".hidden"); //seleciona apenas os elementos visiveis
	for( var i = 0; i < elements.length; i++ ){
		var nodo = nodes[ App.Nodes.getVectorX( elements[i] ) ][ App.Nodes.getVectorY( elements[i] ) ];
		if( nodo.after.length == 0 ){
			this.maximumElements[ this.maximumElements.length ] = nodo;
		}
	}
}


/**
 * Realiza o cálculo e retorna o elemento minímo
 *
 * Um nodo é considerado limite minimo quando tal 
 * pertence ao conjunto dos elemento minimos e este precede
 * todos os outros elementos do digrama 
 * 
 * @return Object
 */
Results.prototype.calcLowerLimit 		 = function(){
	if( this.minimumElements.length == 1 ){
		this.lowerLimit =  this.minimumElements[0];
	}else{
		this.lowerLimit = undefined;
	}
}


/**
 * Realiza o cálculo e retorna o elemento máximo
 *
 * Um nodo é considerado limite máxima quando tal
 * pertence ao conjunto dos elementos máximo e este
 * é precedido por todos os outros elementos
 * 
 * @return Object
 */
Results.prototype.calcMaximumLimit 		 = function(){
	if( this.maximumElements.length == 1 ){
		this.maximumLimit =  this.maximumElements[0];
	}else{
		this.maximumLimit = undefined;
	}
}


/**
 * Realiza o cálculo e retorna as fronteiras superiores
 *
 * Os nodos são fronteiras superiores de um ou mais nodos informados
 * quando estes são precedidos por todos estes nodos informados
 *
 * @param array  elements  	 	nodos do conjunto
 * @return Array[Object]
 */
Results.prototype.calcHigherBorders  	= function( elements ){
	var events = 0;

	var set;
	var setsDescriptions = [];
	var higherBorders = [];

	for( var i  = 0; i < elements.length; i++ ){
		 set = new Object();
		 set = App.Rules.after( elements[i] , [] );
		 set[set.length] = elements[i];  	// Adiciona o próprio elemento (regra da reflexividade)

		 setsDescriptions[i] = App.Nodes.getDescriptionsOnly( set);
	}

	this.higherBorders = App.Nodes.clearArray( App.Rules.intersection( App.Nodes.getAllDescription() , setsDescriptions ) );
}


/**
 * Realiza o cálculo e retorna as fronteiras inferiores
 *
 * Os nodos são fronteiras inferiores de um ou mais nodos informados
 * quando estes são precedentes de todos estes nodos informados
 *
 * @param array elements      nodos do conjunto
 * @return Array[Object]
 */
Results.prototype.calcLowerBorders  	= function( elements ){
	var events = 0;

	var set;
	var setsDescriptions = [];
	var lowerBorders = [];

	for( var i  = 0; i < elements.length; i++ ){
		 set = new Object();
		 set = App.Rules.before( elements[i] , [] );
		 set[set.length] = elements[i];  	// Adiciona o próprio elemento (regra da reflexividade)

		 setsDescriptions[i] = App.Nodes.getDescriptionsOnly( set);
	}

	this.lowerBorders = App.Nodes.clearArray( App.Rules.intersection( App.Nodes.getAllDescription() , setsDescriptions ) );
}


/**
 * Realiza o cálculo e retorna a fronteira superior minima
 * 
 * @return Object
 */
Results.prototype.calcMinimumHigherBorder = function(){
	var less = 0;
	var element = "";
	var count = 0;

	// verifica menor número
	for( var i = 0 ; i < this.higherBorders.length; i++ ){
		var poxX = $(App.Nodes.getByDescription( this.higherBorders[i] ).element ).data("x");
		if( i == 0 ){
			less = poxX;
			element = App.Nodes.getByDescription( this.higherBorders[i] ).value;
		}else if( poxX > less  ){
			less = poxX;
			element = App.Nodes.getByDescription( this.higherBorders[i] ).value;
		}
	}
	//verifica se há apenas um desse número na linha
	for( var i = 0; i < this.higherBorders.length; i++ ){
		var poxX = $(App.Nodes.getByDescription( this.higherBorders[i] ).element ).data("x");
		if( poxX == less ){
			count++;
		}
	}
	if( count == 1 ){
		return element;
	}else{
		return "Não Existe";
	}

}


/**
 * Realiza o cálculo e retorna a fronteira inferior máxima
 *
 * @return Object
 */
Results.prototype.calcMaximumLowerBorder  = function(){
	var higher = 0;
	var element = "";
	var count = 0;

	// verifica menor número
	for( var i = 0 ; i < this.lowerBorders.length; i++ ){
		var poxX = $(App.Nodes.getByDescription( this.lowerBorders[i] ).element ).data("x");
		if( i == 0 ){
			higher = poxX;
			element = App.Nodes.getByDescription( this.lowerBorders[i] ).value;
		}else if( poxX < higher  ){
			higher = poxX;
			element = App.Nodes.getByDescription( this.lowerBorders[i] ).value;
		}
	}
	//verifica se há apenas um desse número na linha
	for( var i = 0; i < this.lowerBorders.length; i++ ){
		var poxX = $(App.Nodes.getByDescription( this.lowerBorders[i] ).element ).data("x");
		if( poxX == higher ){
			count++;
		}
	}
	if( count == 1 ){
		return element;
	}else{
		return "Não Existe";
	}
}


/**
 * Realiza o cálculo e retorna se a relação de ordem é um reticulado
 * 
 * @return Boolean
 */
Results.prototype.isReticulate           = function(){
	var allElements = App.Nodes.getAllDescription();
	for( var i = 0; i < allElements.length; i++ ){
		for( var j = i + 1; j < allElements.length; j++ ){
			App.Results.borders( App.Nodes.descriptionToElements( [ allElements[i] , allElements[j] ]  ) );
			if( ( App.Results.calcMinimumHigherBorder() === "Não Existe" ) || (App.Results.calcMaximumLowerBorder() === "Não Existe" )  ){
				return false;
			}
		}
	}
	return true;
}


