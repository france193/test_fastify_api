import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", async (request, reply) => {
  return { message: "Benvenuto su Fastify API!" };
});

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
