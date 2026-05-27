const { ObjectId } = require('mongodb');
const mongodb = require('../database/data');
const { response } = require('express');

const getAll = async(req, res) => {
    //#swagger.tags = ['Books']
    try{
        const result = await mongodb.getDb().db('book_info').collection('books').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const getOne = async(req, res) => {
    //#swagger.tags = ['Books']
    try{
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('book_info').collection('books').find({_id: bookId }).toArray();
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(result[0]); 
    } catch(err) {
        res.status(500).json({message: err});
    }   
};

const uploadBook = async (req, res) => {
    //#swagger.tags = ['Books']
    const book = {
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating,
        genres: req.body.genres,
        publication_date : req.body.publication_date,
        image_url : req.body.image_url
    };
    const response = await mongodb.getDb().db('book_info').collection('books').insertOne(book);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the book.');
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags = ['Books']
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid book id to find a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const book = {
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating,
        genres: req.body.genres,
        publication_date : req.body.publication_date,
        image_url : req.body.image_url
    };
    const response = await mongodb.getDb().db('book_info').collection('books').replaceOne({_id: bookId}, book);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the book.');
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags = ['Books']
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid book id to find a book.');
    }
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('book_info').collection('books').deleteOne({_id: bookId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the book.');
    }
};

module.exports = {getAll, getOne, uploadBook, updateBook, deleteBook};