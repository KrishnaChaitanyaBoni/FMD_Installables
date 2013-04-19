
/*
  jquery.earth3d.js

  jQuery ui plugin that allow you to draw a beautiful 3d spinning earth on canvas

  Author: Sebastien Drouyer

  Based on the amazing sphere.js plug of Sam Hasler

  Licensed under the MIT license (MIT-LICENSE.txt)

  http://sdrdis.github.com/jquery.earth-3d/



  Depends:
    ui.core.js




  Options:
    * texture: texture map used by the planet

    * sphere: rotation and size of the planet

    * defaultSpeed: default spinning speed of the planet

    * backToDefaultTime: time (in ms) to return by to default speed when planet is dragged

    * locations: locations to display on the planet:
      * Each position must have a key, an alpha and delta position (or x and y if you want to display a static location).
        Any additional key can be reached via callbacks functions
        Example:
          {
            obj1: {
              alpha: Math.PI / 4,
              delta: 0,
              name: 'location 1'
            }
          }

    * paths: paths and flights to display over the planet:
       Each path must have a key, an origin and a destination. The values are the location's key.
       You can, if you want to, define flights on these paths.
       Each flight has a key, a destination (the location's key) and a position.
       The position is the progress a fleet has made on its path.
       Any additional key can be reach via callbacks functions.
       Example:
        {
          path: {
            origin: 'obj1',
            destination: 'obj2',
            flights: {
              flight: {
                position: 0.25,
                destination: 'obj2',
                name: 'Flight 1'
              },
              flight2: {
                position: 0.25,
                destination: 'obj1',
                name: 'Flight 2'
              }
            }
          }
        }

    * flightsCanvas: Dom element which is a canvas and where the flights and paths are drawn

    * dragElement: Dom element where we catch the mouse drag

    * locationsElement: Dom elements where the locations are drawn

    * flightsCanvasPosition: position of the flight canvas (can be use if you have some gap between your planet and your flights

    * pixelRadiusMultiplier: (TEMPORARY) used by the getSphereRadiusInPixel (see the functions)

    * onInitLocation: callback function which allows you to define what to do when the locations are initialized
      * Parameters:
        * location: location (coming from locations option)
        * widget: earth3d widget object

    * onShowLocation: callback function which allows you to define what to do when a location becomes visible (was behind the planet and is now in front of it)
      * Parameters:
        * location: location (coming from locations option)
        * x: 2d left position
        * y: 2d top position
        * widget: earth3d widget object

    * onRefreshLocation: callback function which allows you to define what to do when a location is refreshed (it moves)
      * Parameters:
        * location: location (coming from locations option)
        * x: 2d left position
        * y: 2d top position
        * widget: earth3d widget object

    * onHideLocation: callback function which allows you to define what to do when a location becomes invisible (was in front of the planet and is now behind it)
      * Parameters:
        * location: location (coming from locations option)
        * x: 2d left position
        * y: 2d top position
        * widget: earth3d widget object

    * onInitFlight: callback function which allows you to define what to do when the flights are initialized
      * Parameters:
        * flight: flight (coming from flights option)
        * widget: earth3d widget object

    * onShowFlight: callback function which allows you to define what to do when a flight becomes visible (was behind the planet and is now in front of it)
      * Parameters:
        * flight: flight (coming from flights option)
        * widget: earth3d widget object

    * onRefreshFlight: callback function which allows you to define what to do when a flight is refreshed (it moves)
      * Parameters:
        * flight: flight (coming from flights option)
        * x: 2d left position
        * y: 2d top position
        * widget: earth3d widget object

    * onHideFlight: callback function which allows you to define what to do when a flight becomes invisible (was in front of the planet and is now behind it)
      * Parameters:
        * flight: flight (coming from flights option)
        * widget: earth3d widget object






  Functions

    * getSphereRadiusInPixel: function which allows you to get the sphere radius in pixel
      /!| WARNING: this function needs to be refactored, since I didn't find out (my maths courses are far away) how to
      get the exact value. I did a basic linear regression, but it is not exact, and you will have to change the pixelRadiusMultiplier
      option to get the correct value

    * destroy: use this function when you want to destroy the object. It will throw a cancel animation frame, so the
      CPU won't be used anymore.

    * changePaths: use this function when you want to update paths and flights (options on widget)
      it will add the callback functions support

 */

