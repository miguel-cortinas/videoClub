const express = require('express');
const Director = require('../models/director');

function list(req, res, next) {
    Director.find().then(objs => res.status(200).json({
        message: "Lista de directores",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "no se pudo consultar la informacion",
        obj:ex
    }));
}

function index(req, res, next) {
    const id = req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Director con id ${id}`,
    })).catch(ex => res.status(500).json({
        message: "no se pudo consultar la informacion",
        obj:ex
    }));
}

function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;

    let director = new Director({
        name:name, lastName:lastName
    });

    director.save().then(obj => res.status(200).json({
        message:"Director creado correctamente.",
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "Director no se pudo crear.",
        ex:ex
    }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let Director = new Object({
        _name: name,
        _lastName: lastName
    });

    Director.findOneAndUpdate({"_id":id}, director, {new : true})
            .then(obj => res.status(200).json({
                message: "Director actualizado correctamente",
                obj:obj
            })).catch(ex => res.status(500).json({
                message: "Director no se pudo crear.",
                ex:ex
            }));

}

function update(req, res, next) {
    res.send(`respond with a update director = ${req.params.id}`);
}

function destroy(req, res, next) {
    const id = req.param.id;
    director.remove({"_id":id}).then(obj => res.status(200).json({
        message: "Director eliminado", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message: "Director no se pudo crear.",
        ex:ex
    }));
}


module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy
};