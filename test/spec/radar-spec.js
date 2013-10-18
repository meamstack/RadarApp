describe('MainCtrl', function(){
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  it("contains spec with an expectation", function() {
    expect(9).toEqual(9);
  });

	var scope, $httpBackend;//we'll use these in our tests

  //mock Application to allow us to inject our own dependencies
	beforeEach(angular.mock.module('meetmeapp'));
	//mock the controller for the same reason and include $rootScope and $controller
	beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
	    $httpBackend = _$httpBackend_;
	    $httpBackend.when('GET', 'Users/users.json').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}]);

	    //create an empty scope
	    scope = $rootScope.$new();
	    //declare the controller and inject our empty scope
	    $controller('MainCtrl', {$scope: scope});
	}));
	// tests start here
	it('should have variable text = "Hello World!"', function(){
		  console.log(scope);
	    expect(scope.text).toBe('Hello World!');
	});
	/*it('should fetch list of users', function(){
	    $httpBackend.flush();
	    expect(scope.users.length).toBe(2);
	    expect(scope.users[0].name).toBe('Bob');
	});*/
});