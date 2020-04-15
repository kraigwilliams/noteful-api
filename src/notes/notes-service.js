const NotesService={

getAllNotes(knex){
    return knex.from('notes').select('*')
    
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