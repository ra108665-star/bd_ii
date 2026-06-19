// O banco de dados atual, deve estar presente em todos os comandos
use("sample_airbnb");

// Exibe os dados e os campos do banco airbnb
db.listingsAndReviews.find({})

// Exibe somente os campos
Object.keys(db.listingsAndReviews.findOne())

// Cria o index de busca com os dados do campo description
db.listingsAndReviews.createSearchIndex(
  "autoembed_index", 
  "vectorSearch", 
  {
    "fields": [
      {
        "type": "autoEmbed",
        "modality": "text",
        "path": "description",
        "model": "voyage-4"
      }
    ]
  }
);

// Verificar o status dos índices
db.listingsAndReviews.getSearchIndexes().forEach(printjson)

// Método aggregate para listingsAndReviews
db.listingsAndReviews.aggregate([
  {
    "$vectorSearch": {
      "index": "autoembed_index", 
      "path": "description", 
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
      "name": 1, 
      "description": 1,
      "access": 1, 
      "score": {"$meta": "vectorSearchScore"}
    }
  }
])
