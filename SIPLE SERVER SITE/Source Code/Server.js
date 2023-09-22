const fs = require('fs');
const http = require('http');
const url = require('url');


const replesetemp = require('./modul/replesetemp.js');

let card = fs.readFileSync("tepletes/temp-card.html", "utf-8");                                                                                                                                                                                                                                                                                             
let home = fs.readFileSync("tepletes/home.html", "utf-8");
let Pdata = fs.readFileSync("Prodect-data.json", "utf-8");
let PdataObj = JSON.parse(Pdata);




const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    if (pathname === "/") {
        let qlower = query.type
        if (qlower != null) {

            qlower = qlower.trim().toLocaleLowerCase();

            let fdata = PdataObj.filter(ele => (ele.Type.toLocaleLowerCase()) == qlower);
            let output = fdata.map(ele => replesetemp(ele, card)).join("");
            let ooop = home.replace("{{{card}}}", output);

            console.log("sending responce to ",qlower);
            res.setHeader('Content-Type', 'text/html');
            res.end(ooop);
        }
        else {
            let output = PdataObj.map(ele => replesetemp(ele, card)).join("")
            let ooop = home.replace("{{{card}}}", output)
            res.setHeader('Content-Type', 'text/html');
            console.log("sending responce");
            res.end(ooop);
        }
    }
    else {
        res.end("page note fund")
    }

})

server.listen("2000", "localhost"); 
