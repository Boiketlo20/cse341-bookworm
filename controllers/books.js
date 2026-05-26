const { ObjectId } = require('mongodb');
const mongodb = require('../database/data');
const { response } = require('express');

const getAll = async(req, res) => {
    try{
        const result = await mongodb.getDb().db('book_info').collection('books').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const getOne = async(req, res) => {
    try{
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('book_info').collection('books').find({_id: bookId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(result[0]); 
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

module.exports = {getAll, getOne};