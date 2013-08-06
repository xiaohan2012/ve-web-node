'use strict';


// Declare app level module which depends on filters, and services
angular.module('veWeb', ['veWeb.filters', 'veWeb.services', 'veWeb.directives', 'veWeb.controllers',
			 'ui.state', 'ui.utils']).
  config(function($stateProvider) {
      $stateProvider
	  .state("pairwise-comparison",{
	      url: "/pairwise-comparison",
	      templateUrl: 'partials/pairwise-comparison.html',
	      controller: function($scope, $state){
		  $scope.$state = $state;
	      }
	  })
	  .state("pairwise-comparison.select-pair",{
	      url: "/select-pair",
	      templateUrl: "partials/select-pair.html",
	      //controller: PairSelectionController
	  })
	  .state("pairwise-comparison.select-epitope",{
	      url: "/select-epitope",
	      templateUrl: "partials/select-epitope.html"
	  })
	  .state("pairwise-comparison.select-epitope.interactive3D",{
	      url: "/interactive3D",
	      templateUrl: "partials/select-epitope.interactive3D.html"
	  })

      /*
      $routeProvider.when('/pairwise-comparison', {templateUrl: 'partials/pairwise-comparison.html', controller: 'PairwiseComparisonCtrl'});
      $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
      $routeProvider.otherwise({redirectTo: '/pairwise-comparison'});
      */
  });

