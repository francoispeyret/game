var map = [
	[1,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,2,2,2,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[2,2,0,2,2,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,2,0,2,0,0,0,0,0],
	[0,2,0,2,0,0,0,0,0],
]


var game = {

	introduction : 'Introduction ...',
	
	joueur: {
		nom: '#joueur1',
		peuxBouger: false,
		largeur: 40,
		hauteur: 40,
		x: 0,
		y: 0,
		coordX: 0,
		coordY: 0,
		vitesse: 40,
	},
	
	enemi: {
		
	},
	
	tableau: {
		largeur : 40 * map[0].length,
		hauteur : 40 * map.length,
	},
	
	init : function() {
	//	$('#map').css('width',this.tableau.largeur);
	//	$('#map').css('height',this.tableau.hauteur);
		console.log('init');
		
		$('#map').css({
			height: this.tableau.hauteur,
			width: this.tableau.largeur,
		})
		
		$.each(map, function( index, value ) {
			console.log( index + ": " + value );
			$.each(value, function (i,a){
				if(a==2)
					$('#map').append('<div class="block block-2"></div>');
				else
					$('#map').append('<div class="block"></div>');
			});
		});
		
	},

	play : function () {
		$('button#play').remove();
		$('#map').append('<div id="joueur1"></div>');
		$(this.joueur.nom).css({
			'left':this.joueur.x,
			'top':this.joueur.y,
			'width':this.joueur.largeur,
			'height':this.joueur.hauteur,	
		});
		this.joueur.peuxBouger = true;
		return this.introduction;
	},
	
	move : function (key) {
		if(this.joueur.peuxBouger===true) {
			if(key==37 && this.checkMove('x-')) {
				this.joueur.x -= this.joueur.vitesse;
				map[this.joueur.coordY][this.joueur.coordX] = 0;
				map[this.joueur.coordY][this.joueur.coordX-1] = 1;
				this.joueur.coordX--;
				$(this.joueur.nom).css({
					'left':this.joueur.x,
					'transform':'rotateZ(-90deg)',
				});
			}
			if(key==39 && this.checkMove('x+')) {
				this.joueur.x += this.joueur.vitesse;
				map[this.joueur.coordY][this.joueur.coordX] = 0;
				map[this.joueur.coordY][this.joueur.coordX+1] = 1;
				this.joueur.coordX++;
				$(this.joueur.nom).css({
					'left':this.joueur.x,
					'transform':'rotateZ(90deg)',
				});
			}
			if(key==38 && this.checkMove('y-')) {
				this.joueur.y -= this.joueur.vitesse;
				map[this.joueur.coordY][this.joueur.coordX] = 0;
				map[this.joueur.coordY-1][this.joueur.coordX] = 1;
				this.joueur.coordY--;
				$(this.joueur.nom).css({
					'top':this.joueur.y,
					'transform':'rotateZ(0deg)',
				});
			}
			if(key==40 && this.checkMove('y+')) {
				this.joueur.y += this.joueur.vitesse;
				map[this.joueur.coordY][this.joueur.coordX] = 0;
				map[this.joueur.coordY+1][this.joueur.coordX] = 1;
				this.joueur.coordY++;
				$(this.joueur.nom).css({
					'top':this.joueur.y,
					'transform':'rotateZ(180deg)',
				});
			}
		}
		console.log(this.joueur.coordX+'/'+this.joueur.coordY);
		console.log(map);
	
	},
	
	checkMove : function(direction) {
		if(direction=='x-' && this.joueur.x >= 0 && (this.joueur.x - this.joueur.vitesse) >= 0) {
			if(map[this.joueur.coordY][this.joueur.coordX-1]==0)
				return true;
		}
		else if(direction=='x+' && this.joueur.x <= this.tableau.largeur-this.joueur.largeur-this.joueur.vitesse) {
			if(map[this.joueur.coordY][this.joueur.coordX+1]==0)
				return true;
		}
		else if(direction=='y-' && this.joueur.y >= 0 && (this.joueur.y - this.joueur.vitesse) >= 0) {
			if(map[this.joueur.coordY-1][this.joueur.coordX]==0)
				return true;
		}
		else if(direction=='y+' && this.joueur.y <= this.tableau.hauteur-this.joueur.hauteur-this.joueur.vitesse) {
			if(map[this.joueur.coordY+1][this.joueur.coordX]==0)
				return true;
		}
		return false;
	}
}

var ia = setInterval(function(){
	
}, 300);

$(document).ready(function() {
	
	game.init();
	game.play();
	
	$(document).keydown(function( e ) {
		game.move(e.keyCode);
/*
		if(e.keyCode==37)
			console.log('gauche');
		if(e.keyCode==38)
			console.log('haut');
		if(e.keyCode==39)
			console.log('droite');
		if(e.keyCode==40)
			console.log('base');
		if(e.keyCode==32)
			console.log('space');
*/
	});
	
	$('#play').on('click',function(){
		game.play();
	});
});	

