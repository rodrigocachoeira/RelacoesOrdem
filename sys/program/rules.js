function Rules(){
}


/**
 * verifica se a realação atende as regras de anti-simetria
 * aRb && bRa -> a == b
 * 
 * @param  Object   origin      
 * @param  Object   destination 
 * @return boolean 
 */
Rules.prototype.antiSimmetry = function( origin , destination ){
	return App.Nodes.getVectorX(origin) > App.Nodes.getVectorX(destination);
}


/**
 * verifica se a realação atende as regras de reflexividade
 * aRa
 * 
 * @param  Object   origin      
 * @param  Object   destination 
 * @return boolean 
 */
Rules.prototype.reflective = function( origin , destination ){
	return App.Nodes.getVectorX(origin) == App.Nodes.getVectorX(destination) && App.Nodes.getVectorY(origin) == App.Nodes.getVectorY(destination);
}


/**
 * Verifica se a realação atende as regras da transitividade 
 * aRb && bRc -> aRc
 * 
 * @param  Object   origin      
 * @param  Object   destination 
 * @return boolean
 */
Rules.prototype.transitivity = function( origin , destination ){
	var nodo = nodes[  App.Nodes.getVectorX(origin) ][  App.Nodes.getVectorY(origin) ];	
	var test = true;

	if( nodo.after.length == 0 ){
		return true;
	}else{
		for( var i = 0; i < nodo.after.length; i++ ){
			if( $(nodo.after[i].elementDoc).attr("name") == $(nodes[  App.Nodes.getVectorX(destination) ][  App.Nodes.getVectorY(destination) ].element ).attr("name") ){
				return confirm( "Este elemento já relacionado segundo as regras da transitividade, você realmente deseja ligá-los?" );
			}else{
				test = test && App.Rules.transitivity( nodo.after[i].elementDoc , destination ) ;
			}
		}
	}
	return test;
}


/**
 * Selecione os elementos subsequentes do elemento passado como parâmetro
 * através de uma funçao recursiva
 * 
 * @param  Object element
 * @param  Array set
 * @return Array
 */
Rules.prototype.after = function( element , set){
	if( element.after == undefined ){
		return set;
	}else{
		for( var i = 0; i < element.after.length; i++ ){
			set[ set.length  ] = element.after[i].elementVector;
			set = this.after( element.after[i].elementVector , set);
		}
	}
	return set;
}


/**
 * Selecione os elementos antecedentes do elemento passado como parâmetro
 * através de uma funçao recursiva
 * 
 * @param  Object element
 * @param  Array set
 * @return Array
 */
Rules.prototype.before = function( element , set){
	if( element.before == undefined ){
		return set;
	}else{
		for( var i = 0; i < element.before.length; i++ ){
			set[ set.length  ] = element.before[i].elementVector;
			set = this.before( element.before[i].elementVector , set);
		}
	}
	return set;
}



/**
 * Retorna a intersecção de vários conjuntos contidos em um array
 * com o seguinte formato [0] => [ "A", "B"] , [1] => [ "A" , "C" ]
 *
 * @param Array elements
 * @return Array
 */

Rules.prototype.intersection = function( elements , sets ){
	var intersection = Array();
	var find = false;
	var count = 0;

	for( var i = 0; i < elements.length; i++ ){ //elementos que serão comparados
		for( var j = 0; j < sets.length; j++ ){ //percorre os conjuntos
			for( var k = 0; k < sets[j].length; k++ ){ //percorre todos os elementos do conjunto em questão
				if( elements[i] == sets[j][k] ){
					count++;
				}
			}
		}
		if( count >= sets.length ){ //o elemento foi encontrado em todos os conjuntos
			intersection[ i ] = elements[i];
		}
		count = 0; //zerando o contador para nova verificação
	}

	return intersection;
}