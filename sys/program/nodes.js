function Nodes(){
}


/**
 * Funções aplicadas ao realizar uma iteração com
 * um nodo
 * 
 * @return void
 */
Nodes.prototype.iteration = function(){
	$($(".node")).click(function(){
		var activeItem = getActivateItem();
		if( activeItem == 2 ){ //remover
			App.Nodes.remove(this);
		}else if( activeItem == 3 ){ //adicionar descrição
			App.Nodes.addDescription(this);
		}else if( activeItem == 4 ){ //	desenhar	
			App.Draw.line(this);
			return false;
		}
	});
}


/**
 * 
 * 
 * @param {[type]} element [description]
 */
Nodes.prototype.addDescription = function( element ){
	var description = prompt( "Informe a descrição do nodo: " );
	var elementDescription = App.Nodes.getDescriptionElement( element );

	if( ! App.Nodes.descriptionEquals( description ) ){
		$(elementDescription).text( description );
		nodes[ $(element).data("x") ][ $(element).data("y") ].value = description;
	}else{
		alert( "Está descrição já está registrada, informe outra" );
		App.Nodes.addDescription( element );
	}
}


/**
 * Remover a seleção de um nodeName
 * 
 * @param  Object element   elemento do documento [nodo]
 * @return void
 */
Nodes.prototype.remove = function( element ){
	var elementDescription = App.Nodes.getDescriptionElement( element );

	var x = $(element).data("x");
	var y = $(element).data("y");

	$(element).attr("checked",false);
	nodes[x][y].value = ""; //limpando a descrição interna do elemento
	$(elementDescription).text("");	 //limpando a descrição gráfica do elemento
}

/**
 * Verifica se a descrição já não está sendo usada
 * 
 * @param  String description
 * @return boolean
 */
Nodes.prototype.descriptionEquals = function( description ){
	var descriptions = $(".description-radio");

	for( var i = 0; i < descriptions.length; i++ ){
		if( $(descriptions[i]).text() == description ){
			return true;
		}
	}
	return false;
}

/**
 * Seleciona a div descrição pertencente ao nodo
 * 
 * @param  Object element nodo
 *                        
 * @return Object div
 */
Nodes.prototype.getDescriptionElement = function( element ){
	var descriptions = $(".description-radio");
	var x = $(element).data("x");
	var y = $(element).data("y");

	for( var i = 0; i < descriptions.length; i++ ){
		var descX = $(descriptions[i]).data("x");
		var descY = $(descriptions[i]).data("y");

		if( x == descX && y == descY ){
			return descriptions[i];
		}
	}
}


/**
 * A partir de um elemento é retorna a posição X do mesmo
 * de acordo com a posição do elemento na tela
 * 
 * @param  Object element   elemento do documento
 * @return int
 */
Nodes.prototype.getX = function( element ){
	var x = $(element).data("x");
	var y = $(element).data("y");

	return nodes[x][y].x;
}


/**
 * A partir de um elemento é retorna a posição y do mesmo
 * de acordo com a posição do elemento na tela
 * 
 * @param  Object element   elemento do documento
 * @return int
 */
Nodes.prototype.getY = function( element ){
	var x = $(element).data("x");
	var y = $(element).data("y");

	return nodes[x][y].y;
}


/**
 * A partir de um elemento é retorna a posição X do mesmo
 * de acordo com o array definido na criação dos nodos
 * 
 * @param  Object element   elemento do documento
 * @return int
 */
Nodes.prototype.getVectorX = function( element ){
	return $(element).data("x");
}


/**
 * A partir de um elemento é retorna a posição y do mesmo
 * de acordo com o array definido na criação dos nodos
 * 
 * @param  Object element   elemento do documento
 * @return int
 */
Nodes.prototype.getVectorY = function( element ){
	return $(element).data("y");
}


/**
 * Cálculo da posição de um nodo
 * Fórmula: P = m+(d*n)-(d/2)
 * [
 * 	m = margem
 * 	d = distância
 * 	n = número do nodo
 * ]
 * 
 * 
 * @param  Integer  distance   
 * @param  Integer  nodeNumber 
 * @return Integer
 */
Nodes.prototype.position = function( distance , nodeNumber ){
	var p = (distance * nodeNumber) - (distance/2);
	return p;
}


/**
 * Cálcula da distância entre cada nodo
 * Fórmula: d = T / N
 * [
 * 	d = distância
 * 	T = Tamanho total da caixa
 * 	N = Quantidade de nodos por fila
 * ]
 * 
 * 
 * @param  Integer totalSize 
 * @param  Integer nodesRow  
 * @return Integer
 */
