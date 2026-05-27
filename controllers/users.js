const { ObjectId } = require('mongodb');
const mongodb = require('../database/data');
const { response } = require('express');

const getAll = async(req, res) => {
    //#swagger.tags = ['Users']
    try{
        const result = await mongodb.getDb().db('book_info').collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const getOne = async(req, res) => {
    //#swagger.tags = ['Users']
    try{
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('book_info').collection('users').find({_id: userId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(result[0]); 
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    const response = await mongodb.getDb().db('book_info').collection('users').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid user id to find a user.');
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    const response = await mongodb.getDb().db('book_info').collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the book.');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid user id to delete a user.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('book_info').collection('users').deleteOne({_id: userId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the user.');
    }
};

module.exports = {getAll, getOne, createUser, updateUser, deleteUser};