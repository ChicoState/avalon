

var myApp = angular.module('mySlider', []);

myApp.controller('SliderController', ['$scope', function($scope) {
    $scope.value = 5;
    
    $scope.slider = ['-','-','-','-','o','-','-','-','-'];
    $scope.increase = function() {
        $scope.slider[$scope.value - 1] = '-';
        $scope.value = $scope.value + 1;
        $scope.slider[$scope.value - 1] = 'o';
    };

    $scope.decrease = function() {
        $scope.slider[$scope.value - 1] = '-';
        $scope.value = $scope.value - 1;
        $scope.slider[$scope.value - 1] = 'o';
    };
//    $scope.draw = function() {
//        var slider = ['-','-','-','-','-','-','-','-','-'];
//        for(var i = 0; i < 10; i++)
//        {
//            
//        }
//    };
    
}]);