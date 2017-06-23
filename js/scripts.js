var map = [
	[2,2,2,2,2,2,2,2,3,3],
	[2,0,0,0,0,0,0,2,3,3],
	[3,0,0,0,0,0,0,2,2,2],
	[2,0,0,0,0,0,0,0,0,2],
	[2,2,2,2,0,0,0,0,0,2],
	[2,0,0,0,0,0,0,0,0,2],
	[2,0,0,0,0,0,0,0,0,2],
	[2,2,0,2,2,0,0,0,2,2],
	[2,0,0,0,0,0,0,0,0,3],
	[2,2,0,2,0,0,0,0,0,2],
	[3,2,0,2,0,0,2,0,2,2],
	[3,2,0,2,0,0,2,0,2,3],
	[3,2,0,2,0,0,2,0,2,3],
	[3,2,0,0,0,0,0,0,2,3],
	[3,2,2,2,2,3,2,2,2,3],
];

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function entite (nom) {
	this.nom = nom;
	this.peuxBouger = false;
	this.largeur = 40;
	this.hauteur = 40;
	this.coordX= 2;
	this.coordY= 2;
	this.orientation = 0;
	this.x = this.largeur * this.coordX;
	this.y = this.hauteur * this.coordY;
	this.vitesse = 40;

	this.vie = 10;

	this.attaque = function () {
        if(this.orientation==0) {
            if(map[this.coordY-1][this.coordX]==1)
            {
                for (var i = 0, len = entites.length; i < len; i++) {
                    if(this.coordY-1==entites[i].coordY)
                        game.degat(entites[i],2);
                }
            }
		}
		if(this.orientation==90) {
			if(map[this.coordY][this.coordX+1]==1) {
                for (var i = 0, len = entites.length; i < len; i++) {
                    if(this.coordX+1==entites[i].coordX)
                    	game.degat(entites[i],2);
                }
			}
		}
		if(this.orientation==180) {
			if(map[this.coordY+1][this.coordX]==1) {
                for (var i = 0, len = entites.length; i < len; i++) {
                    if(this.coordY+1==entites[i].coordY)
                        game.degat(entites[i],2);
                }
			}
		}
		if(this.orientation==270) {
			if(map[this.coordY][this.coordX-1]==1) {
                for (var i = 0, len = entites.length; i < len; i++) {
                    if(this.coordX-1==entites[i].coordX)
                        game.degat(entites[i],2);
                }
			}
		}
    }
}

var entites = [
	joueur = new entite('#joueur1'),
];

entites.push(joueur2 = new entite('#joueur2'));
	joueur2.coordX = 3;
	joueur2.x = joueur2.coordX * joueur2.largeur;
entites.push(enemi1 = new entite('#enemi1'));
	enemi1.coordX = 6;
	enemi1.coordY = 6;
	enemi1.x = enemi1.coordX * enemi1.largeur;
	enemi1.y = enemi1.coordY * enemi1.hauteur;
//var joueur = new entite('#joueur1');
//var joueur2 = new entite('#joueur2');
	//console.log(joueur2.x);

