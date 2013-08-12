var PDB = require('./models/pdb')
   , http = require('http')
   , format = require("util").format;


exports.pdb = {
    get: function(req, res){
	var pdb_id =  req.params.pdb_id;
	http.get(
	    format("http://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=pdb&compression=NO&structureId=%s", pdb_id),
	    function(serverRes){

		PDB.findOne({name: pdb_id}, function(err, pdb){
		    if(err){
			res.status(500).send("Server Error!");
			console.log(err);
		    }

		    if(pdb){//found
			console.log("found");
			res.send(pdb["src"]);
		    }
		    else{//not found, crawl
			console.log("not found, crawl");
			
			var output = "";
			
			if(serverRes.statusCode == 404)
			    res.status(404).send("No such PDB, buddy!");
			else{
			    serverRes.on('data', function (chunk) {
				output += chunk;
			    });

			    serverRes.on('end', function() {
				new PDB({name: pdb_id, src: output}).save();
				res.send(output);
			    });
			}

		    }
		});
		
	    }).on('error', function(e) {
		res.send("Got error: " + e.message);
	    });

    },
    list: function(req, res){
	res.send("all ids");
    }
}
