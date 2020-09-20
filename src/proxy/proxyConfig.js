const { createProxyMiddleware } = require('http-proxy-middleware');
const PathModel = require('../models/pathModel');
const UrlModel = require('../models/urlModel');
require('dotenv').config();

const options = {
    target: process.env.DOMAIN,
    changeOrigin: true,
    router: async (request) => {
        try {
            const path = request._parsedUrl.pathname;
            const method = request.method.toLowerCase();
            let pathFind = await PathModel.findOne({ path: path, method: method }).catch(error => { throw error });
            let domain;
            if (pathFind != null) {
                domain = pathFind.domain;
            }
            else {
                const pathSplit = path.split('/');
                pathFind = await PathModel.find().catch(error => { throw error });
                pathFind.forEach(pathFindEach => {
                    let check = true;
                    if (method == pathFindEach.method) {
                        let index;
                        const pathFindEachSplit = pathFindEach.path.split('/');
                        for (index = 0; index < pathFindEachSplit.length; index++) {
                            if (pathFindEachSplit[index] != pathSplit[index] && !(pathFindEachSplit[index].startsWith('{') && pathFindEachSplit[index].endsWith('}'))) {
                                check = false;
                                break;
                            }
                        }
                        if (check) {
                            index--;
                            domain = pathFindEach.domain;
                        }
                    }
                });
            }
            
            const urlFind = await UrlModel.findOne({ domain: domain });
            if (urlFind == null) throw 'Url not found';  
            return urlFind.protocol + '//' + urlFind.domain;
        } catch (error) {
            return process.env.DOMAIN;
        }
    }
}

module.exports = createProxyMiddleware(options);