Nodes.prototype.distance = function( totalSize , nodesRow ){
	var d = totalSize / nodesRow;
	return d;
}


/**
 * Desabilita todos os elemento [nodos] do documento
 * que não estiverem selecionados para facilitar o desenho
 * das linhas
 * 
 * @return void
 */
Nodes.prototype.disableNodes = function(){
	var inputs = $(".inputs").find("input[type='radio']");
	for( var i = 0; i < inputs.length; i++ ){
		if( ! inputs[i].checked ){
			$(inputs[i]).addClass("hidden");
		}
	}
}

/**
 * Converte um array contendo as descrições dos elementos
 * para os elementos em sí que estão armazenados na variável
 * principal " nodes ""
 * 
 * @param  Array description
 * @return Array
 */
Nodes.prototype.descriptionToElements = function( descriptions ){
	var getNodes = new Array();
	var index = 0;
	for( var i = 0; i < descriptions.length; i++ ){
		var node = App.Nodes.getByDescription( descriptions[i] );
		if( node != undefined ){
			getNodes[ index ] = node;
			index++;
		}
	}
	return getNodes;
}


/**
 * Percorre o array principal em busca do elemento
 * compativel ao value informado
 * 
 * @param  String description 
 * @return Object
 */
Nodes.prototype.getByDescription = function ( description ){
	for( var i = 1; i < nodes.length; i++ ){ //linha horizontal
		for( var j = 1; j < nodes[i].length; j++ ){ //linha vertical
			if( nodes[i][j].value == description ){
				return nodes[i][j];
			}		
		}
	}
}


/**
 * Adicionando relações em cada nodo com outros nodos
 * 
 * @param Object element    predecessor
 * @param Object relation   precedente
 * @return void
 */
Nodes.prototype.addRelation = function( element , relation ){
	var sizeElement = nodes[ App.Nodes.getVectorX(element) ][ App.Nodes.getVectorY(element) ].after.length;

	//adicionando as referencias do elemento predecessor
	nodes[ App.Nodes.getVectorX(element) ][ App.Nodes.getVectorY(element) ].after[ sizeElement ] = new Object();
	nodes[ App.Nodes.getVectorX(element) ][ App.Nodes.getVectorY(element) ].after[sizeElement].elementDoc = relation;
	nodes[ App.Nodes.getVectorX(element) ][ App.Nodes.getVectorY(element) ].after[sizeElement].elementVector = nodes[ App.Nodes.getVectorX(relation) ][ App.Nodes.getVectorY(relation) ];

	var sizeRelation = nodes[ App.Nodes.getVectorX(relation) ][ App.Nodes.getVectorY(relation) ].before.length;

	//adicionando as referencias dos elementos precedentes
	nodes[ App.Nodes.getVectorX(relation) ][ App.Nodes.getVectorY(relation) ].before[ sizeRelation ] = new Object();
	nodes[ App.Nodes.getVectorX(relation) ][ App.Nodes.getVectorY(relation) ].before[ sizeRelation ].elementDoc = element;
	nodes[ App.Nodes.getVectorX(relation) ][ App.Nodes.getVectorY(relation) ].before[ sizeRelation ].elementVector = nodes[ App.Nodes.getVectorX(element) ][ App.Nodes.getVectorY(element) ];
}


/**
 * Selecione apenas os valores de um array representando os nodos
 * da relação
 * 
 * @param  Array elements
 * @return Array
 */
Nodes.prototype.getDescriptionsOnly = function( elements ){
	var descriptions = Array();
	for( var i = 0; i < elements.length; i++ ){
		descriptions[i] = elements[i].value;
	}
	return descriptions;
}


/**
 * Seleciona todos os elementos que foram
 * selecionados pelo usuário para representar
 * um nodo na relação
 * 
 * @return Array
 */
Nodes.prototype.getAllDescription = function(){
	var elements = Array();

	var descriptions = $('.description-radio');
	for( var i = 0; i < descriptions.length; i++ ){
		if( $(descriptions[i]).text() != "" ){
			elements[ elements.length ] = $(descriptions[i]).text()
		}
	}

	return elements;
}


/**
 * Realiza a limpeza de um array eliminando os valores indefinidos
 * para melhor manipulação
 * 
 * @param  Array array
 * @return Array
 */
Nodes.prototype.clearArray = function( array ){
	var newArray = Array();
	var index = 0;

	for( var i = 0; i < array.length; i++ ){
		if( array[i] !== undefined ){
			newArray[ index ] = array[i];
			index++;
		}
	}
	return newArray;
}