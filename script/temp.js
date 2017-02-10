/**********************
*****  ULILITIES  *****
**********************/
var RectangleExtensions = {
	GetIntersectionDepth: function (rectA, rectB) {
		var halfWidthA, halfWidthB, halfHeightA, halfHeightB, centerA, centerB, distanceX, distanceY, minDistanceX, minDistanceY, depthX, depthY;
		// Calculate Half sizes
		halfWidthA		= rectA.width / 2.0;
		halfWidthB		= rectB.width / 2.0;
		halfHeightA		= rectA.height / 2.0;
		halfHeightB		= rectB.height / 2.0;

		// Calculate centers
		centerA			= new Vector2(rectA.left + halfWidthA, rectA.top + halfHeightA);
		centerB			= new Vector2(rectB.left + halfWidthB, rectB.top + halfHeightB);

		distanceX		= centerA.x - centerB.x;
		distanceY		= centerA.y - centerB.y;
		minDistanceX	= halfWidthA + halfWidthB;
		minDistanceY	= halfHeightA + halfHeightB;

		// If we are not intersecting, return (0, 0)
		if (Math.abs(distanceX) >= minDistanceX || Math.abs(distanceY) >= minDistanceY)
			return new Vector2(0, 0);

		// Calculate and return intersection depths
		depthX			= distanceX > 0 ? minDistanceX - distanceX : -minDistanceX - distanceX;
		depthY			= distanceY > 0 ? minDistanceY - distanceY : -minDistanceY - distanceY;

		return new Vector2(depthX, depthY);
	}
};

/************************
***** Vector2 CLASS *****
************************/

var Vector2 = function(x, y) {
    this.x = x;
    this.y = y;
};

Vector2.prototype.Add = function (vector) {
	return new Vector2(this.x + vector, this.y + vector);
};

Vector2.prototype.Subtract = function (vector) {
	return new Vector2(this.x - vector, this.y - vector);
};

Vector2.prototype.Multiply = function (vector) {
	return new Vector2(this.x * vector, this.y * vector);
};

Vector2.prototype.Multiply = function (vector) {
	return new Vector2(this.x * vector, this.y * vector);
};

/**********************************
***** RANDOM NUMBER GENERATOR *****
**********************************/

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**********************************
***** CONVERT SECONDS TO TIME *****
**********************************/

