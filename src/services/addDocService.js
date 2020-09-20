const fetch = require('node-fetch');
const UrlModel = require('../models/urlModel');
const PathModel = require('../models/pathModel');
const SecurityModel = require('../models/securityModel');
const DefinitionModel = require('../models/definitionModel');

const addDocService = async (url,uname,pword,urltag) => {

    //fails without protocol
    const urlObject = await new URL(url);
    console.log("     urlobject");
    console.log(urlObject);
    const protocol = urlObject.protocol;
    const domain = urlObject.host;
    const urlPathname = urlObject.pathname;
    const urlSearch = urlObject.search;
    const tagg = urltag;
    let urlPath = '';
    urlPath = urlPathname != null ? urlPath + urlPathname: urlPath;
    urlPath = urlSearch != null ? urlPath + urlSearch: urlPath;
    console.log("     url tag");
    console.log(tagg);
    var found = true;

    var obj;  
    var fetch_response;
    //Basic Auth
    if(uname==''&&pword==''){
         fetch_response = await fetch(url).catch(() => { throw true });
    }
    else{
        let data = uname+':'+pword;
        let buff = new Buffer(data);
        let base64data = buff.toString('base64');
        const headers = {
            "Authorization": "Basic " + base64data,
            "Access-Control-Allow-Origin":"*"
          }
    
         fetch_response = await fetch(url, {credentials: 'include', headers: headers, mode:'cors'}).catch(() => { throw true });
    }

    let apiDocURL = await fetch_response.json().catch(error => { throw error });


    const urlFind = await UrlModel.findOne({ protocol: protocol, domain: domain, path: urlPath }).catch(error => { throw error });

    var random = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1) + 1);
    if(urlFind != null){
        await UrlModel.deleteMany({ identifier: urlFind.identifier }).catch(error => { throw error });
        await PathModel.deleteMany({ identifier: urlFind.identifier }).catch(error => { throw error });
        await SecurityModel.deleteMany({ identifier: urlFind.identifier }).catch(error => { throw error });
        await DefinitionModel.deleteMany({ identifier: urlFind.identifier }).catch(error => { throw error });
    }

    //if (urlFind == null) {
        const urlModel = new UrlModel({
            protocol: protocol,
            domain: domain,
            path: urlPath,
            tag: tagg,
            visable: true,
            identifier: random
        });
        await urlModel.save().catch(error => { throw error });
    //}
    const tag = urlFind == null ? domain: urlFind.tag;

    let paths = [];
    const basePath = apiDocURL.basePath == '/' ? '' : apiDocURL.basePath;
    //await PathModel.deleteMany({ tag: tagg }).catch(error => { throw error });
    for (pathEach in apiDocURL.paths) {
        for (methodEach in apiDocURL.paths[pathEach]) {
            apiDocURL.paths[pathEach][methodEach].tags = [tagg];

            paths.push({
                tag: tagg,
                domain: domain,
                path: basePath + pathEach,
                method: methodEach,
                property: apiDocURL.paths[pathEach][methodEach],
                identifier: random
            });
        }
    }
    PathModel.insertMany(paths).catch(error => { throw error });

    let security = [];
    //await SecurityModel.deleteMany({ tag: tagg }).catch(error => { throw error });
    for (securityEach in apiDocURL.securityDefinitions) {
        security.push({
            tag: tagg,
            domain: domain,
            auth: securityEach,
            property: apiDocURL.securityDefinitions[securityEach],
            identifier: random
        });
    }
    await SecurityModel.insertMany(security).catch(error => { throw error });

    let definition = [];
    //await DefinitionModel.deleteMany({ tag: tagg }).catch(error => { throw error });
    for (definitionEach in apiDocURL.definitions) {
        definition.push({
            tag: tagg,
            domain: domain,
            definition: definitionEach,
            property: apiDocURL.definitions[definitionEach],
            identifier: random
        });
    }
    await DefinitionModel.insertMany(definition).catch(error => { throw error });
    
    return {
        success: true
    };
}

module.exports = addDocService;