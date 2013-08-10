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
	
	$http.jsonp("http://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=pdb&compression=NO&structureId=" + pairwiseComparisonService.pair[0].pdb).success(function(data){
	    $scope.pdbSrc = data;
	    //wierd part!
	    $timeout(function(){
		$scope.$broadcast('pdbSrcLoaded');
	    },1);
	})
	/*
	$http({method: "GET", 
	       url:"http://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=pdb&compression=NO&structureId=" + pairwiseComparisonService.pair[0].pdb + ".pdb"}).success(function(data){
	    $scope.pdbSrc = data;
	    //wierd part!
	    $timeout(function(){
		$scope.$broadcast('pdbSrcLoaded');
	    },1);
	})
	*/
    })
    .controller('EpitopeSelection.SeppaCtrl', function($scope){
	
    })

