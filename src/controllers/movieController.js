// Helpers for accessing the MongoDB collection and converting string IDs to ObjectId
const getCollection = request => request.server.mongo.db.collection("movies");
const toObjectId = (request, id) => new request.server.mongo.ObjectId(id);

// GET /movies - Get all movies
export async function getAllMovies(request, reply) {

    const movies = await getCollection(request).find().toArray();
    reply.send(movies);
}

// GET /movies/:id - Get a movie by ID
export async function getMovieById(request, reply) {
    const movie = await getCollection(request).findOne({
        _id: toObjectId(request, request.params.id)
    });

    // check if the movie exists, if not return 404
    if (!movie) {
        return reply.status(404).send({ message: "Filmen hittades inte" });
    }
    return reply.send(movie);
}

// POST /movies - Add a new movie
export async function addMovie(request, reply) {
    const newMovie = await getCollection(request).insertOne(request.body);

    // return 201 Created with the new movie's ID
    return reply.status(201).send({
        message: "Filmen har lagts till",
        movieId: newMovie.insertedId,
    });
}

// PUT /movies/:id - Update a movie by ID
export async function updateMovie(request, reply) {
    const updated = await getCollection(request).updateOne(
        { _id: toObjectId(request, request.params.id) },
        { $set: request.body }      // updates only the fields provided in the request body
    );

    // check if any document was matched for update, if not return 404
    if (updated.matchedCount === 0) {
        return reply.status(404).send({ message: "Filmen hittades inte" });
    }

    // return success message if the movie was updated
    return reply.send({ message: "Filmen har uppdaterats" });
}

// DELETE /movies/:id - Delete a movie by ID
export async function deleteMovie(request, reply) {
    const deleted = await getCollection(request).deleteOne({
        _id: toObjectId(request, request.params.id)
    });

    // check if any document was deleted, if not return 404
    if (deleted.deletedCount === 0) {
        return reply.status(404).send({ message: "Filmen hittades inte" });
    }
    return reply.send({ message: "Filmen har tagits bort" });
}