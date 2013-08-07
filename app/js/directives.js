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
    })
    .controller("jqSliderCtrl", function($scope){
	$scope.threshold = 0;
    })
    .directive("jqSlider", function($parse){
	return {
	    restrict: "E",
	    replace: true,
	    transclude: false,
	    compile: function (element, attrs) {
		var modelAccessor = $parse(attrs.ngModel);

		var html = '<div class="span3" style=""></div><span class="help-inline">{{threshold}}</span>'
		

		var newElem = $(html);
		element.replaceWith(newElem);

		return function (scope, element, attrs, controller) {
		    element.slider({
			slide: function(event, ui){
			    if(!scope.$$phase){
				scope.$apply(function (scope) {
				    modelAccessor.assign(scope, ui.value);
				    console.log(scope.threshold);
				});
			    }
			}
		    });
		    

		    scope.$watch(modelAccessor, function (val) {
			element.slider({"value": val});
		    });

		};

	    }
	};
    });
