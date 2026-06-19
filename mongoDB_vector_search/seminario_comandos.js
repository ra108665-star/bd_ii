// mongoDB commands

// Após carregar os bancos sample_mflix e sample_airbnb

// Em sample_mflix/movies, utilize este comando para todas as operações em movies
use("sample_mflix");

// Exibe os filmes e seus campos
db.movies.find({})

// Para exibir somente os campos
Object.keys(db.movies.findOne())

// Método para criar o index de busca
db.movies.createSearchIndex(
  "autoembed_index", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "autoEmbed",
        "modality": "text",
        "path": "fullplot",
        "model": "voyage-4"
      }
    ]
  }
);

// Verificar o status dos arquivos
db.movies.getSearchIndexes().forEach(printjson)

// Método aggregate utilizado na busca vetorial
db.movies.aggregate([
  {
    "$vectorSearch": {
      "index": "autoembed_index", 
      "path": "fullplot", 
      "query": {
        "text": "journey through the country side"
      }, 
      "numCandidates": 100, 
      "model": "voyage-4",
      "limit": 10
    }
  },
  {
    "$project": {
      "_id": 0, 
      "title": 1, 
      "fullplot": 1, 
      "score": {"$meta": "vectorSearchScore"}
    }
  }
])

// Método aggregate com filtros de campo
db.movies.aggregate([
  {
    $vectorSearch: {
      index: "autoembed_index",
      path: "fullplot",
      filter: {
        year: {
          $gte: 1980,
          $lt: 2020
        },
        genres: {
          $in: ["Action", "Adventure", "Family"]
        }
      },
      query: {
        text: "epic fantasy journey with reluctant heroes"
      },
      numCandidates: 100,
      limit: 10
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      fullplot: 1,
      year: 1,
      genres: 1,
      score: { $meta: "vectorSearchScore" }
    }
  }
]);
