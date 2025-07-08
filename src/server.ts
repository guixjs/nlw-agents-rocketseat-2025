import { fastify } from 'fastify'
import {
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { env } from './env.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'https://localhost:5173',
})

app.setValidatorCompiler(validatorCompiler)

app.listen({
  port: env.PORT
})