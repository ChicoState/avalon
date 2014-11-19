describe('Unit: SliderController', function() {
  // Load the module with MainController
  beforeEach(module('app.directive.bossy.slider'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('SliderController', {
      $scope: scope
    });
    scope.makeBar();
  }));

  it('should increment the slider value when calling increase', function() {
      expect(scope.value).toEqual(5);
      scope.increase();
      expect(scope.value).toEqual(6);
  });

  it('should decrement the slider value when calling decrease', function() {
      expect(scope.value).toEqual(5);
      scope.decrease();
      expect(scope.value).toEqual(4);
  });

  it('should not increment past the max', function() {
      scope.value = scope.max;
      expect(scope.value).toEqual(9);
      scope.increase();
      expect(scope.value).toEqual(scope.max);
 	  scope.increase();
 	  scope.increase();
      expect(scope.value).toEqual(scope.max);
      expect(scope.value).toEqual(9);
  });

  it('should not decrement past the min', function() {
  	  scope.value = scope.min;
      expect(scope.value).toEqual(1);
      scope.decrease();
      expect(scope.value).toEqual(scope.min);
 	  scope.decrease();
 	  scope.decrease();
      expect(scope.value).toEqual(scope.min);
      expect(scope.value).toEqual(1);
  });

})