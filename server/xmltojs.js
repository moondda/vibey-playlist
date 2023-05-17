const request=require('request');

let parseString = require('xml2js').parseString;
let xml = "<root>Hello xml2js!</root>"

// console.dir("변경하기 전: " + xml);
// parseString(xml,function(err,result){
//     console.dir("변경 후: " +result.root);
// });

request('https://www.maniadb.com/api/search/[?]/?sr=song&display=10&key=dahyun723@ajou.ac.kr&v=0.5', function(err,res,body) {
    parseString(body,function(err,result){
        let parsedData = result;
        console.log(JSON.stringify(parsedData));

    })
})