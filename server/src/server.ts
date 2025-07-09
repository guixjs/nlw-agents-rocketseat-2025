import { fastify } from 'fastify'
import {
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { createRoomRoute } from './http/routes/create-rooms.ts'
import { getRoomsQuestionsRoute } from './http/routes/get-rooms-questions.ts'
import { createQuestionRoute } from './http/routes/create-questions.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'https://localhost:5173',
})

app.setValidatorCompiler(validatorCompiler)



app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomsQuestionsRoute)
app.register(createQuestionRoute)

app.listen({
  port: env.PORT
})