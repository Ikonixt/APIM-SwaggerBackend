const UrlModel = require('../models/urlModel');

//unchanged
const getUrlController = async (request, response) => {
    try {
        
        let urlResult = [];
        const urlFind = await UrlModel.find().catch(error => {throw error});
        urlFind.forEach(urlFindEach => {
            urlResult.push({url: urlFindEach.protocol + '//' + urlFindEach.domain + urlFindEach.path, tag: urlFindEach.tag, visable: urlFindEach.visable, identifier: urlFindEach.identifier});
        });

        return response.json({
            success: true,
            urls: urlResult
        });

    } catch (error) {
        return response.json({
            success: false,
            error: error
        });
    }
}

module.exports = getUrlController;