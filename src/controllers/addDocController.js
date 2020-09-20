const addDocService = require('../services/addDocService');

const addDocController = async (request, response) => {
    try {

        const url = request.body.url;
        const uname = request.body.uname;
        const pword = request.body.pword;
        const urltag = request.body.tag;
        if(urltag == '') throw 'no tag';
        await addDocService(url,uname,pword,urltag).catch(error => { throw error });
        return response.json({
            success: true
        });

    } catch (error) {
        console.log("fail");
        return response.json({
            success: false,
            error: error,
            url: process.env.MONGODB_URI
        });
    }
}

module.exports = addDocController;