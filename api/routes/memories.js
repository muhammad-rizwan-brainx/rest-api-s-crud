const express = require('express');
const multer = require('multer');

const checkAuth = require('../midleware/checkAuth');
const memoryControler = require('../controlers/memoriesControler');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
      cb(null, './uploads/');
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({ storage : storage, limits : {
    fileSize : 1024*1024*5
}, fileFilter : fileFilter });

const Router = express.Router()

//----------------creating requests-------------------------//

Router.post('/', checkAuth, upload.single('memImage'), memoryControler.create_mem);

Router.get('/', memoryControler.mem_get_all);

Router.get('/:memID', memoryControler.get_mem);

Router.patch('/:memID', checkAuth, memoryControler.update_mem);

Router.delete('/:memID', checkAuth, memoryControler.mem_delete);

module.exports = Router;



