var map = [
	[2,2,2,2,2,2,2,2,3,3],
	[2,0,0,0,0,0,0,2,2,2],
	[2,0,0,0,0,0,0,0,0,2],
	[2,2,2,2,0,0,0,0,0,2],
	[2,0,0,0,0,0,0,0,0,2],
	[2,0,0,0,0,0,0,0,0,2],
	[2,2,0,2,2,0,0,0,2,2],
	[2,0,0,0,0,0,0,0,0,2],
	[2,2,0,2,0,0,0,0,0,2],
	[3,2,0,2,0,0,2,0,2,2],
	[3,2,0,2,0,0,2,0,2,3],
	[3,2,0,2,0,0,2,0,2,3],
	[3,2,0,0,0,0,0,0,2,3],
	[3,2,2,2,2,2,2,2,2,3],
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
	joueur2.x = 120;
//var joueur = new entite('#joueur1');
//var joueur2 = new entite('#joueur2');
	//console.log(joueur2.x);

var game = {

	introduction : 'Introduction ...',

	enemi: {
        nom: '#enemi',
        peuxBouger: false,
        largeur: 40,
        hauteur: 40,
        x: 240,
        y: 240,
        coordX: 6,
        coordY: 6,
        vitesse: 40,
		rode: function() {

            var plus = true;
            var ia = setInterval(function(){
                //console.log(getRandomArbitrary(37,41));
				//game.move(game.enemi,getRandomArbitrary(37,41));
                if(plus) {
					if(game.checkMove(game.enemi,'x+'))
                        game.move(game.enemi,39)
					else
						plus = false;
				}
                if(plus==false) {
                    if(game.checkMove(game.enemi,'x-'))
                        game.move(game.enemi,37)
                    else
                        plus = true
				}

            }, 500);

		}
	},
	
	tableau: {
		largeur : 40 * map[0].length,
		hauteur : 40 * map.length,
	},

	spawn: function(entite) {
	//	console.log(entite);
		$('#map').append('<div id="'+entite.nom.replace('#','')+'"></div>');
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
			$.each(value, function (i,a){
				if(a==2)
					$('#map').append('<div class="block block-2"></div>');
				else if(a==3)
					$('#map').append('<div class="block block-3"></div>');
				else
					$('#map').append('<div class="block"></div>');
			});
		});
		
	},

	play : function () {
		$('button#play').remove();
		this.spawn(joueur);
		this.spawn(joueur2);
		this.spawn(this.enemi);

		this.enemi.rode();
		this.enemi.peuxBouger = true;
		return this.introduction;
	},
	
	move : function (objet,key) {
		if(objet.peuxBouger===true) {
			if(key==37) {
				objet.orientation = 270;
                $(objet.nom).css({
                    'transform':'rotateZ(270deg)'
                });
                if(this.checkMove(objet,'x-')) {
                    objet.x -= objet.vitesse;
                    map[objet.coordY][objet.coordX] = 0;
                    map[objet.coordY][objet.coordX-1] = 1;
                    objet.coordX--;
                    $(objet.nom).css({
                        'left':objet.x,
                    });
                    return true;
                }
			}
			if(key==39) {
                objet.orientation = 90;
                $(objet.nom).css({
                    'transform':'rotateZ(90deg)'
                });
				if(this.checkMove(objet,'x+')) {
					objet.x += objet.vitesse;
					map[objet.coordY][objet.coordX] = 0;
					map[objet.coordY][objet.coordX+1] = 1;
					objet.coordX++;
					$(objet.nom).css({
						'left':objet.x
					});
					return true;
				}
			}
			if(key==38) {
                objet.orientation = 0;
                $(objet.nom).css({
                    'transform':'rotateZ(0deg)'
                });
				if(this.checkMove(objet,'y-')) {
					objet.y -= objet.vitesse;
					map[objet.coordY][objet.coordX] = 0;
					map[objet.coordY-1][objet.coordX] = 1;
					objet.coordY--;
					$(objet.nom).css({
						'top':objet.y,
					});
					return true;
				}
			}
			if(key==40) {
                objet.orientation = 180;
                $(objet.nom).css({
                    'transform':'rotateZ(180deg)'
                });
				if(this.checkMove(objet,'y+')) {
					objet.y += objet.vitesse;
					map[objet.coordY][objet.coordX] = 0;
					map[objet.coordY+1][objet.coordX] = 1;
					objet.coordY++;
					$(objet.nom).css({
						'top':objet.y
					});
					return true;
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
		}
		else if(direction=='x+' && objet.x <= this.tableau.largeur-objet.largeur-objet.vitesse) {
			if(map[objet.coordY][objet.coordX+1]==0)
				return true;
		}
		else if(direction=='y-' && objet.y >= 0 && (objet.y - objet.vitesse) >= 0) {
			if(map[objet.coordY-1][objet.coordX]==0)
				return true;
		}
		else if(direction=='y+' && objet.y <= this.tableau.hauteur-objet.hauteur-objet.vitesse) {
			if(map[objet.coordY+1][objet.coordX]==0)
				return true;
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
        alert('mort de : '+objet.nom);
	}

}

$(document).ready(function() {
	
	game.init();
	game.play();

	joueur.attaque(90);
	
	$(document).keydown(function( e ) {
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

