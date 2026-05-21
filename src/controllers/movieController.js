import { ObjectId } from "mongodb";

export async function getAllMovies(request, reply) {
    const movies = await request.server.mongo.db
        .collection("movies")
        .find()
        .toArray();

    reply.send(movies);
}

export async function getMovieById(request, reply) {

    const movie = await request.server.mongo.db
        .collection("movies")
        .findOne({ _id: new ObjectId(request.params.id) });

    if (!movie) {
        reply.status(404).send({ message: "Filmen hittades inte" });
        return;
    }
    return reply.send(movie);
}

export async function addMovie(request, reply) {
    const newMovie = await request.server.mongo.db
        .collection("movies")
        .insertOne(request.body);

    return {
        message: "Filmen har lagts till",
        movieId: newMovie.insertedId,
    }
}

export async function updateMovie(request, reply) {

    const updated = await request.server.mongo.db
        .collection("movies")
        .updateOne(
            { _id: new ObjectId(request.params.id) },
            { $set: request.body }
        );
    if (!updated) {
        return reply.status(404).send({ message: "Filmen hittades inte" });
    }

    return reply.send({ message: "Filmen har uppdaterats", movie: updated });
}

export async function deleteMovie(request, reply) {

    const deleted = await request.server.mongo.db
        .collection("movies")
        .deleteOne({ _id: new ObjectId(request.params.id) });

    if (!deleted) {
        return reply.status(404).send({ message: "Filmen hittades inte" });
    }
    return reply.send({ message: "Filmen har tagits bort" });
}