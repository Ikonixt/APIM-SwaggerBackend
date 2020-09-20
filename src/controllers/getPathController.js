const PathModel = require('../models/pathModel');

//

const getPathController = async (request, response) => {

    try {
        
        console.log("getting path");
        console.log(request.params);
        const domain = parseInt(request.params.domain);
        console.log(domain);
        const paths = await PathModel.find({identifier: domain}, {_id: 0, path: 1, method: 1}).catch(error => { throw error });
        let pathsMap = [];
        paths.forEach(pathsEach => {
            const pathFilter = pathsMap.filter(pathsMapEach => {
                return pathsMapEach.path == pathsEach.path;
            })
            if (pathFilter.length == 0) {
                let newPathMap = {
                    path: pathsEach.path,
                    method: []
                }
                const newPathFilter = paths.filter(pathFilterEach => {
                    return pathFilterEach.path == pathsEach.path;
                });
                newPathFilter.forEach(newPathFilterEach => {
                    newPathMap.method.push(newPathFilterEach.method);
                });
                pathsMap.push(newPathMap);
            }
        });

        return response.json({
            success: true,
            paths: pathsMap
        });

    } catch (error) {
        return response.json({
            success: false,
            error: error
        })
    }

}

module.exports = getPathController;