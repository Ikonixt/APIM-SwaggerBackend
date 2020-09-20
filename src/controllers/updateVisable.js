const UrlModel = require('../models/urlModel');

const updateVisable = async (request, response) => {
    try {

        const urlObject = await new URL(request.body.url);
        const domain = urlObject.host;
        const urlTag = request.body.urlTag;
        console.log(urlTag);
        const urlId = request.body.urlId;
        console.log("ID");
        console.log(urlId);
        console.log(typeof urlId);

       

       //here
       const urlFind = await UrlModel.find({identifier: urlId}).catch(error => { throw error });
       for (let index = 0; index < urlFind.length; index++) {
           const updatedUrl = {
           protocol: urlFind[index].protocol,
           domain: urlFind[index].domain,
           path: urlFind[index].path,
           tag: urlFind[index].tag,
           visable: !urlFind[index].visable,
           identifier: urlFind[index].identifier
           }
           await UrlModel.findOneAndUpdate({_id: urlFind[index]._id}, updatedUrl, {upsert: true}).catch(error => { throw error });
       }
       
       /*
        const urlFind = await UrlModel.findOne({tag: urlTag}).catch(error => { throw error })
        const updatedUrl = {
            protocol: urlFind.protocol,
            domain: urlFind.domain,
            path: urlFind.path,
            tag: urlFind.tag,
            visable: !urlFind.visable
        }
        
        await UrlModel.findOneAndUpdate({_id: urlFind._id}, updatedUrl, {upsert: true}).catch(error => { throw error });
        */

        return response.json({
            success: true
        });

    } catch (error) {
        return response.json({
            success: false,
            error: error
        })
    }
}
//
module.exports = updateVisable;