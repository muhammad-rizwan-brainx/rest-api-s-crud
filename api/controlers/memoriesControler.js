const mongoose = require("mongoose");
const Memory = require("../models/memoryModel");

exports.mem_get_all = (re, res, next) => {
    Memory.find().select('name _id memImage').exec()
        .then(docs => {
            const response = {
                count: docs.length,
                mems: docs.map(doc => {
                    return {
                        name: doc.name,
                        memImage : doc.memImage,
                        quantity: doc.quantity,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/memories/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.create_mem = (req, res, next) => {
    // console.log(req.file.path);
    const detailsMem = new Memory({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        memImage : req.file.path
    });
    console.log(detailsMem)
    detailsMem.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Memory Added",
            Memory: {
                name: result.name,
                id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/memories/' + result._id
                }
            }
        });
    }).catch(err => console.log(err));

}


exports.get_mem =  (req, res, next) => {
    const id = req.params.memID;
    Memory.findById(id).select('name  _id productImage').exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}


exports.update_mem = (req, res, next) => {
    const id = req.params.memID;
    const payload = req.body;
    Memory.updateOne({ id: id }, { $set: payload })
    .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}


exports.mem_delete = (req, res, next) => {
    const id = req.params.memId;
    Memory.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Memory deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/memories",
            body: { name: "String"}
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };