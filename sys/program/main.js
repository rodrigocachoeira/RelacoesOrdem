$(document).ready(function(){ //quando a página estiver completamente carregada

	App = new OrderRelations(); //objeto de controle


	/**
	 * Quando o botão for pressionado , realizar a criação dos elementos de acordo com o valor
	 * passado no input type text
	 */
	$("#ButtonGenerate").click(function(){
		var input = $("input[name=quantity]");

		if( $(input).val() != "" ){
			if( $(input).val() <= maximumNodes ){
				App.GeneratingNodes.create( $(input).val() ); // realiza a criação dos elementos
				apllyActivating( [0,1,1,1,0,0] , 1 ); //aplica nova configuração no menu
				App.Nodes.iteration(); //iniciação a verificação de iterações

				$(".part1").hide(600);
				$(".part2").removeClass("hidden").show(1200);
			}else{
				alert( "Número limite 7." ); //valor excedeu a marca de 7 definida pela variável de controle no arquivo variables.js
			}
		}else{
			alert( "Preecha corretamente o campo!" ); // campo não preenchido
		}
	});


	/**
	 * Pressiona o botão para progedir para a terceira etapa, desenho.
	 */
	$("#ButtonDraw").click(function(){
		apllyActivating( [0,0,0,0,1,0] , 4 ); //aplica nova configuração no menu
		App.Nodes.disableNodes();	//desabilita os nodos não utilizados

		$(".part2").hide(600);
		$(".part3").removeClass("hidden").show(1200);
	});


	/**
	 * Pressiona o botão para mostrar os resultados encontrados
	 * de acordo com as informações passadas                     
	 */
	$("#ButtonResult").click(function(){
		apllyActivating( [0,0,0,0,0,1] , 5 ); //aplica nova configuração no menu
		App.Draw.removeActivateToDraw(); //limpa os inputs, caso algum possua a classe indicando iteratividade
		App.Results.calculate();

		$("li.minimumELements span").html( App.Results.print( App.Results.minimumElements ) );
		$("li.maximumElements span").html( App.Results.print( App.Results.maximumElements ) );
		$("li.lowerLimit span").html( App.Results.print( App.Results.lowerLimit ) );
		$("li.maximumLimit span").html( App.Results.print( App.Results.maximumLimit ) );
		$("li.reticulate span").html( App.Results.isReticulate() ? "Sim" : "Não" );

		$(".part3").hide(800);

		$("div.box").animate({
			left: "+=200"
		},1000, function(){
			
		});
		$("div.box").addClass('col-md-6');
		$(".part4").removeClass("hidden").addClass("col-md-4").animate({
			left: "-=200"
		},1000, function(){
			
		});

		$("canvas").css("z-index",999).css("opacity", "0.5");

	});


	/**
	 * Ao pressionar ESC remover a seleção para desenho
	 */
	$( "body" ).on( "keydown", function( event ) {
	  if( event.which == 27 ){ //o usuário pressionou a tecla ESC
	  	App.Draw.removeActivateToDraw();
	  }
	});

	$("#CalcBorders").click(function(){
		var nodes = $("#Nodes").val();

		if( nodes != undefined ){ //se estiver preenchido
			App.Results.borders( App.Nodes.descriptionToElements( nodes.split(" ") ) ); //Cálculo das fronteiras

			$(".borders").html( "{ " + nodes + ' }' );
			$("li.higherBorders span").html( App.Results.simplePrint( App.Results.higherBorders ) );
			$("li.lowerBorders span").html( App.Results.simplePrint( App.Results.lowerBorders ) );
			$("li.minimumHigherBorder span").html( App.Results.calcMinimumHigherBorder() );
			$("li.maximumLowerBorder span").html( App.Results.calcMaximumLowerBorder() );			
		}
	});

});
