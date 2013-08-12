'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('veWeb.services', ['ngResource'])
    .value('version', '0.1')
    .factory("PDBIds", function($resource){
	return $resource("pdbs/allIds.json", {}, {
	    query: {method: "GET", isArray: true}
	})
    })
    .factory("pairwiseComparisonService", function(){
	return {
	    pair: [{id: 1, pdb: "102L", chain: ""}, {id: 2, pdb: "126D", chain: ""}],
	    epitope: {},
	    cylinder: {},
	    sphere: {},
	    aaindex: {}
	}
    })
