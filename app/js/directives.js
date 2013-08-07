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
	$scope.threshold = 5;
    })
    .directive("jqSlider", function($parse){
	return {
	    restrict: "E",
	    replace: true,
	    transclude: false,
	    compile: function (element, attrs) {
		var modelAccessor = $parse(attrs.ngModel),
		min = attrs.min ? parseFloat(attrs.min) : 0, 
		max = attrs.max ? parseFloat(attrs.max) : 10,
		step = attrs.step ? parseFloat(attrs.step) : 0.1,
		defaultVal = attrs.defaultVal ? parseFloat(attrs.defaultVal) : 4;
		
		var html = '<div class="span3 slider" ></div><span class="help-inline">{{threshold}}</span>'
		
		var newElem = $(html);
		element.replaceWith(newElem);

		return function (scope, element, attrs, controller) {
		    element.slider({
			min: min, 
			max: max,
			step: step,
			slide: function(event, ui){
			    if(!scope.$$phase){
				scope.$apply(function (scope) {
				    modelAccessor.assign(scope, ui.value);
				});
			    }
			}
		    });

		    scope.threshold = defaultVal;
		    
		    scope.$watch(modelAccessor, function (val) {
			element.slider({"value": val});
		    });

		};

	    }
	};
    });
