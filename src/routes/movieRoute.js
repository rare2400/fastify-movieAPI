import * as movieController from "../controllers/movieController.js";
import { movieSchema } from "../schemas/movieSchema.js";

export default async function movieRoutes(fastify) {

    // Get all movies
    fastify.get("/movies", movieController.getAllMovies);

    // Get one movie by ID
    fastify.get("/movies/:id", movieController.getMovieById);

    // Add a new movie with validation
    fastify.post("/movies", {
        schema: { body: movieSchema }
    }, movieController.addMovie);

    // Update an existing movie with validation
    fastify.put("/movies/:id", {
        schema: { body: movieSchema }
    }, movieController.updateMovie);

    // Delete a movie by ID
    fastify.delete("/movies/:id", movieController.deleteMovie);
}