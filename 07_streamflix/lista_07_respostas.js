use("streamflix")

// Nível 1

db.usuarios.find();

db.conteudos.find();

db.usuarios.find({cidade: "Curitiba"});

db.conteudos.find({tipo: "filme"});

db.conteudos.find({ titulo: "Matrix" });

db.usuarios.insertOne({
  nome: "Eduardo",
  email: "ra108665@uem.br",
  idade: 25,
  cidade: "Maringá",
  estado: "PR",
  interesses: "passar de ano",
  ativo: true
})

db.conteudos.insertOne({
    titulo: "regular show",
    tipo: "filme",
    ano: 2011,
    gêneros: "ação",
    avaliacaoMedia: 10.0,
    duracaoMinutos: 120,
    disponivel: true
})

// Nível 2

db.conteudos.find({
    avaliacaoMedia: { $gt: 9.0}
});

db.usuarios.find({
    idade: {$gt: 30}
});

db.conteudos.find({
    ano: {$lt: 2010}
})

db.conteudos.find({
    ano: {$gte: 2015}
});

db.conteudos.find({
    avaliacaoMedia: {$lte: 8.8}
});

db.usuarios.find({
    estado: {$ne: "PR"}
});

// Nível 3

db.conteudos.find({
    generos: "Drama"
});

db.conteudos.find({
    generos: "Ficção Científica"
});

db.conteudos.find({
    generos: ["Drama", "Crime"]
});

db.usuarios.find({
    interesses: "Suspense"
});

db.conteudos.find({
    generos: {
        $in: ["Terror", "Mistério"]
    }
});

db.conteudos.find({
    generos: {$ne: "Comédia"}
});

// Nível 4

db.conteudos.find({
    "diretor.nome": "Christopher Nolan"
});

db.conteudos.find({
    "diretor.pais": "Reino Unido"
});

db.usuarios.find({
    "endereco.bairro": "Centro"
});

db.usuarios.find({
    endereco: {$exists: true}
});

db.usuarios.find({
    endereco: {$exists: false}
})

// Nível 5

db.usuarios.updateOne(
    { nome: "Carlos Lima" },
    {
        $set: {
            ativo: true
        }
    }
);

db.conteudos.updateOne(
    {titulo: "Cidade de Deus"},
    { $set: {disponivel: true}}
);

db.conteudos.updateOne(
    {titulo: "Matrix"},
    {$set: {idiomaOriginal: "Inglês"}}
);

db.conteudos.updateOne(

    {titulo: "Interestelar"},
    {$set: {classificacao: "10+"}}
);

db.conteudos.updateOne(
    { titulo: "Avatar"},
    {$set: {avaliacaoMedia: 9.0}}
);

// Nível 6

db.conteudos.updateOne(
    { titulo: "Matrix" },
    {
        $inc: {
            visualizacoes: 1
        }
    }
);

db.conteudos.updateMany(
    {},
    {$inc: {visualizacoes: 1000}}
);

db.conteudos.updateOne(
    {título: "Matrix"},
    {
        $push: {
            generos: "Clássico"
        }
    }
);

db.conteudos.updateOne(
    {título: "Matrix"},
    {
        $pull: {
            generos: "Clássico"
        }
    }
);

db.usuarios.updateOne(
    {nome: "Beatriz Nunes"},
    {$unset: {telefone: ""}}
);

db.assinaturas.updateMany(
    {plano: "Premium"},
    {
        $push: {
            beneficios: "Sem an´ncios"
        }
    }
);

// Nível 7

db.conteudos.find({
    tipo: "filme",
    avaliacaoMedia: { $gt: 9 }
});

db.usuarios.find({
    cidade: {
        $in: ["Curitiba", "Maringá"]
    }
});

db.conteudos.find({
    tipo: {
        $in: ["serie", "documentario"]
    }
});

db.conteudos.find({
    avaliacaoMedia: {$gt: 9},
    visualizacoes: {$gt: 2000000}
});

db.usuarios.find({
    ativo: true,
    idade: {$lt: 30}
});

// Nível 8

db.conteudos.find({
    premios: { $exists: true }
});

db.conteudos.find({
    diretor: { $exists: false}
});

db.usuarios.find({
    premium: { $exists: true}
});

db.conteudos.find({
    temporadas: {$exists: true}
});

// No banco SQL relacional, as tabelas possuem uma estrutura fixa, onde cada li-
// nha possui as mesmas colunas.
// No MongoDB (NoSQL), os documentos na mesma coleção podem ter campos diferen-
// tes.

// Nível 9

db.usuarios.deleteOne({
    nome: "Eduardo"
});

db.conteudos.deleteOne({
    titulo: "regular show"
});

db.avaliacoes.deleteMany({
    nota: {$lt: 8}
});

db.historico.deleteMany({
    progressoPercentual: {$lt: 40}
});

// Ao trabalhar com várias coleções, a organização é melhor mas isso pode exigir
// mais consultas ao banco.
// Enquanto que em um único documento, haverá menos consultas porém o banco irá
// ficar grande e mais bagunçado.

// A principal vantagem é a organização dos campos em um mesmo lugar, facilitan-
// do a consulta. A desvantagem é que o documento não é escalável.

// Referência entre coleções é utilizada quando os dados possuem uma relação in-
// dependente, são reutilizados em vários documentos ou podem crescer muito ao
// longo do tempo.

// Quando as informações estão sempre relacionadas e são acessadas juntas é me-
// lhor usar dados incorporados no mesmo documento.
