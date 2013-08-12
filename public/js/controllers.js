'use strict';

/* Controllers */

angular.module('veWeb.controllers', ["veWeb.services"])
    .controller('PairwiseComparisonCtrl', function($scope, $routeParams, $state) {
	
    })
    .controller('PairSelectionController', function($scope, $http, pairwiseComparisonService) {
	
	$scope.pair = pairwiseComparisonService.pair;	
	$http.get('pdbs/allIds.json').success(function(data) {
	    $scope.ids = data;
	});

    })
    .controller('EpitopeSelectionCtrl', function($scope, $state) {
	$scope.options = [
	    {name: "interactive3D", tooltipMsg:"Using hand selection in interactive 3D environment"},
	    {name: "seppa", tooltipMsg:"Using Seppa Epitope prediction method"},
	    {name: "ignore", tooltipMsg: "Ignore this step, meaning we use the whole structure as the epitope"}
	];
	
    })
    .controller('EpitopeSelection.Interactive3DCtrl', function($scope, $http, $timeout, pairwiseComparisonService) {
	
	$scope.vis = new GLmol("mol", true);
	$scope.pair = pairwiseComparisonService.pair;	
	$scope.currentPdb = $scope.pair[0].pdb;
	
	$scope.$watch("currentPdb", function(pdb){
	    if(!pdb) return;	
	    $http.get("/pdb/" + pdb).success(function(data){
		$scope.pdbSrc = data;
		//wierd part!
		$timeout(function(){
		    $scope.$broadcast('pdbSrcLoaded');
		},1);
	    })
	});

    })
    .controller('EpitopeSelection.SeppaCtrl', function($scope){
	
    })

