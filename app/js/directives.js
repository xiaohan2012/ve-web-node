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
    .directive("jqSlider", function($parse){
	return {
	    restrict: "E",
	    replace: true,
	    transclude: false,
	    controller: function($scope){
		
	    },
	    compile: function (element, attrs) {
		var modelAccessor = $parse(attrs.ngModel),
		minVal = attrs.minVal ? parseFloat(attrs.minVal) : 0, 
		maxVal = attrs.maxVal ? parseFloat(attrs.maxVal) : 10,
		step = attrs.step ? parseFloat(attrs.step) : 0.1,
		defaultVal = attrs.defaultVal ? parseFloat(attrs.defaultVal) : 4;
		
		var html = "<div class='row'>" +
		    "<div class='span3 slider' ></div><span class='help-inline'>{{" + attrs.ngModel + "}}</span>"
		    +"</div>";
		
		var newElem = $(html);
		element.replaceWith(newElem);

		return function (scope, element, attrs, controller) {
		    element = element.find(".slider");

		    element.slider({
			min: minVal, 
			max: maxVal,
			step: step,
			slide: function(event, ui){
			    if(!scope.$$phase){
				scope.$apply(function (scope) {
				    modelAccessor.assign(scope, ui.value);
				});
			    }
			}
		    });

		    modelAccessor.assign(scope, defaultVal)
		    
		    scope.$watch(modelAccessor, function (val) {
			element.slider({"value": val});
		    });
		};
	    }
	};
    })
    .directive("cylinderConfig", function($compile){
	return {
	    restrict: "E",
	    replace: true,
	    transclude: false,
	    templateUrl: "partials/cylinder-config-widget.html",
	    compile: function (element, attrs) {
		return function (scope, element, attrs, controller) {
		    
		}
	    }
	}
    })
