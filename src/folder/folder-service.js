const FoldersService={

    getAllFolders(knex){
        return knex.from('folders').select('*')
        
    },
    addFolder(knex,newFolder){
        return knex('folders')
        .insert(newFolder)
        .into('folders')
        .returning('*')
    }
    
    }
    
    module.exports= FoldersService