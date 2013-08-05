'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('veWeb.services', [])
    .value('version', '0.1')
    .factory("PDBChainOnChangeService", function($rootScope){
	var sharedService = {};
	
	sharedService.sender_tokens = [1,2];
	sharedService.receiver_tokens = [1,2];
	
	sharedService.give_sender_token = function(){
	    return this.sender_tokens.shift()
	}

	sharedService.give_receiver_token = function(){
	    return this.receiver_tokens.shift()
	}

	sharedService.pdb = "";
	sharedService.chain = "";
	
	sharedService.pdbchainChange = function(selection_id, pdb, chain){
	    this.pdb = pdb;
	    this.chain = chain;
	    this.selection_id = selection_id;
	    $rootScope.$broadcast("pdbchainChange");
	}
	return sharedService;
    })
