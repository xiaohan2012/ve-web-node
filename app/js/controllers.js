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
	
	/*
	$scope.vis.defineRepresentation = function() {
	    var all = this.getAllAtoms();
	    var hetatm = this.removeSolvents(this.getHetatms(all));
	    this.colorByAtom(all, {});
	    this.colorByChain(all);
	    var asu = new THREE.Object3D();
	    
	    this.drawBondsAsStick(asu, hetatm, this.cylinderRadius, this.cylinderRadius);
	    this.drawBondsAsStick(asu, this.getResiduesById(this.getSidechains(this.getChain(all, ['A'])), [58, 87]), this.cylinderRadius, this.cylinderRadius);
	    this.drawBondsAsStick(asu, this.getResiduesById(this.getSidechains(this.getChain(all, ['B'])), [63, 92]), this.cylinderRadius, this.cylinderRadius);
	    this.drawCartoon(asu, all, this.curveWidth, this.thickness);

	    this.drawSymmetryMates2(this.modelGroup, asu, this.protein.biomtMatrices);
	    this.modelGroup.add(asu);
	};
	*/

	$http({method: "GET", url:"pdbs/2DHB.pdb"}).success(function(data){
	    $scope.pdbSrc = data;
	    //wierd part!
	    $timeout(function(){
		$scope.$broadcast('pdbSrcLoaded');
	    },1);
	})
    });

