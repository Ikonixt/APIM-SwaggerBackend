const router = require('express').Router();

const addDocController = require('./addDocController');
router.post('/addhost', (request, response) => addDocController(request, response));

const deleteDocController = require('./deleteDocController');
router.delete('/deletedoc', (request, response) => deleteDocController(request, response));

const getDocController = require('./getDocController');
router.get('/getdoc/', (request, response) => getDocController(request, response));

const getUrlController = require('./getUrlController');
router.get('/geturl/', (request, response) => getUrlController(request, response));

const fetchDocController = require('./fetchDocController');
router.get('/fetchdoc/', (request, response) => fetchDocController(request, response));

const getPathController = require('./getPathController');
router.get('/getpaths/:domain', (request, response) => getPathController(request, response));

const updateTagController = require('./updateTagController');
router.post('/updatetag', (request, response) => updateTagController(request, response));

const updateVisable = require('./updateVisable');
router.post('/updatevisable', (request, response) => updateVisable(request, response));

const healthChkController = require('./healthChkController');
router.get('/health/', (request, response) => healthChkController(request, response));

const deleteDbController = require('./deleteDbController');
router.get('/deletedb/', (request, response) => deleteDbController(request, response));

module.exports = router;

/*
          livenessProbe:
            httpGet:
              path: /SwaggerAPI/_swagger/health
              port: 8080
            initialDelaySeconds: 5
            failureThreshold: 2
            periodSeconds: 5

          readinessProbe:
            httpGet:
              path: /SwaggerAPI/actuator/health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /SwaggerAPI/actuator/health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
*/