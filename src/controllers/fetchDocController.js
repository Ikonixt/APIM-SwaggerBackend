const UrlModel = require('../models/urlModel');
const addDocService = require('../services/addDocService');
//unchanged
const fetchDocController = async (request, response) => {
    try {
        const urlFind = await UrlModel.find().catch(error => { throw error });
        for (let index = 0; index < urlFind.length; index++) {
            let url = urlFind[index].protocol + '//' + urlFind[index].domain + urlFind[index].path
            await addDocService(url).catch(error => {
                if (!error) {
                    throw error;
                }
            });
        }

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

module.exports = fetchDocController;