'use strict';

/* Controllers */

angular.module('veWeb.controllers', ["veWeb.services"])
    .config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/pairwise-comparison/select-pairs', {templateUrl: 'partials/select-pairs.html', controller: 'PairwiseComparisonCtrl'});
	$routeProvider.otherwise({redirectTo: '/pairwise-comparison'});
    }])
    .controller('PairwiseComparisonCtrl', function($scope, $routeParams, $state) {
	
    })
    .controller("PDBChainTitleCtrl", function($scope, PDBChainOnChangeService){
	$scope.pdb = "PDB id";
	$scope.chain = "";
	$scope.selection_id = PDBChainOnChangeService.give_receiver_token();

	$scope.$on("pdbchainChange", function(){
	    if($scope.selection_id == PDBChainOnChangeService.selection_id){
		console.log($scope.selection_id, " will do it", PDBChainOnChangeService.pdb);
		$scope.pdb = PDBChainOnChangeService.pdb;
		$scope.chain = PDBChainOnChangeService.chain;
	    }
	})
    })
    .controller('PDBChainSelectionCtrl', function($scope, PDBChainOnChangeService) {

	$scope.selection_id = PDBChainOnChangeService.give_sender_token();

	$scope.pdb = "";
	$scope.chain = "";

	$scope.change = function(){
	    PDBChainOnChangeService.pdbchainChange($scope.selection_id, $scope.pdb, $scope.chain);
	}

    })
    .controller('EpitopeSelectionCtrl', function($scope) {
	$scope.pageUrl = "partials/interactive3D-epitope-selection.html";
    });
