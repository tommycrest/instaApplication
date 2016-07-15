var request = require('request');
var Instagram = require("instagram-node-lib");
var fs = require('fs');
var JSONStream = require('JSONStream');
var es = require('event-stream');

exports.InstagramGetFeed = function(tag, takeAmount){
    var client_uid = "7e23aceafdf6483db1ba47784fe9db69";
    var options = {
        host: "https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id="+client_uid,
        method: 'GET'
    };

    this.query = function(callback){
        function extractorJson(body){
            var parser = xml2js.Parser();
            
            var obj = JSON.parse(body);
            fs.writeFile(tag,body,'utf8',function (err){})
        }

        request(options.host, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                extractorJson(body);
            } else {
                console.log(error);
                console.log(response);
                
            }
        });
    };
    
    this.feed = function(callback) {
        function extractorData(data) { 
            return data;
        };
        request(options.host).pipe(JSONStream.parse('data.*.images.standard_resolution')).pipe(es.mapSync(function (data) {
            extractorData(data);
        }));
    };
};