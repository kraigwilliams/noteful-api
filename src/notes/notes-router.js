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
    folder_id:note.folder_id,
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
    const{name,content,folder_id} = req.body
    console.log(folder_id, 'folder ID')
    const knexInstance = req.app.get('db')
    const newNote= {name,content,folder_id}
    console.log(newNote, "new note***")
    
    NotesService.addNote(knexInstance,newNote)
    .then(note => {
      console.log(note, "note,note,note")
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