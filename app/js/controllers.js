'use strict';

/* Controllers */

angular.module('veWeb.controllers', ["veWeb.services"])
    .controller('PairwiseComparisonCtrl', function($scope, $routeParams, $state) {
	
    })
    .controller('PairSelectionController', function($scope) {
	
	$scope.pair = [
	    {id: 1, pdb:"PDB1", chain:""},
	    {id: 2, pdb:"PDB2", chain: ""}
	]

    })
    .controller('EpitopeSelectionCtrl', function($scope, $state) {
	$scope.options = [
	    {name: "interactive3D", tooltipMsg:"Using hand selection in interactive 3D environment"},
	    {name: "seppa", tooltipMsg:"Using Seppa Epitope prediction method"},
	    {name: "ignore", tooltipMsg: "Ignore this step, meaning we use the whole structure as the epitope"}
	];
	
    })
    .controller('EpitopeSelection.Interactive3DCtrl', function($scope, $http, $timeout) {
	
	$scope.vis = new GLmol("mol", true);
	
	$http({method: "GET", url:"pdbs/2DHB.pdb"}).success(function(data){
	    $scope.pdbSrc = data;
	    //wierd part!
	    $timeout(function(){
		$scope.$broadcast('pdbSrcLoaded');
	    },1);
	})
    })
    .controller('EpitopeSelection.SeppaCtrl', function($scope){
	
    })

