const PathModel = require('../models/pathModel');
const UrlModel = require('../models/urlModel');

//fix this
const updateTagController = async (request, response) => {
    try {

        const urlId = request.body.id;
        const domain = request.body.domain;
        const tag = request.body.tag;
        console.log("updatetag: tag");
        console.log(tag);
        const urlFind = await UrlModel.findOne({identifier: urlId}).catch(error => { throw error });
        const updatedUrl = {
            protocol: urlFind.protocol,
            domain: urlFind.domain,
            path: urlFind.path,
            tag: tag,
            visable: urlFind.visable,
            identifier: urlFind.identifier
        };
        await UrlModel.findOneAndUpdate({_id: urlFind._id}, updatedUrl, {upsert: true}).catch(error => { throw error })
        const paths = await PathModel.find({identifier: urlId}).catch(error => { throw error });
        await PathModel.deleteMany({identifier: urlId}).catch(error => { throw error });
        let newPaths = [];
        paths.forEach(pathsEach => {
            pathsEach.property.tags = [tag];
            newPaths.push(pathsEach);
        });
        await PathModel.insertMany(newPaths).catch(error => { throw error });
        
        return response.json({
            success: true
        })

    } catch (error) {
        return response.json({
            success: false,
            error: error
        });
    }
}

module.exports = updateTagController;