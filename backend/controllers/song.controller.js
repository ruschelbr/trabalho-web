import model from "../models/song.model.js"
import album from "../models/album.model.js"

async function findAll(request, response) {
    try {
        const results = await model.findAll()
        response.json(results).status(200)
    } catch (error) {
        console.log(error)
    }
}

async function findById(request, response) {
    try {
        const result = await model.findByPk(request.params.id)
        if (result == null) {
            return response.status(404).send()
        }
        response.json(result).status(200)
    } 
    catch (error) {
        console.log(error)
    }
}

async function create(request, response) {
    try {
        const result = await model.create({
            name: request.body.name,
            youtubeLink: request.body.youtubeLink,
            tracklistPosition: request.body.tracklistPosition,
            AlbumId: request.body.AlbumId //ta certo? verificar
        })
        response.json(result).status(201)
    } catch (error) {
        console.log(error)
    }
}

async function deleteById(request, response) {
    try {
        const success = await model.destroy({ where: { id: request.params.id } })
        if (success == 1) {
            response.status(200).send()
        }
        else {
            response.status(404).send()
        }
    } catch (error) {
        console.log(error)
        response.status(500).send("Erro ao deletar cliente")
    }
}

async function update(request, response) {
    try {
        const success = await model.update({
            name: request.body.name,
            youtubeLink: request.body.youtubeLink,
            tracklistPosition: request.body.tracklistPosition,
            albumId: request.body.albumId //ta certo? verificar
        }, {where: { id: request.params.id }})
        if (success == 1) {
            response.status(200).send()
        }
        else {
            response.status(404).send()
        }
    } catch (error) {
        console.log(error)
    }
}

async function findSongsOfAlbum(request, response) { //método que deve ser chamado para a página de discografia, coloca numa lista os 3 albums e chama isso pra cada um na hora 
//de mostrar

    try {
        const result = await model.findAll({ where: { albumId: request.params.albumId } })
        if (result == null) {
            response.status(404).send()
        }
        else {
            response.json(result).status(200)
        }
    } catch (error) {
        console.log(error)
    }
}

export default { findAll, findById, findSongsOfAlbum, create, deleteById, update }