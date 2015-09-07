'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/user-profile');

		console.log($scope.authentication.user.isAdmin);

		var gender = [
			'Male',
			'Female'
		];

		var salutation = [
			['Mr', 'Sir', 'Senior', 'Count'],
			['Miss', 'Ms', 'Mrs', 'Madame', 'Majesty', 'Seniora']
		];

		$scope.gender = gender;
		$scope.salutation = [];

		try {
			$scope.getSalutation = function () {
				var key = $scope.gender.indexOf($scope.credentials.gender);
				var myNewOptions = salutation[key];
				$scope.salutation = myNewOptions;

				console.log('Key = ' + key);
			};
		} catch(e) {
			console.log('Invalid Gender');
		}


		// $scope.calculateAge = function calculateAge(birthday) { // birthday is a date
    	// 	var ageDifMs = Date.now() - birthday.getTime();
    	// 	var ageDate = new Date(ageDifMs); // miliseconds from epoch
    	// 	return Math.abs(ageDate.getUTCFullYear() - 1970)}
		// };

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/user-profile');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/user-profile');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
