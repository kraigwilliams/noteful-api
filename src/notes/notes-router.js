const express = require('express')
const path = require('path')
const NotesService = require('./notes-service')
const xss= require('xss')

//const {requireAuth} = require('../middleware/jwt-auth')
const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNote= note => ({
    content:xss(note.content),
    id:note.id,
    modified:note.modified,
    folderId:note.folderId,
    name:xss(note.name)
})

notesRouter

.route('/')

.get((req,res,next)=>{
    const knexInstance= req.app.get('db')
    NotesService.getAllNotes(knexInstance)
    .then(notes=>{
        res.json(notes.map(serializeNote))
    })
    .catch(next)
})

.post(jsonParser,(req,res,next)=>{
    const{name,content,folderId} = req.body
    console.log(folderId, 'folder ID')
    const knexInstance = req.app.get('db')
    const newNote= {name,content,folderId}
    NotesService.addNote(knexInstance,newNote)
    .then(note => {
        res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${note.id}`))
        .json(serializeNote(note));
    })
    .catch(next)
})


notesRouter
  .route("/:noteId")
  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");

    NotesService.deleteNote(knexInstance, req.params.noteId)
      .then(() => {
        res.status(204).end();
      })

      .catch(next);
  });
module.exports= notesRouter