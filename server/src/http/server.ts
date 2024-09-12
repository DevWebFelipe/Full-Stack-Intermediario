import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastify from 'fastify'
import { createGoalRoute } from './routes/create-goal'
import { createGoalCompletionRoute } from './routes/create-completion'
import { getWeekPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

/*
Criando rotas, depois vai ser dividido em arquivos e vou manter isso aqui apenas para poder
ficar como exemplo

  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const { title, desiredWeeklyFrequency } = request.body

      await createGoal({
        title,
        desiredWeeklyFrequency,
      })
    }
  )
*/

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekPendingGoalsRoute)
app.register(getWeekSummaryRoute)

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
