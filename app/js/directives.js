'use strict';

/* Directives */


angular.module('veWeb.directives', []).
    directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
	    elm.text(version);
	};
    }])
    .directive('pdbViewer', function factory() {
	return function postLink(scope, iElement, iAttrs) { 
	    scope.$on("pdbSrcLoaded", function(){
		scope.vis.loadMolecule();
	    })
	}
    });