function SecondsToTime (s) {
	var h, m, s;
	s = Number(s);
	h = Math.floor(s / 3600);
	m = Math.floor(s % 3600 / 60);
	s = Math.floor(s % 3600 % 60);
	return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

/********************
***** FPS CLASS *****
********************/

var fps = {
	startTime : 0,
	frameNumber : 0,
	getFPS : function () {
		var d, currentTime, result;
		this.frameNumber++;
		d 				= new Date().getTime();
		currentTime 	= (d - this.startTime) / 1000;
		result			= (this.frameNumber / currentTime).toFixed(2);

		if (currentTime > 1) {
			this.startTime 		= new Date().getTime();
			this.frameNumber 	= 0;
		}

		return result;
	}
};

/**************************
***** GAME TIME CLASS *****
**************************/

var GameTime = {
	startTime: 		new Date().getTime() / 1000,
	elapsed: 		0,
	lastUpdate: 	0,
	totalGameTime: 	0,
	getElapsed: function () {
		return GameTime.elapsed;
	},
	getLastUpdate: function () {
		return GameTime.lastUpdate;
	},
	getTotalGameTime: function () {
		return GameTime.totalGameTime;
	},
	getCurrentGameTime: function () {
		return new Date().getTime() / 1000;
	},
	update: function () {
		var curTime;
		curTime					= GameTime.getCurrentGameTime();
		GameTime.elapsed		= curTime - GameTime.lastUpdate;
		GameTime.totalGameTime	= curTime - GameTime.startTime;
		GameTime.lastUpdate		= curTime;
	}
};

/*****************************
***** DRAW TEXT FUNCTION *****
*****************************/

var DrawText = function (string, x, y, font, color) {
	game.context.save();
	game.context.font = font;
	game.context.fillStyle = color;
	game.context.fillText(string, x, y);
	game.context.restore();
};

/*******************************************
**************  INPUT OBJECT  **************
*******************************************/
var Input = {
	Keys: {
		_isPressed: {},
		W: 87,
		A: 65,
		S: 83,
		D: 68,
		SPACE: 32,
		R: 82,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		SHIFT: 16,
		ESCAPE: 27,
		GetKey: function (keyCode) {
			return Input.Keys._isPressed[keyCode];
		},
		onKeyDown: function (e) {
			Input.Keys._isPressed[e.keyCode] = true;
		},
		onKeyUp: function (e) {
			delete Input.Keys._isPressed[e.keyCode];
		}
	},
	Mouse: {
		_isPressed: {},
		pos: new Vector2(0, 0),
		LEFT: 0,
		MIDDLE: 1,
		RIGHT: 2,
		GetButton: function (button) {
			return Input.Mouse._isPressed[button];
		},
		GetPosition: function () {
			return Input.Mouse.pos;
		},
		OnMouseDown: function (e) {
			Input.Mouse.pos.x = e.offsetX;
			Input.Mouse.pos.y = e.offsetY;
			Input.Mouse._isPressed[e.button] = true;
		},
		OnMouseUp: function (e) {
			delete Input.Mouse._isPressed[e.button];
		},
		OnMouseMove: {
			pos: new Vector2(0, 0),
			GetPosition: function () { return Input.Mouse.OnMouseMove.pos; },
			SetPosition: function (e) {
				Input.Mouse.OnMouseMove.pos.x = e.offsetX;
				Input.Mouse.OnMouseMove.pos.y = e.offsetY;
			}
		}
	}
};

/****************************
*****  RECTANGLE CLASS  *****
****************************/
function Rectangle (x, y, width, height) {
	this.x		= x;
	this.y		= y;
	this.width	= width;
	this.height	= height;
	this.left	= this.x;
	this.top	= this.y;
	this.right	= this.x + this.width;
	this.bottom	= this.y + this.height;
	this.center	= new Vector2((this.x + (this.width/2)), (this.y + (this.height/2)));
}

/********************
*****  TEXTURE  *****
********************/
function Texture (pos, size, color, lineWidth, lineColor) {
	this.pos 		= pos;
	this.size 		= size;
	this.color 		= color;
	this.lineWidth 	= lineWidth;
	this.lineColor 	= lineColor;
}

Texture.prototype.update = function (pos) {
	this.pos 		= pos;
};

Texture.prototype.draw = function () {
	game.context.save();
	game.context.beginPath();
	game.context.rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	game.context.fillStyle = this.color;
	game.context.fill();
	game.context.lineWidth = this.lineWidth;
	game.context.strokeStyle = this.lineColor;
	game.context.stroke();
	game.context.closePath();
	game.context.restore();
};

/*****************
*****  TILE  *****
*****************/
function Tile (pos, color, collision) {
	this.pos 		= pos;
	this.size 		= new Vector2(game.square, game.square);
	this.color 		= color;
	this.collision 	= collision;
	this.texture 	= new Texture(this.pos, this.size, this.color, 1, '#222222');
}

Tile.prototype.draw = function () {
	this.texture.draw();
};

/************************
*****  LIGHT CLASS  *****
************************/
function Lamp (pos, numRays, radius, isMoving, tileMap) {
	this.pos		= pos;
	this.tileMap	= tileMap;
	this.tiles		= [];
	this.isMoving	= isMoving;
	this.radius		= radius;
	this.numRays	= numRays;
	this.slice		= 2 * Math.PI / this.numRays;
}

Lamp.prototype.SetTileMap = function (tileMap) {
	this.tileMap	= tileMap;
};

Lamp.prototype.SetIlluminatedTiles = function (v0, v1) {
	var p0, p1, dx, dy, nx, ny, sign_x, sign_y, p, point, points, ix, iy, i, j, tile, tileCenter, tX, tY, dist, distPrcnt, tileBG;

	// Convert x,y coordinates to tile x,y indexes
	p0		= new Vector2(Math.floor(v0.x / game.square), Math.floor(v0.y / game.square));
	p1		= new Vector2(Math.floor(v1.x / game.square), Math.floor(v1.y / game.square));

	dx		= p1.x - p0.x;
	dy		= p1.y - p0.y;
	nx		= Math.abs(dx);
	ny		= Math.abs(dy);
	sign_x	= (dx > 0) ? 1 : -1;
	sign_y	= (dy > 0) ? 1 : -1;
	p		= new Vector2(p0.x, p0.y);
	points 	= [new Vector2(p.x, p.y)];

	// Loop through tiles that the ray passes through and add their x,y tile indexes to an array
	for (ix = 0, iy = 0; ix < nx || iy < ny;) {

		if ((0.5+ix) / nx < (0.5+iy) / ny) {
			// next step is horizontal
			p.x += sign_x;
			ix++;
		} else {
			// next step is vertical
			p.y += sign_y;
			iy++;
		}

		points.push(new Vector2(p.x, p.y));

	}

	// Loop through the points array so we can adjust the appropriate tiles' colors
	for (i = 0; i < points.length; i++) {
		point = points[i];
		// Make sure we're working within the bounds of our canvas
		if (point.x >= 0 && point.x < game.map_size_x && point.y >= 0 && point.y < game.map_size_y) {
			tile = this.tileMap[point.y][point.x];
			// Only conitue if we haven't hit a wall
			if (tile.collision !== 'IMPASSABLE') {
				// Get the distance between the light's source and the tile we're looping over so we can set the color on a gradient
				tileCenter	= new Vector2(tile.pos.x + (tile.size.x / 2), tile.pos.y + (tile.size.y / 2));
				tX			= v0.x - tileCenter.x;
				tY			= v0.y - tileCenter.y;
				dist		= Math.sqrt(tX*tX + tY*tY);
				distPrcnt	= Math.floor(this.radius - dist) / 100;

				// If the tile is the exit tile, give it a different color
				// Else, we're going to give the tile a color. It's opacity will be determined by by far away the tile is from the light source
				if (tile.collision === 'EXIT') {
					tileBG	= 'rgb(' + Math.floor(21*distPrcnt) + ', ' + Math.floor(226*distPrcnt) + ', ' + Math.floor(94*distPrcnt) + ')';
				} else {
					//tileBG	= 'rgb(' + Math.floor(255*distPrcnt) + ', ' + Math.floor(157*distPrcnt) + ', ' + Math.floor(78*distPrcnt) + ')';
					tileBG		= 'rgba(255, 157, 78, ' + distPrcnt + ')';
				}

				// Set the tile we're working on to a new Texture
				this.tiles[point.y][point.x] = new Texture(new Vector2(point.x * game.square, point.y * game.square), new Vector2(game.square, game.square), tileBG);
			} else {
				// We've hit a wall: abort
				break;
			}
		}
	}

};

Lamp.prototype.update = function (pos) {
	var i, angle, dX, dY, y, x;

	// We'll populate a new tiles array to match the size of the level map
	for (y = 0; y < this.tileMap.length; y++) {
		this.tiles[y] = [];
		for (x = 0; x < this.tileMap[y].length; x++) {
			// Set it to undefined - we'll change it later if it's affected by light
			this.tiles[y][x] = undefined;
		}
	}


	// If this light moves, update its position
	if (this.isMoving) this.pos = pos;

	// Set local bounds for the light's source
	lightRect	= new Rectangle(this.pos.x, this.pos.y, game.square, game.square);

	// Loop through the number of rays we want and determined how many tiles are affected.
	for (i = 0; i < this.numRays; i++) {
		angle	= this.slice * i;
		dX		= lightRect.center.x + this.radius * Math.cos(angle);
		dY		= lightRect.center.y + this.radius * Math.sin(angle);
		this.SetIlluminatedTiles(lightRect.center, new Vector2(dX, dY));
	}

};

Lamp.prototype.draw = function () {
	var y, x, tile;

	// Draw the tiles to the screen ONLY if they've been defined
	for (y = 0; y < this.tiles.length; y++) {
		for (x = 0; x < this.tiles[y].length; x++) {
			tile = this.tiles[y][x];
			if (typeof tile !== 'undefined')
				tile.draw();
		}
	}
};

/*******************
*****  PLAYER  *****
*******************/
function Player (level) {
	this.level 					= level;
	this.pos 					= new Vector2(0, 45);
	this.size 					= new Vector2(game.square, game.square);
	this.velocity				= new Vector2(0, 0);
	// Constants for controling movement
	this.MoveAcceleration 		= 500.0;
	this.MaxMoveSpeed 			= 2;
	this.GroundDragFactor 		= 0.7;
	this.movementX 				= 0;
	this.movementY 				= 0;

	this.texture 				= new Texture(this.pos, this.size, '#FFFFFF', 1, '#222222');
}

Player.prototype.GetInput = function () {
	// Horizontal Movement
	if (Input.Keys.GetKey(Input.Keys.A) || Input.Keys.GetKey(Input.Keys.LEFT)) {
		this.movementX = -1.0;
	} else if (Input.Keys.GetKey(Input.Keys.D) || Input.Keys.GetKey(Input.Keys.RIGHT)) {
		this.movementX = 1.0;
	}

	// Vertical Movement
	if (Input.Keys.GetKey(Input.Keys.W) || Input.Keys.GetKey(Input.Keys.UP)) {
		this.movementY = -1.0;
	} else if (Input.Keys.GetKey(Input.Keys.S) || Input.Keys.GetKey(Input.Keys.DOWN)) {
		this.movementY = 1.0;
	}
};

Player.prototype.Clamp = function (value, min, max) {
	return (value < min) ? min : ((value > max) ? max : value);
};

Player.prototype.SetPos = function (pos) {
	this.pos = pos;
};

Player.prototype.ApplyPhysics = function () {

	// Initialize velocity for x and y
	this.velocity.x		+= this.movementX * this.MoveAcceleration;
	this.velocity.y		+= this.movementY * this.MoveAcceleration;

	// Apply pseudo-drag horizontally (friction)
	this.velocity.x 	*= this.GroundDragFactor;
	this.velocity.y 	*= this.GroundDragFactor;

	// Prevent player from going faster than top speed
	this.velocity.x 	= this.Clamp(this.velocity.x, -this.MaxMoveSpeed, this.MaxMoveSpeed);
	this.velocity.y 	= this.Clamp(this.velocity.y, -this.MaxMoveSpeed, this.MaxMoveSpeed);

	// Apply final velocity to player
	this.pos.x 			+= Math.round(this.velocity.x);
	this.pos.y 			+= Math.round(this.velocity.y);

	// Handle Collisions
	this.HandleCollision();

};

Player.prototype.HandleCollision = function (gameTime) {
	// Set local variables
	var i, j, bottom, localBoundsRect, tileSize, topTile, leftTile, bottomTile, rightTile, tile, tileRect, depth, absDepthX, abdDepthY;

	// Prevent leaving the screen bounds (X AXIS)
	if (this.pos.x < 0) {
		this.pos.x = 0;
	} else if ((this.pos.x + this.size.x) > game.world_width) {
		this.pos.x = (game.world_width - this.size.x);
	}

	// Prevent leaving the screen bounds (Y AXIS)
	if (this.pos.y < 0) {
		this.pos.y = 0;
	} else if ((this.pos.y + this.size.y) > game.world_height) {
		this.pos.y = (game.world_height - this.size.y);
	}

	// Set bouding box for our player
	localBoundsRect = new Rectangle(this.pos.x, this.pos.y, this.size.x, this.size.y);

	// Set the tile size
	tileSize		= new Vector2(game.square, game.square);

	// Get the closest tiles
	topTile			= parseInt(Math.floor(parseFloat(localBoundsRect.top / tileSize.y)), 10);
	leftTile		= parseInt(Math.floor(parseFloat(localBoundsRect.left / tileSize.x)), 10);
	bottomTile		= parseInt(Math.ceil(parseFloat(localBoundsRect.bottom / tileSize.y)) - 1, 10);
	rightTile		= parseInt(Math.ceil(parseFloat(localBoundsRect.right / tileSize.x)) - 1, 10);

	// Loop through each potentially colliding tile
	for (i = topTile; i <= bottomTile; ++i) {
		for (j = leftTile; j <= rightTile; ++j) {

			// Put the tile we're looping on in a variable for easier use
			tile = this.level.tiles[i][j];
			// Create a bounding box for our tile
			tileRect = new Rectangle(tile.pos.x, tile.pos.y, tileSize.x, tileSize.y);

			// Check if this tile is collidable. Else, check if it's the exit tile
			if (tile.collision === 'IMPASSABLE') {


				// Now we know that this tile is being collided with, we'll figure out
				// the axis of least separation and push the player out along that axis

				// Get the intersection depths between the player and this tile
				depth = RectangleExtensions.GetIntersectionDepth(localBoundsRect, tileRect);

				// Only continue if depth != 0
				if (depth.x !== 0 && depth.y !== 0) {

					absDepthX = Math.abs(depth.x);
					absDepthY = Math.abs(depth.y);

					// If the Y depth is shallower than the X depth, correct player's y position and set y velocity to 0.
					// If the X depth is shallower, correct player's x position and set x velocity to 0.
					// Else, we've hit a corner (both intersection depths are equal). Correct both axes and set velocity to 0
					if (absDepthY < absDepthX) {
						//this.pos.y += depth.y;
						this.pos.y = localBoundsRect.top + depth.y;
						this.velocity.y = 0;
					} else if (absDepthX < absDepthY) {
						//this.pos.x += depth.x;
						this.pos.x = localBoundsRect.left + depth.x;
						this.velocity.x = 0;
					} /* else {
						// Doesn't work.
					} */

				}

			} else if (tile.collision === 'EXIT') {

				// Get the intersection depths between the player and this tile
				depth = RectangleExtensions.GetIntersectionDepth(localBoundsRect, tileRect);

				// Only allow exit if player's majority is over the exit tile
				if (Math.abs(depth.x) > (game.square / 2) && Math.abs(depth.y) > (game.square / 2))
					this.level.FoundExit(gameTime);

			}

		}
	}
};

Player.prototype.update = function () {

	// Resolve user input
	this.GetInput();
	// Apply physics to player
	this.ApplyPhysics();

	// Update player texture
	this.texture.update(this.pos);

	// Reset movement variables
	this.movementX = 0;
	this.movementY = 0;

};

Player.prototype.draw = function () {
	this.texture.draw();
};

/****************************************************************************************************
******************************************  CAMERA CLASS  *******************************************
**************  Adapted from robashton on Github: https://github.com/robashton/camera  **************
****************************************************************************************************/
function Camera () {
	this.distance 		= 0.0;
	this.lookat 		= [0, 0];
	this.fieldOfView	= Math.PI / 4.0;
	this.viewport 		= {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		width: 0,
		height: 0,
		scale: [1.0, 1.0]
	};
	this.updateViewport();
}

Camera.prototype = {
	begin: function () {
		game.context.save();
		this.applyScale();
		this.applyTranslation();
	},
	end: function () {
		game.context.restore();
	},
	applyScale: function () {
		game.context.scale(this.viewport.scale[0],this.viewport.scale[1]);
	},
	applyTranslation: function () {
		game.context.translate(-this.viewport.left, -this.viewport.top);
	},
	updateViewport: function () {
		this.aspectRatio		= game.CANVAS_WIDTH / game.CANVAS_HEIGHT;
		this.viewport.width 	= this.distance * Math.tan(this.fieldOfView);
		this.viewport.height 	= this.viewport.width / this.aspectRatio;
		this.viewport.left 		= this.lookat[0] - (this.viewport.width / 2.0);
		this.viewport.top 		= this.lookat[1] - (this.viewport.height / 2.0);
		this.viewport.right 	= this.viewport.left + this.viewport.width;
		this.viewport.bottom 	= this.viewport.top + this.viewport.height;
		this.viewport.scale[0]	= game.CANVAS_WIDTH / this.viewport.width;
		this.viewport.scale[1]	= game.CANVAS_HEIGHT / this.viewport.height;
	},
	zoomTo: function (z) {
		this.distance = z;
		this.updateViewport();
	},
	moveTo: function (x, y) {
		this.lookat[0] = x;
		this.lookat[1] = y;
		this.updateViewport();
	},
	screenToWorld: function (x, y, obj) {
		obj = obj || {};
		obj.x = (x / this.viewport.scale[0]) + this.viewport.left;
		obj.y = (y / this.viewport.scale[1]) + this.viewport.top;
		return obj;
	},
	worldToScreen: function (x, y, obj) {
		obj = obj || {};
		obj.x = (x - this.viewport.left) * (this.viewport.scale[0]);
     	obj.y = (y - this.viewport.top) * (this.viewport.scale[1]);
		return obj;
	}
};

/******************
*****  LEVEL  *****
******************/
function Level () {
	this.tiles 				= [];
	this.player 			= {};
	this.playerLight		= {};
	this.camera 			= {};
	this.fps 				= 0;
	this.level_max 			= (level.length - 1);	// level is an array of level maps. These are stored in /script/levels (subtract 1 because arrays start at 0)
	this.level_ind 			= 0;
	this.map 				= [];
	this.level_start_time	= 0;
	this.timer 				= 0;

	this.Initialize();
}

Level.prototype.Initialize = function () {
	this.map 				= level[this.level_ind];
	this.LoadMap();
	this.player 			= new Player(this);
	this.playerLight 		= new Lamp(this.player.pos, 50, 100, true, this.tiles);
	this.lights 			= [];
	this.lightLimit 		= 20;
	this.camera 			= new Camera();
	this.player.SetPos(this.start_tile_pos);
	this.camera.moveTo(this.player.pos.x, this.player.pos.y);
	this.level_start_time	= GameTime.getCurrentGameTime();
};

Level.prototype.Reset = function () {
	this.tiles  		= [];
	this.player 		= [];
	this.camera 		= [];
	this.timer 			= 0;
	this.Initialize();
};

Level.prototype.LoadMap = function () {
	var x, y, pos, rNormal, fillColor, type, collision;

	// Set Game variables based on map size
	game.square 		= parseInt(this.map[0][0].s, 10);
	game.map_size_x 	= parseInt(this.map[0].length, 10);
	game.map_size_y 	= parseInt(this.map.length, 10);
	game.world_width	= game.square * game.map_size_x;
	game.world_height	= game.square * game.map_size_y;

	// Loop through our map to create our tiles array
	for (y = 0; y < game.map_size_y; y++) {
		this.tiles[y] = [];
		for (x = 0; x < game.map_size_x; x++) {

			// Get position and type of tile
			pos = new Vector2(x * game.square, y * game.square);
			type = this.map[y][x].t;

			// Based on tile type, set tile color and collision
			if (type === 'normal') {
				// fillColor = rNormal[random(0,2)];
				collision = 'PASSABLE';
			} else if (type === 'wall') {
				// fillColor = '#000000';
				collision = 'IMPASSABLE';
			} else if (type === 'start') {
				// fillColor = rNormal[random(0,2)];
				collision = 'START';
				this.start_tile_pos = pos;	// Record player start position
			} else { // EXIT
				// fillColor = '#11BE41';
				collision = 'EXIT';
			}

			// Add tile to tile array
			this.tiles[y].push(new Tile(pos, '#000000', collision));

		}
	}

};

Level.prototype.FoundExit = function () {
	this.level_ind = (this.level_ind + 1 > this.level_max) ? 0 : this.level_ind + 1;	// Found exit, go to next level (or back to first level if we've reached the level_max).
	this.Reset();
};

Level.prototype.ClearKeyLocks = function () {

	// SPACE: Adds a stationary torch
	if (this.isSpaceLocked && (GameTime.getCurrentGameTime() - this.spaceLockTime) >= 0.5) this.isSpaceLocked = false;

};

Level.prototype.update = function () {

	// Update FPS
	this.fps = fps.getFPS();
	// Update level timer
	this.timer = Math.floor(GameTime.getCurrentGameTime() - this.level_start_time);

	// Clear key locks
	this.ClearKeyLocks();

	// Add a light where the player is.
	if (Input.Keys.GetKey(Input.Keys.SPACE) && !this.isSpaceLocked) {

		// Lock the sapce bar
		this.isSpaceLocked = true;
		this.spaceLockTime = GameTime.getCurrentGameTime();

		// If we still have lights to use, add a new light
		if (this.lightLimit > this.lights.length) {
			newLight = new Lamp(this.player.pos, 75, 150, false, this.tiles);
			newLight.update();
			this.lights.push(newLight);
		}

	}

	// Update our Player and the player light
	this.player.update();
	this.playerLight.update(this.player.pos);

	// Update camera
	cameraPosX = this.player.pos.x + (this.player.size.x / 2) - (game.CANVAS_WIDTH / 2);
	cameraPosY = this.player.pos.y + (this.player.size.y / 2) - (game.CANVAS_HEIGHT / 2);

	// Make sure the camera doesn't go past the world bounds
	if (cameraPosX < 0) 
		cameraPosX = 0;
	else if (cameraPosX > (game.world_width - game.CANVAS_WIDTH))
		cameraPosX = game.world_width - game.CANVAS_WIDTH;

	if (cameraPosY < 0)
		cameraPosY = 0;
	else if (cameraPosY > (game.world_height - game.CANVAS_HEIGHT))
		cameraPosY = game.world_height - game.CANVAS_HEIGHT;

	this.camera.moveTo(cameraPosX, cameraPosY);

};

Level.prototype.draw = function () {
	var l;

	this.camera.begin();

	// Draw our lights
	for (l = 0; l < this.lights.length; l++) {
		this.lights[l].draw();
	}

	// Draw player and player light
	this.playerLight.draw();
	this.player.draw();

	this.camera.end();

	// Draw Level Number
	DrawText('LEVEL: ' + (parseInt(this.level_ind, 10) + 1), 5, 20, 'normal 14pt "Josefin Sans"', 'rgba(255, 255, 255, 0.7)');

	// Draw FPS
	DrawText('FPS: ' + this.fps, ((game.CANVAS_WIDTH / 2) - 40), 20, 'normal 14pt "Josefin Sans"', 'rgba(255, 255, 255, 0.7)');

	// Draw Timer
	DrawText('TIMER: ' + SecondsToTime(this.timer), game.CANVAS_WIDTH - 106, 20, 'normal 14pt "Josefin Sans"', 'rgba(255, 255, 255, 0.7)');

	// Draw Number of Lights Left
	DrawText('LIGHTS LEFT: ' + (this.lightLimit - this.lights.length), 5, (game.CANVAS_HEIGHT - 5), 'normal 14pt "Josefin Sans"', 'rgba(255, 255, 255, 0.7)');

};


/*****************
*****  MAIN  *****
*****************/
var game = {
	init: function () {
		var difficultyBtns, i;
		this.isRunning				= true;
		this.CANVAS_WIDTH			= 750;
		this.CANVAS_HEIGHT			= 450;
		this.world_width 			= 0;
		this.world_height 			= 0;
		this.map_size_x				= 0;	// In tiles
		this.map_size_y				= 0;	// In tiles
		this.square					= 0;
		this.canvas					= document.getElementById('viewport');
		this.context				= this.canvas.getContext('2d');
		this.level					= new Level();

		// Create event listeners
		window.addEventListener('keyup', function (e) { Input.Keys.onKeyUp(e); }, false);
		window.addEventListener('keydown', function (e) { Input.Keys.onKeyDown(e); }, false);

		// Game Loop
		game.run();
	},
	run: function () {
		if (game.isRunning) {
			GameTime.update();
			game.update();
			game.draw();
		}
		requestAnimationFrame(game.run);
	},
	update: function () {
		game.level.update();
	},
	draw: function () {
		game.context.clearRect(0, 0, game.CANVAS_WIDTH, game.CANVAS_HEIGHT);
		game.level.draw();
	}
};