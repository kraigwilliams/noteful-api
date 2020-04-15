const NotesServive={

getAllNotes(knex,folderId){
    return knex.from('notes').select('*')
    .where('folder_id',folderId)
},
addNote(knex,newNote){
    return knex('notes')
    .insert(newNote)
    .into('notes')
    .returning('*')
},
deleteNote(knex,noteId){
    return knex('notes')
    .where('id',noteId)
    .delete()
}

}

module.exports= NotesService