var game = {

	introduction : 'Introduction ...',

	tableau: {
		largeur : 40 * map[0].length,
		hauteur : 40 * map.length,
	},

	spawn: function(entite) {
	//	console.log(entite);
		$('#map').append('<div id="'+entite.nom.replace('#','')+'" class="entite"></div>');
        $(entite.nom).css({
            'left':entite.x,
            'top':entite.y,
            'width':entite.largeur,
            'height':entite.hauteur,
        });
        entite.peuxBouger = true;
        map[entite.coordY][entite.coordX] = 1;
     //   console.log(map);
	},
	
	init : function() {
	//	$('#map').css('width',this.tableau.largeur);
	//	$('#map').css('height',this.tableau.hauteur);
	//	console.log('init');
		
		$('#map').css({
			height: this.tableau.hauteur,
			width: this.tableau.largeur,
		})
		
		$.each(map, function( index, value ) {
			//console.log( index + ": " + value );
			//setTimeout(function () {
			$.each(value, function (i,a){
					if(a==2)
						$('#map').append('<div class="block block-2"></div>');
					else if(a==3)
						$('#map').append('<div class="block block-3"></div>');
					else
						$('#map').append('<div class="block"></div>');
			});
			//},150*index);
		});

		game.play();
		
	},

	play : function () {
		$('button#play').remove();
		this.spawn(joueur);
		this.spawn(joueur2);
		this.spawn(enemi1);
		game.rode(enemi1,'y');

		return this.introduction;
	},
	
	move : function (objet,key) {
		if(objet.peuxBouger===true) {
			if(key==37) {
				objet.orientation = 270;
                $(objet.nom).css({
                    'transform':'rotateZ(270deg)'
                });
                if(this.checkMove(objet,'x-')===true) {
                    objet.x -= objet.vitesse;
                    map[objet.coordY][objet.coordX] = 0;
                    map[objet.coordY][objet.coordX-1] = 1;
                    objet.coordX--;
                    $(objet.nom).css({
                        'left':objet.x,
                    });
                    return true;
                }
				if(this.checkMove(objet,'x-')===null) {
					$(objet.nom)
						.css('transition','none')
						.animate({width: 0, height: 0}, 1500, function () {
							game.mort(objet);
					});
				}
			}
			if(key==39) {
                objet.orientation = 90;
                $(objet.nom).css({
                    'transform':'rotateZ(90deg)'
                });
				if(this.checkMove(objet,'x+')===true) {
					objet.x += objet.vitesse;
					map[objet.coordY][objet.coordX] = 0;
					map[objet.coordY][objet.coordX+1] = 1;
					objet.coordX++;
					$(objet.nom).css({
						'left':objet.x
					});
					return true;
				}
				if(this.checkMove(objet,'x+')===null) {
					game.mort(objet);
				}
			}
			if(key==38) {
                objet.orientation = 0;
                $(objet.nom).css({
                    'transform':'rotateZ(0deg)'
                });
				if(this.checkMove(objet,'y-')===true) {
					objet.y -= objet.vitesse;
					map[objet.coordY][objet.coordX] = 0;
					map[objet.coordY-1][objet.coordX] = 1;
					objet.coordY--;
					$(objet.nom).css({
						'top':objet.y,
					});
					return true;
				}
				if(this.checkMove(objet,'y-')===null) {
					game.mort(objet);
				}
			}
			if(key==40) {
                objet.orientation = 180;
                $(objet.nom).css({
                    'transform':'rotateZ(180deg)'
                });
				if(this.checkMove(objet,'y+')===true) {
					objet.y += objet.vitesse;
					map[objet.coordY][objet.coordX] = 0;
					map[objet.coordY+1][objet.coordX] = 1;
					objet.coordY++;
					$(objet.nom).css({
						'top':objet.y
					});
					return true;
				}
				if(this.checkMove(objet,'y+')===null) {
					game.mort(objet);
				}
			}
			return false;
		}
        //console.log(map);
		//console.log(objet.nom+' : '+objet.coordX+'/'+objet.coordY);
		//console.log(map);
	
	},
	
	checkMove : function(objet,direction) {
		if(direction=='x-' && objet.x >= 0 && (objet.x - objet.vitesse) >= 0) {
			if(map[objet.coordY][objet.coordX-1]==0)
				return true;
			if(map[objet.coordY][objet.coordX-1]==3)
				return null;
		}
		else if(direction=='x+' && objet.x <= this.tableau.largeur-objet.largeur-objet.vitesse) {
			if(map[objet.coordY][objet.coordX+1]==0)
				return true;
			if(map[objet.coordY][objet.coordX+1]==3)
				return null;
		}
		else if(direction=='y-' && objet.y >= 0 && (objet.y - objet.vitesse) >= 0) {
			if(map[objet.coordY-1][objet.coordX]==0)
				return true;
			if(map[objet.coordY-1][objet.coordX]==3)
				return null;
		}
		else if(direction=='y+' && objet.y <= this.tableau.hauteur-objet.hauteur-objet.vitesse) {
			if(map[objet.coordY+1][objet.coordX]==0)
				return true;
			if(map[objet.coordY+1][objet.coordX]==3)
				return null;
		}
		return false;
	},

	degat : function(objet, nbDegat) {
        console.log('Attack !');
		objet.vie -= nbDegat;
		console.log(objet);
		if(objet.vie <= 0) {
			game.mort(objet);
		}
	},

	soin : function(objet, nbSoin) {
		objet.vie += nbSoin;
		console.log(objet);
	},

	mort : function(objet) {
        index = entites.indexOf(objet);
        map[objet.coordY][objet.coordX] = 0;
        $(objet.nom).remove();
        if (index > -1) {
            entites.splice(index, 1);
        }
	},


	rode: function(objet,direction) {
		direction = typeof direction !== 'undefined' ? direction : 'x';

		var plus = true;
		var ia = setInterval(function(){
			if(direction=='x') {
				if(plus) {
					if(game.checkMove(objet,'x+'))
						game.move(objet,39);
					else
						plus = false;
				}
				if(plus==false) {
					if(game.checkMove(objet,'x-'))
						game.move(objet,37);
					else
						plus = true
				}
			}
			if (direction=='y') {
				if(plus) {
					if(game.checkMove(objet,'y+'))
						game.move(objet,40);
					else
						plus = false;
				}
				if(plus==false) {
					if(game.checkMove(objet,'y-'))
						game.move(objet,38);
					else
						plus = true
				}
			}

		}, 500);

	},

}

$(document).ready(function() {
	
	game.init();

	joueur.attaque(90);
	
	$(document).keyup(function( e ) {
		game.move(joueur,e.keyCode);

        joueur.attaque();
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

