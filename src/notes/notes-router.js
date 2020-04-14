const express = require('express')
const path = require('path')
const NotesService = require('./notes-service')
const xss= require('xss')

//const {requireAuth} = require('../middleware/jwt-auth')
const notesRouter = express.Router()
const jsonParser = express.json()


notesRouter

.route('/')

.get((req,res,next)=>{
    const knexInstance= req.app.get('db')
    NotesService.getAllNotes()
    .then(notes=>{
        res.json(notes.map(serializeNote))
    })
    .catch(next)
})

.post(jsonParser,(req,res,next)=>{
    const{} = req.body
    const knexInstance = req.app.get('db')
    
    NotesService.insertNote
})