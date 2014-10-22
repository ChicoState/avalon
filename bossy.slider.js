angular.module('app.directive.bossy.slider', [])
    .controller('SliderController', ['$scope','$sce', function ($scope, $sce) {
        $scope.value = 5;
        $scope.max = 9;
        $scope.min = 1;
        $scope.barPiece = '<div style="display:inline-block;width:10px;height:10px;background-color:#0000FF;"></div>';
        $scope.slideBut = '<div style="display:inline-block;width:10px;height:10px;background-color:red;"></div>';
        $scope.slider = [$scope.barPiece, $scope.barPiece, $scope.barPiece, $scope.barPiece, $scope.slideBut, $scope.barPiece, $scope.barPiece, $scope.barPiece, $scope.barPiece];
        $scope.string = $scope.slider.toString().split(",").join("");
        //$scope.defaults = {
        //    max: 9,
        //    min: 1,
        //    orientation: 'horizantal'
        //};
        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };
        $scope.orientation = 'horizantal';
        
        //$scope.option = {
        //    wheels: '3',
        //    color: 'blue'
        //};
        //$scope.option = $scope.setter;
        //angular.extend($scope.defaults, $scope.option);
        //angular.extend($scope.sliderDefault, $scope.options);
        //angular.extend($scope.sliderDefault.orientation, options);

        //checks bounds when attempting to decrease the value
        $scope.increase = function () {
            if ($scope.value < $scope.max) {
                $scope.slider[$scope.value - 1] = $scope.barPiece;
                $scope.value = $scope.value + 1;
                $scope.slider[$scope.value - 1] = $scope.slideBut;
            }
            $scope.draw();
        };

        //checks bounds when attempting to decrease the value
        $scope.decrease = function () {
            if ($scope.value > $scope.min) {
                $scope.slider[$scope.value - 1] = $scope.barPiece;
                $scope.value = $scope.value - 1;
                $scope.slider[$scope.value - 1] = $scope.slideBut;
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
            template: '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button><span ng-bind-html="renderHtml(string)">{{}}</span><button ng-click="increase()" ng-keydown="keyBind($event)">+</button><p>The value is {{value}} and orientation is {{options}}!</p>',
            scope: {
                options: '@options'
            }
        }
    });