(function($) {
  $.widget('ui.earth3d', {
    options: {
      texture: 'images/globe_imgs/earth1024x1024.jpg',
      sphere: {
        tilt: 20,
        turn: 0,
        r: 13
      },
      defaultSpeed: 30,
      backToDefaultTime:2000,
      locations: {
      },
      paths: {
      },
      flightsCanvas: null,
      dragElement: null,
      locationsElement: null,
      flightsCanvasPosition: {
        x: 0,
        y: 0
      },
      tiling: {horizontal: 1, vertical: 1},
      pixelRadiusMultiplier: 0.93,
      onInitLocation: function(location, widget) {
        var $elem;
		var $e = $('<div style="psoition:relative;"></div>');
		var $e1;
		if(location.name == 'New York'){
			$elem = $('<div class="location newyork_loc"></div>');
			$e1 = $('<div class="newyork_arrow"></div><div class="name newyork_name"></div>');
		}else if(location.name == 'Chicago'){
			$elem = $('<div class="location chicago_loc"></div>');
			$e1 = $('<div class="chicago_arrow"></div><div class="name chicago_name"></div>');
		}else{
			$elem = $('<div class="location universalstudio_loc"></div>');
			$e1 = $('<div class="universal_studios_arrow"></div><div class="name universal_studios_name"></div>');
		}
          
          setTimeout(function() {
               $elem.appendTo(widget.options.locationsElement);
          }, 200);
          
       
        $e1.text(location.name);
		$e.append($e1);
		$elem.append($e);
        $elem.bind('click touchstart',function() {
//            alert('Clicked on ' + location.link);
            
              window.open(location.link);            
            
        });
        location.$element = $elem;
      },
      onShowLocation: function(location, x, y) {
        location.$element.show();
		
      },
      onRefreshLocation: function(location, x, y) {
        //console.log(x, y);
        location.$element.css({
          left: x,
          top: y
        });
      },
      onHideLocation: function(location, x, y) {
        location.$element.hide();
      },
      onDeleteLocation: function(location) {
        location.$element.remove();
      },
    },
    earth: null,
    posVar: 24 * 3600 * 1000,
    lastMousePos: null,
    lastSpeed: null,
    lastTime: null,
    lastTurnByTime: null,
    textureWidth: null,
    textureHeight: null,
    obj: null,
    flightsCtx: null,
    renderAnimationFrameId: null,
    mousePressed: null,

    _create: function() {
      var self = this;
      this.obj = $('div');
      if (this.options.flightsCanvas !== null) {
        this.flightsCtx = this.options.flightsCanvas[0].getContext('2d');
      }
      createSphere(this.element[0], this.options.texture, function(earth, textureWidth, textureHeight) { self._onSphereCreated(earth, textureWidth, textureHeight); }, this.options.tiling);
      if (this.options.dragElement !== null) {
      this.options.dragElement
        /*.mousedown(function(e) {
        self._mouseDragStart(e);
        self.mousePressed = true;
      })
        .mouseup(function(e) {
          self._mouseDragStop(e);
          self.mousePressed = false;
        })
         .mousemove(function(e){
          if (self.mousePressed) {
            self._mouseDrag(e);
          }
        });
        */
        
        .bind('mousedown touchstart',function(e) {
              
        self._mouseDragStart(e);
        self.mousePressed = true;
      })
        .bind('mouseup touchend',function(e) {
          self._mouseDragStop(e);
          self.mousePressed = false;
        })
        
        /*.bind('mousemove touchmove',function(e){
          if (self.mousePressed) {
            self._mouseDrag(e);
          }
        })*/;
      }
      this._initLocations();
    },

    _initLocations: function() {
      for (var key in this.options.locations) {
        var location = this.options.locations[key];
        location.visible = true;
        this.options.onInitLocation(location, this);
      }
    },



    getSphereRadiusInPixel: function() {
      /*
       4:81
       8:167
       12:261
       6:123
       10:213
       2:41
       3:61
       9:189
       7:143
       5:101
       */
      //y = -0.281536 x^2  +  -18.0437x + -4.04651
      //pair : y = -0.25 x^2  +  -18.5x + -3
      //impair

      /*var r = this.options.sphere.r * this.element.width() * this.options.pixelRadiusMultiplier / 300;
      var pR = -0.281536 * r * r - 18.0437 * r - 4.04651;
      return pR / 2;*/
	  var r = this.options.sphere.r * this.element.width() * this.options.pixelRadiusMultiplier / 300;
	  if(this.element.width() == 600){
		var pR = -0.24 * r * r - 18.0437 * r - 4.04651;
	  }else if(this.element.width() == 400){
		var pR = -0.4 * r * r - 18.0437 * r - 4.04651;
	  }else{
		var pR = -0.5 * r * r - 18.0437 * r - 4.04651;
	  }
	  //alert(pR/2);
      return pR / 2;
	  
    },

    _onSphereCreated: function(earth, textureWidth, textureHeight) {
      var self = this;
      this.textureWidth = textureWidth;
      this.textureHeight = textureHeight;
      this.earth = earth;
      this.earth.init(this.options.sphere);
      this.earth.turnBy = function(time) { return self._turnBy(time); };

      var renderAnimationFrame = function(/* time */ time) {
        /* time ~= +new Date // the unix time */
        earth.renderFrame(time);
        self._renderAnimationFrame(time);
        self.renderAnimationFrameId = window.requestAnimationFrame(renderAnimationFrame);
      };
      this.renderAnimationFrameId = window.requestAnimationFrame(renderAnimationFrame);
    },

    destroy: function() {
      window.cancelAnimationFrame(this.renderAnimationFrameId);
    },

    _renderAnimationFrame: function(time) {


      var ry=90+this.options.sphere.tilt;
      var rz=180+this.options.sphere.turn;

      var RY = (90-ry);
      var RZ = (180-rz);
      var RX = 0,RY,RZ;

      var rx=RX*Math.PI/180;
      var ry=RY*Math.PI/180;
      var rz=RZ*Math.PI/180;
      //console.log(rx, ry, rz);
      var r = this.getSphereRadiusInPixel();

      var center = {
        x: this.element.width() / 2,
        y: this.element.height() / 2
      }

      for (var key in this.options.locations) {
        var location = this.options.locations[key];

        if (typeof location.delta === 'undefined') {
          location.flatPosition = {x: location.x, y: location.y};
          this.options.onRefreshLocation(location, location.x, location.y, this);
          continue;
        }

        /*
          WARNING: calculation of alphaAngle and deltaAngle is not exact
          I had to create the _calibrated functions to modify the deltaAngle to make the result look good on
          a spinning planet without rotation. It will totally bug with rotation!
        * */
        var progression = (((this.posVar + this.textureWidth * location.delta / (2 * Math.PI)) % this.textureWidth) / this.textureWidth);
        var alphaAngle = progression * 2 * Math.PI;
        var deltaAngle = this._calibrated(progression, location.alpha) * 2 * Math.PI;


        var objAlpha = ry + location.alpha - Math.sin(alphaAngle / 2) * 0.15 * (location.alpha - Math.PI / 2) / (Math.PI / 4);
        var objDelta = rz + deltaAngle;

        var a = this._orbitalTo3d(objAlpha, objDelta, r);

        var flatPosition = this._orthographicProjection(a);

        if (a.x < 0 && !location.visible) {
          this.options.onShowLocation(location, flatPosition.x, flatPosition.y, this);
        }
        if (a.x > 0 && location.visible) {
          this.options.onHideLocation(location, flatPosition.x, flatPosition.y, this);
        }
        this.options.onRefreshLocation(location, flatPosition.x, flatPosition.y, this);

        location.visible = a.x < 0;
        location.position = a;
        location.flatPosition = flatPosition;
        location.rAlpha = objAlpha;
        location.rDelta = objDelta;

      }

      if (this.flightsCtx !== null) {
        this.flightsCtx.clearRect(0, 0, this.options.flightsCanvas.width(), this.options.flightsCanvas.height());
        for (var key in this.options.paths) {
          this._drawPath(this.options.paths[key], center, r);
        }
      }
    },
           


    _line_circle_intersection: function(A, B, C, r) {
      var d = {
        x: B.x - A.x,
        y: B.y - A.y
      };

      var f = {
        x: A.x - C.x,
        y: A.y - C.y
      };

      var a = this._dot(d, d);
      var b = 2 * this._dot(f, d);
      var c = this._dot(f, f) - r * r;

      var discriminant = b * b - 4 * a * c;
      if (discriminant < 0) {
        return false;
      } else {
        discriminant = Math.sqrt(discriminant);
        var t1 = (-b + discriminant) / (2 * a);
        var t2 = (-b - discriminant) / (2 * a);


        var sols = [];

        if (t1 >= 0 && t1 <= 1) {
          sols.push({
            x:A.x + t1 * d.x,
            y:A.y + t1 * d.y
          });
        }

        if (t2 >= 0 && t2 <= 1) {
          sols.push({
            x:A.x + t2 * d.x,
            y:A.y + t2 * d.y
          });
        }

        return sols;
      }
    },

    _dot: function(A, B) {
      return A.x * B.x + A.y * B.y;
    },

    _drawPath: function(path, center, r) {
	},

    _distance: function(A, B) {
      if (A.z) {
        return Math.sqrt(
          (A.x - B.x) * (A.x - B.x) +
            (A.y - B.y) * (A.y - B.y) +
            (A.z - B.z) * (A.z - B.z)
        );
      } else {
        return Math.sqrt(
          (A.x - B.x) * (A.x - B.x) +
            (A.y - B.y) * (A.y - B.y)
        );
      }
    },

    // WARNING: temporary function to make the locations look good on a spinning planet without rotation
    _calibrated: function(x, alpha) {
      //var calib = 0.3 + 0.15 * Math.abs(alpha - Math.PI / 2) / (Math.PI / 4);
	  var calib = 0.3 + 0.15 * Math.abs(alpha - Math.PI / 2) / (Math.PI / 4);
      //console.log(calib);
      //var y = calib * (4 * (x - 0.5) * (x - 0.5) * (x - 0.5) + 0.5) + (1 - calib) * x;
	  var y = calib * (4 * (x - 0.5) * (x - 0.5) * (x - 0.5) + 0.5) + (1 - calib) * x;
      return y;
    },


    /* WARNING:
      Obviously there is something wrong with _orbitalTo3d and _orthographicProjection, since
      I can't get a descent display of locations when the planet is rotated. That's why I had to create the _calibrated
      function in the first place. I didn't have time to look precisely into it, and I probably don't know enough math.

      I leaved the _3dProjection function I found on wikipedia but is not working. (I might not have correctly understood / write it)
     */
    _orbitalTo3d: function(alpha, delta, r) {
      return {
        x: r * Math.sin(alpha) * Math.cos(delta),
        y: r * Math.sin(alpha) * Math.sin(delta),
        z: r * Math.cos(alpha)
      };
    },

    _orthographicProjection: function(position) {
      return {x: position.y + this.element.width() / 2, y: position.z + this.element.height() / 2};
    },

    _3dProjection: function(a, c, delta, e) {
      // Wikipedia is your friend :) : http://en.wikipedia.org/wiki/3D_projection
      var d = {x: 0, y: 0, z: 0};
      d.x = Math.cos(delta.y) * (Math.sin(delta.z) * (a.y - c.y) + Math.cos(delta.z) * (a.x - c.x)) - Math.sin(delta.y) * (a.z - c.z);
      d.y = Math.sin(delta.x) * (Math.cos(delta.y) * (a.z - c.z) + Math.sin(delta.y) * (Math.sin(delta.z) * (a.y - c.y) + Math.cos(delta.z) * (a.x - c.x)))
        + Math.cos(delta.x) * (Math.cos(delta.z) * (a.y - c.y) - Math.sin(delta.z) * (a.x - c.x))
      d.z = Math.cos(delta.x) * (Math.cos(delta.y) * (a.z - c.z) + Math.sin(delta.y) * (Math.sin(delta.z) * (a.y - c.y) + Math.cos(delta.z) * (a.x - c.x)))
        - Math.sin(delta.x) * (Math.cos(delta.z) * (a.y - c.y) - Math.sin(delta.z) * (a.x - c.x));

      return {
        x: d.z, //(d.x - e.x) * (e.y / d.y),
        y: d.y //(d.z - e.z) * (e.y / d.y)
      };
    },

    _mouseDragStart: function(e) {
      this.lastMousePos = e.clientX;
      this.lastSpeed = null;
    },

    _mouseDrag: function(e) {
      this.lastSpeed = (e.clientX - this.lastMousePos);
      this.posVar = this.posVar - this.lastSpeed;
      this.lastMousePos = e.clientX;
    },
    _mouseDragStop: function(e) {
      this.lastMousePos = null;
      this.lastTime = null;
    },

    _turnBy: function(time) {
      if (this.lastTurnByTime === null) {
        this.lastTurnByTime = time;
      }
      var timeDiff = (time - this.lastTurnByTime) / 1000;
      if (this.lastMousePos === null) {
        if (this.lastSpeed !== null) {
          if (this.lastTime === null) {
            this.lastTime = time;
          }
          if (this.options.backToDefaultTime + this.lastTime - time < 0) {
            this.lastSpeed = null;
          } else {
            var backToDef = (this.options.backToDefaultTime + this.lastTime - time) / this.options.backToDefaultTime;
            this.posVar -= this.lastSpeed * backToDef + (this.options.defaultSpeed * timeDiff) * (1 - backToDef);
          }
        } else {
          this.posVar -= this.options.defaultSpeed * timeDiff;
        }
      }
      this.lastTurnByTime = time;
      return this.posVar;
    },

    _getQBezierValue: function (t, p1, p2, p3) {
      var iT = 1 - t;
      return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
    },

    _getQBezierDerivation: function(t, p1, p2, p3) {
      return (2 * p1 - 4 * p2 + 2 * p3) * t + 2 * p2 - 2 * p1;
    },

    _getQBezierAngle: function(startX, startY, cpX, cpY, endX, endY, position) {
      var x = this._getQBezierDerivation(position, startX, cpX, endX);
      var y = this._getQBezierDerivation(position, startY, cpY, endY);
      return Math.atan2(y, x);
    },

    _getQuadraticCurvePoint: function(startX, startY, cpX, cpY, endX, endY, position) {
      return {
        x:  this._getQBezierValue(position, startX, cpX, endX),
        y:  this._getQBezierValue(position, startY, cpY, endY),
        angle: this._getQBezierAngle(startX, startY, cpX, cpY, endX, endY, position)
      };
    },

    changeLocations: function(locations) {
      for (var key in this.options.locations) {
        this.options.onDeleteLocation(this.options.locations[key], this);
      }
      this.options.locations = locations;
      this._initLocations();
    },

    changePaths: function(paths) {
      for (var key in this.options.paths) {
        var path = this.options.paths[key];
        for (var keyFlight in path.flights) {
          var flight = path.flights[keyFlight];
          this.options.onDeleteFlight(flight, this);
        }
      }
      this.options.paths = paths;
      this._initFlights();
    }

  });

})($);

