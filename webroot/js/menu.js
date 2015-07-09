var activeEl = 0;

/**
 * Controle de iteração com o menu
 */
$(function() {
    var items = $('.btn-nav');
    $( items[activeEl] ).addClass('active');

    $( ".btn-nav" ).click(function() {
    	if( ! $(this).parent().hasClass("opacity-button") ){
    		$( items[activeEl] ).removeClass('active');
	        $( this ).addClass('active');
	        activeEl = $( ".btn-nav" ).index( this );
    	}        
    });

});


/**
 * Aplica as configurações de ativação no menu de acordo com os parametros passados
 * 
 * @param  array    itens  cinco posições, cada posição representando um elemento, 0 para desativo, 1 para ativado
 * @param  Integer  active deixar algum elemento ativado
 * @return void
 */
function apllyActivating( itens , active ){
	var elements = $("#Menu").find("div.btn-group");
	for( var i = 0; i < elements.length; i++ ){
		if( itens[i] == 1 ){
			if( $(elements[i]).hasClass("opacity-button") ){
				$(elements[i]).removeClass("opacity-button");
			}
		}else{
			if( ! $(elements[i]).hasClass("opacity-button") ){
				$(elements[i]).addClass("opacity-button");
			}
		}
	}
	if( active != 0 ){
		for( var i = 0; i < elements.length; i++ ){
			$( elements[i] ).find("button").removeClass('active');
		}
		$( elements[active] ).find("button").addClass('active');
		activeEl = active;
	}
}


/**
 * Verifica qual dos itens do menu está ativado
 * 
 * @return Integer
 */
function getActivateItem(){
	var elements = $("#Menu").find("div.btn-group");
	for( var i = 0; i < elements.length; i++ ){
		if( $(elements[i]).find("button").hasClass("active") ){
			return i;
		}
	}
}