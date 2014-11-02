angular.module('app.directive.bossy.slider', [])
    .controller('SliderController', ['$scope', '$sce', function ($scope, $sce) {


        //we can change these values freely with out fear of breaking aesthetics
        $scope.max = 10;
        $scope.min = 1;
        $scope.orientation = "horizontal";


        //"Art" for a bar piece
        $scope.barPiece = '<div style="display:inline-block;width:10px;height:10px;background-color:#0000FF;"></div>';

        //"Art" for a slider button
        $scope.slideBut = '<div style="display:inline-block;width:10px;height:10px;background-color:red;"></div>';

        //as it is named it is used to maintain correct alignment with the slider bar array
        var offSet;

        //initialize the slider bar to what ever size we need it uses
        $scope.makeBar = function () {
            var constructSlider = [];
            for (var current = $scope.min; current <= $scope.max; current++) {
                constructSlider.push($scope.barPiece);
            }

            offSet = $scope.min - 1;
            //button should show up in the middle now or close to if uneven
            $scope.value = parseInt(($scope.max + $scope.min) / 2);
            constructSlider[$scope.value - ($scope.min)] = $scope.slideBut;
            return constructSlider;
        };

        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };


        //checks bounds when attempting to decrease the value: They Now work well with negitive min values
        $scope.increase = function () {
            if ($scope.value < $scope.max) {
                $scope.slider[$scope.value - offSet - 1] = $scope.barPiece;
                $scope.value = $scope.value + 1;
                $scope.slider[$scope.value - offSet - 1] = $scope.slideBut;
            }
            $scope.draw();
        };

        //checks bounds when attempting to decrease the value
        $scope.decrease = function () {
            if ($scope.value > $scope.min) {
                $scope.slider[$scope.value - offSet - 1] = $scope.barPiece;
                $scope.value = $scope.value - 1;
                $scope.slider[$scope.value - offSet - 1] = $scope.slideBut;
            }
            $scope.draw();
        };

        //This function is to bind the decrease and increase function with the arrow keys
        $scope.keyBind = function (ev) {
            $scope.pressed = ev.which;
            //If arrow key(Left or Down) is pressed then call the decrease() function to decrease the value.
            if ($scope.pressed === 37 || $scope.pressed === 40) {
                $scope.decrease();
            }
            //same as above but for Up or Right to increase the value.
            if ($scope.pressed === 38 || $scope.pressed === 39) {
                $scope.increase();
            }
        };

        $scope.draw = function () {  //function takes the slider array and creates a string of the contents. 
            $scope.string = "";
            //changed to the angular forEach loop for readability
            angular.forEach($scope.slider, function (item) {
                $scope.string += item;
            })
            return $scope.string;

        };
        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };

    }]).directive('bossySlider', function () {
        return {
            //allows the slider to be created as and attribute or element <bossy-slider><bossy-slider>
            restrict: 'AE',
            controller: 'SliderController',
            //This is the template the slider form takes and inserts into HTML
            template: '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button><span ng-bind-html="renderHtml(string)"></span><button ng-click="increase()" ng-keydown="keyBind($event)">+</button><p>The value is {{value}} and orientation is {{orientation}}!</p>',
            scope: {
                ngModel: '='
            },
            link: function (scope, iElem, iAttr) {
                if (iAttr.max) {
                    scope.max = parseInt(iAttr.max);
                }
                if (iAttr.min) {
                    scope.min = parseInt(iAttr.min);
                }
                if (iAttr.orientation) {
                    scope.orientation = iAttr.orientation;
                }

                scope.slider = scope.makeBar();
                scope.draw();
            }
        }
    });