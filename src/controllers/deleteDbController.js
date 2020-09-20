const UrlModel = require('../models/urlModel');
const PathModel = require('../models/pathModel');
const SecurityModel = require('../models/securityModel');
const DefinitionModel = require('../models/definitionModel');

const deleteDbController = async (request, response) => {
    const stuff  = await UrlModel.find().catch(error => { throw error });
    console.log(stuff);
    await DefinitionModel.deleteMany({}).catch(error => { throw error });
    await UrlModel.deleteMany({}).catch(error => { throw error });
    await PathModel.deleteMany({}).catch(error => { throw error });
    await SecurityModel.deleteMany({}).catch(error => { throw error });
    return response.send("Deleted");
}
//unchanged
module.exports = deleteDbController;