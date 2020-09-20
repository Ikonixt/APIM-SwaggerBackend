const UrlModel = require('../models/urlModel');
const PathModel = require('../models/pathModel');
const SecurityModel = require('../models/securityModel');
const DefinitionModel = require('../models/definitionModel');

const getDocController = async (request, response) => {
    try {
        const swaggerInfo = {
            title: "Swagger UI"
        }
        let paths = {};
        let security = {};
        let definition = {};
        const urlFind = await UrlModel.find().catch(error => { throw error });
        let query = [];
        urlFind.forEach(urlEach => {
            if (urlEach.visable) {
                query.push({identifier: urlEach.identifier});
            }
        });
        
        if (query.length > 0) {
            const pathFind = await PathModel.find({$or: query}).catch(error => { throw error });
            const securityFind = await SecurityModel.find({$or: query}).catch(error => { throw error });
            const definitionFind = await DefinitionModel.find({$or: query}).catch(error => { throw error });
            
            pathFind.forEach(pathEach => {
                if (paths[pathEach.path] == null) {
                    paths[pathEach.path] = {};
                }
                paths[pathEach.path][pathEach.method] = pathEach.property;
            });
    
            securityFind.forEach(securityEach => {
                security[securityEach.auth] = {};
                security[securityEach.auth] = securityEach.property;
            });
            definitionFind.forEach(definitionEach => {
                definition[definitionEach.definition] = {};
                definition[definitionEach.definition] = definitionEach.property;
            });
        }

        const apiDoc = {
            info: swaggerInfo,
            swagger: '2.0',
            paths: paths,
            securityDefinitions: security,
            definitions: definition
        }

        return response.json(apiDoc);

    } catch (error) {
        return response.json({
            success: false,
            error: error
        });
    }
}

module.exports = getDocController;