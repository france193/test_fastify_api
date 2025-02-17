import Fastify from "fastify";
import { userRoutes } from "./routes/users";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.get("/", async (request, reply) => {
  return { message: "Benvenuto su Fastify API!" };
});

// Register Routes
fastify.register(userRoutes, { prefix: "/users" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("🚀 Server in ascolto su http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
