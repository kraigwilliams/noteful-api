const express = require('express')
const path = require('path')
const FoldersService = require('./folder-service')
const xss= require('xss')


const folderssRouter = express.Router()
const jsonParser = express.json()


foldersRouter

.route('/')

.get((req,res,next)=>{
    const knexInstance= req.app.get('db')
    FoldersService.getAllFolders()
    .then(folders=>{
        res.json(folders)
    })
    .catch(next)
})

.post(jsonParser,(req,res,next)=>{
    const{folder_name} = req.body
    const knexInstance = req.app.get('db')
    const newFolder={}
    
    
FoldersService.addFolder(knexInstance,newFolder)
.then
})

module.exports= notesRouter