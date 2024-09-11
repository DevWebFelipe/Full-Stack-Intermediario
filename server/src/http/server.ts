import fastify from 'fastify'

const app = fastify()

/*
Server é quem vai rodar a aplicação no BackEnd
A aplicação será direcionada para a porta 3333 ou outra qualquer
Tudo que cair na porta selecionada, será 'escutado'/'capturado' e tratado pelo server
Biome para formatação de código
*/

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server rodando corretamente na porta 3333!')
  })
