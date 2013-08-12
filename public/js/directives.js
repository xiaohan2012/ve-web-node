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
	    restrict: "EA",
	    replace: true,
	    transclude: false,	   	    
	    compile: function (element, attrs) {
		
		var html = "<div class='row' style='margin-top:10px;'>" +
		    "<div class='span3 slider' ></div><span class='help-inline'>{{" + attrs.ngModel + "}} </span>"
		    +"</div>";
		
		var newElem = $(html);
		element.replaceWith(newElem);

		return function (scope, element, attrs, controller) {
		    var modelAccessor = $parse(attrs.ngModel),
		    minVal = attrs.minVal ? scope.$eval(attrs.minVal) : 0, 
		    maxVal = attrs.maxVal ? scope.$eval(attrs.maxVal) : 10,
		    step = attrs.step ? scope.$eval(attrs.step) : 0.1,
		    defaultVal = attrs.defaultVal ? scope.$eval(attrs.defaultVal) : 4;
		    
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
		    modelAccessor.assign(scope, defaultVal);
		    
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
	    templateUrl: "partials/cylinder-config.widget.html",
	    controller: function($scope, pairwiseComparisonService){
		$scope.init = function(){
		    $scope.cfg = {
			radius: 10,
			radiusStep: 1,
			height: 40,
			heightStep: 5
		    };
		    
		    //bind the cylinder config to service 
		    pairwiseComparisonService.cylinder = $scope.cfg;
		    
		    $scope.fieldsSetting = {
			radius : { min: 0, max: 50, step: 5},
			radiusStep: {min: 1, max:10, step: 2},
			height: {min: 0, max: 100, step: 5},
			heightStep: { min: 0, max: 10, step: 2}
		    };
		}
		
		$scope.init();
		
	    }
	}
    })
    .directive("sphereConfig", function(){
	return {
	    restrict: "E",
	    replace: true,
	    transclude: false,
	    templateUrl: "partials/sphere-config.widget.html",
	    controller: function($scope, pairwiseComparisonService){
		$scope.init = function(){
		    $scope.cfg = {
			radius: 10,
			radiusStep: 1
		    };
		    
		    pairwiseComparisonService.sphere = $scope.cfg;
		    
		    $scope.fieldsSetting = {
			radius : { min: 0, max: 50, step: 5},
			radiusStep: {min: 1, max:10, step: 2},
		    };
		}		
		$scope.init();		
	    }
	}
    })
