const UrlModel = require('../models/urlModel');
const PathModel = require('../models/pathModel');
const SecurityModel = require('../models/securityModel');
const DefinitionModel = require('../models/definitionModel');

/*
const addDocController = async (request, response) => {
    try {
        
        // Get API document from URL
        const url = request.body.url;
        const urlObject = new URL(url);
        const protocol = urlObject.protocol;
        const domain = urlObject.host;
        const urlPathname = urlObject.pathname;
        const urlSearch = urlObject.search;

        
        let urlPath = '';
        urlPath = urlPathname != null ? urlPath + urlPathname: urlPath;
        urlPath = urlSearch != null ? urlPath + urlSearch: urlPath;
        const urlFind = await UrlModel.findOne({protocol: protocol, domain: domain, path: urlPath }).catch(error => { throw error });
        const urlDomain = urlFind != null ? urlFind.domain : null;

        await UrlModel.deleteMany({domain: urlDomain }).catch(error => { throw error });
        await PathModel.deleteMany({domain: urlDomain }).catch(error => { throw error });
        await SecurityModel.deleteMany({domain: urlDomain }).catch(error => { throw error });
        await DefinitionModel.deleteMany({domain: urlDomain }).catch(error => { throw error });

        if (urlFind == null) throw 'URL not found';
        
        return response.json({
            success: true
        });
        
    } catch (error) {
        return response.json({
            success: false,
            error: error
        });
    }
}

module.exports = addDocController;
*/
//test

const deleteDocController = async (request, response) => {
    try {
        
        // Get API document from URL
        const urlId = request.body.urlId; //modded
        const urlTag = request.body.urlTag; //modded
        const url = request.body.url;
        const urlObject = new URL(url);
        const protocol = urlObject.protocol;
        const domain = urlObject.host;
        const urlPathname = urlObject.pathname;
        const urlSearch = urlObject.search;

        console.log(request.body);
        console.log("tagggg");
        console.log(urlTag);
        console.log("id");
        console.log(urlId);
//debug
        
        let urlPath = '';
        urlPath = urlPathname != null ? urlPath + urlPathname: urlPath;
        urlPath = urlSearch != null ? urlPath + urlSearch: urlPath;
        const urlFind = await UrlModel.findOne({tag: urlTag, protocol: protocol, domain: domain, path: urlPath, identifier: urlId }).catch(error => { throw error });
        const urlDomain = urlFind != null ? urlFind.domain : null;

        /*
        await UrlModel.deleteMany({domain: urlDomain }).catch(error => { throw error });
        await PathModel.deleteMany({domain: urlDomain }).catch(error => { throw error });
        await SecurityModel.deleteMany({domain: urlDomain }).catch(error => { throw error });
        await DefinitionModel.deleteMany({domain: urlDomain }).catch(error => { throw error });
        */

        await UrlModel.deleteMany({ identifier: urlId }).catch(error => { throw error });
        await PathModel.deleteMany({ identifier: urlId }).catch(error => { throw error });
        await SecurityModel.deleteMany({ identifier: urlId }).catch(error => { throw error });
        await DefinitionModel.deleteMany({ identifier: urlId }).catch(error => { throw error });

        if (urlFind == null) throw 'URL not found';
        
        return response.json({
            success: true
        });
        
    } catch (error) {
        return response.json({
            success: false,
            error: error
        });
    }
}

module.exports = deleteDocController;