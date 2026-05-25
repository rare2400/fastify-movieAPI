// JSON schema for validating movie data
export const movieSchema = {
    type: "object",
    required: ["title", "year", "length", "watched"],
    properties: {
        title: { type: "string", minLength: 1, maxLength: 100 },
        year: { type: "integer", minimum: 1888, maximum: 2050 },
        length: { type: "integer", minimum: 1 },
        watched: { type: "boolean" },
        rating: { type: [ "number", null ], minimum: 0, maximum: 10 }
    }
};