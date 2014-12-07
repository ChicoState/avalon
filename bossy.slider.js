
/*This is a slider widget created in angular as part of the BossyUI widgets.
 * The easiest way to use the slider is to include it in your HTML and then
 * create a tag <bossy-slider></bossy-slider>. This widget take in several
 * ways to customize. Currently it takes max, min, and orientation. It is
 * expected to take color and button color. ex.
 * <bossy-slider max="20" min="-5" orientation="vertical"></bossy-slider>*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

var app = angular.module('bossy.slider', []);
app.controller('SliderController', ['$scope', function ($scope) {
    //these are our default values and are the variables that can be changed by user of our widgets
    $scope.max = 10;
    $scope.value = 0;
    $scope.min = 1;
    $scope.fillWidth = 0;
    $scope.emptWidth = 0;
    $scope.barWidth = 50;
    $scope.barPiece = 0;
    $scope.step = 1;
    $scope.isMouseDown = 0;
    $scope.xCord = 0;
    $scope.newXCord = 0;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*makeBar()
     * This creates the initial graphic of the slider and ensures it is in the correct order*/
    $scope.makeBar = function () {
        //button should show up in the middle now or close to if uneven
        $scope.value = parseInt(($scope.max + $scope.min) / 2);
        for (var current = $scope.min; current <= $scope.max; current++) {
            if (current < ($scope.value)) {
                $scope.fillWidth++;
            }
            if (current > ($scope.value)) {
                $scope.emptWidth++;
            }
            if (current == ($scope.value)) {
            }
        }
        $scope.ngModel = $scope.value;
        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*increase()
     * This checks bounds when attempting to increase the value and moves the position
     * of the slider button and updates the value.*/
    $scope.increase = function () {
        if ($scope.value < $scope.max) {
            $scope.value = $scope.value + 1;
            $scope.fillWidth++;
            $scope.emptWidth--;
            $scope.ngModel = $scope.value;
        }
        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.butIncrease = function () {
        var i = 0;
        for (i = 0; i < $scope.step; i++) {
            $scope.increase();
        }
    }

    /*decrease()
     * This checks bounds when attempting to decrease the value and moves the position
     * of the slider button and updates the value.*/
    $scope.decrease = function () {
        if ($scope.value > $scope.min) {
            $scope.value = $scope.value - 1;
            $scope.fillWidth--;
            $scope.emptWidth++;
            $scope.ngModel = $scope.value;
        }
        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.butDecrease = function () {
        var i = 0;
        for (i = 0; i < $scope.step; i++) {
            $scope.decrease();
        }
    }

    /*keyBind($event)
     * This function is to bind the decrease and increase function with the arrow keys*/
    $scope.keyBind = function (ev) {
        $scope.pressed = ev.which;
        //If arrow key(Left or Down) is pressed then call the decrease() function to decrease the value.
        if ($scope.pressed === 37 || $scope.pressed === 40) {
            var i = 0;
            for (i = 0; i < $scope.step; i++) {
                $scope.decrease();
            }

        }
        //same as above but for Up or Right to increase the value.
        if ($scope.pressed === 38 || $scope.pressed === 39) {
            for (i = 0; i < $scope.step; i++) {
                $scope.increase();
            }

        }
        return;
    };

    /*barClick()
     * This function is to allow the value to be changed when clicking on the bar*/
    $scope.greyClick = function (event) {
        //When click on the empty bar the bar will increase
        $scope.increase();

        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.barClick = function (event) {
        //When click on the Filled up color side the bar will decrease
        $scope.decrease();

        return;
    };
    $scope.drag = function (event) {

        var x = event.clientX;
        var y = event.clientY;
        if ($scope.isMouseDown) {
            if ($scope.xCord === 0) {
                $scope.xCord = x;
            }
            else {
                $scope.newXCord = x;
                if (($scope.newXCord - $scope.xCord) > $scope.barPiece) {

                    $scope.increase();
                }
                if (($scope.newXCord - $scope.xCord) < -($scope.barPiece)) {
                    $scope.decrease();
                }
            }
            console.log($scope.newXCord - $scope.xCord + " " + $scope.barPiece);
            //console.log("The mouse is down: " + x + " " + y);
        }
        else {
            $scope.newXCord = 0;
            $scope.xCord = 0;
            console.log("The mouse is up: " + x + " " + y);
        }
    };
    $scope.down = function (event) {
        $scope.isMouseDown = 1;
    };
    $scope.up = function (event) {
        $scope.isMouseDown = 0;
    };
    this.getData = function () {
        return $scope.value;
    };
}])
app.directive('bossySlider', function ($compile) {
    var myTemplate;
    return {
        //allows the slider to be created as and attribute or element <bossy-slider><bossy-slider>
        restrict: 'AE',
        controller: 'SliderController',
        scope: {
            ngModel: '='
        },
        /*link: function:
         * This allows us to pull in the settings the programmer wants for the slider and set things correctly
         * it also initializes the slider and adds the correct orientation template to the DOM*/
        link: {
            pre: function (scope, iElem, iAttr) {

                //checks to see if there is a max attribute
                if (iAttr.max) {
                    scope.max = parseInt(iAttr.max);
                    if (scope.max === NaN) {
                        scope.max = 10;
                    }
                }
                //checks to see if there is a min attribute
                if (iAttr.min) {
                    scope.min = parseInt(iAttr.min);
                    if (scope.min === NaN) {
                        scope.min = 1;
                    }
                }
                //checks for bar color customization
                scope.barfillcolor = "#0000FF";
                if (iAttr.barfillcolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.barfillcolor)) {
                        scope.barfillcolor = iAttr.barfillcolor;
                    }
                }
                //checks for empty bar color customization
                scope.baremptycolor = "#D3D3D3";
                if (iAttr.baremptycolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.baremptycolor)) {
                        scope.baremptycolor = iAttr.baremptycolor;
                    }
                }

                scope.buttoncolor = "#FF0000";
                if (iAttr.buttoncolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.buttoncolor)) {
                        scope.buttoncolor = iAttr.buttoncolor;
                    }
                }
                if (iAttr.step) {
                    scope.step = iAttr.step;
                }
                if (iAttr.width) {
                    scope.barWidth = iAttr.width;
                    scope.barPiece = (scope.barWidth / (scope.max - scope.min));
                }
                else {
                    scope.barPiece = (scope.barWidth / (scope.max - scope.min));
                }
                //checks to see if there is a orientation attribute if there is set our template to the vertical template
                if (iAttr.orientation) {
                    if ('vertical' === iAttr.orientation) {
                        myTemplate = '<button ng-click="butIncrease()" ng-keydown="keyBind($event)">+</button>' +
                        '<div ng-click="greyClick()"style="margin-left:9px;width:3px;height:{{barPiece * emptWidth}}px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                        '<div draggable orientation="vertical" style="position:absolute;cursor:move;margin-top:-4px;margin-left:5px;width:10px;height:10px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                        '<div  ng-click="barClick()"style="margin-left:9px;width:3px;height:{{barPiece * fillWidth}}px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                        '<button ng-click="butDecrease()" ng-keydown="keyBind($event)">-</button>';
                    }
                }
                else {
                    //this builds our horizontal template
                    myTemplate = '<button ng-click="butDecrease()" ng-keydown="keyBind($event)">-</button>' +
                    '<div ng-click="barClick()"style="display:inline-block;width:{{barPiece * fillWidth}}px;height:3px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                    '<div ng-mousemove="drag($event)" ng-mousedown="down()" ng-mouseup="up()"orientation="horizontal" style="position:absolute;cursor:move;display:inline-block;width:10px;height:10px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                    '<div ng-click="greyClick()"style="display:inline-block;width:{{barPiece * emptWidth}}px;height:3px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                    '<button ng-click="butIncrease()" ng-keydown="keyBind($event)">+</button>';
                }
                //We show our template and then compile it so the DOM knows about our ng functions
                iElem.html(myTemplate);
                $compile(iElem.contents())(scope);
                //create the initial bar
                scope.makeBar();
                console.log(scope.value);
                return;
            }
        }
    }
});
/*app.controller('DragController', ['$scope', function ($scope){
    //$scope.myValue = $scope.value;
    $scope.something = $scope.makeBar();
}]);
app.directive('draggable', ['$document' , function($document) {
    return {
        restrict: 'A',
        scope: false,
        require: '^bossySlider',
        controller: 'DragController',
        //controller: 'SliderController',
        // {
        //we will need this to alter code for vertical orientation of the slider.
        //  orient: '='
        //}
        link: function(scope, elm, attrs, crtl) {
            var startX, startY, initialMouseX, initialMouseY, disx, disy;
            //scope.something;
            console.log(crtl.getData());
            //console.log(scope.myValue);
            elm.css({position: 'absolute'});
            elm.bind('mousedown', function($event) {
                startX = elm.prop('offsetLeft');
                startY = elm.prop('offsetTop');
                initialMouseX = $event.clientX;
                initialMouseY = $event.clientY;
                $document.bind('mousemove', mousemove);
                $document.bind('mouseup', mouseup);
                return false;
            });

            function mousemove($event) {
                disx = $event.clientX - initialMouseX;
                disy = $event.clientY - initialMouseY;
                if (attrs.orientation === "vertical")
                {
                    elm.css({
                        top:  startY + disy + 'px',
                    });
                } else {
                    elm.css({
                        left: startX + disx + 'px',
                    });
                }
                return false;
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }
    };
}]);*/
