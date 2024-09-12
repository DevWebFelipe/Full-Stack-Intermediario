import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import { createGoalCompletion } from '../functions/create-goal-completion'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

/*
Criando rotas, depois vai ser dividido em arquivos e vou manter isso aqui apenas para poder
ficar como exemplo
*/

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
})

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

app.post(
  '/completions',
  {
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  },
  async request => {
    const { goalId } = request.body

    await createGoalCompletion({
      goalId,
    })
  }
)

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
