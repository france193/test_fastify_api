import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Static, Type } from "@sinclair/typebox";

// In-memory user storage (replace with database in production)
const users = new Map<number, { id: number; name: string }>();
let idCounter = 1;

// Define Schemas
const UserParams = Type.Object({ id: Type.String() });
const UserSchema = Type.Object({
  name: Type.String({ minLength: 1, maxLength: 50 }),
});
const UserResponse = Type.Object({ id: Type.Number(), name: Type.String() });

type UserInput = Static<typeof UserSchema>;
type UserParamsType = Static<typeof UserParams>;

export async function userRoutes(fastify: FastifyInstance) {
  // GET ALL USERS
  fastify.get("/", async (_, reply: FastifyReply) => {
    return Array.from(users.values());
  });

  // GET USER BY ID
  fastify.get<{ Params: UserParamsType }>("/:id", async (request, reply) => {
    const user = users.get(Number(request.params.id));
    if (!user) return reply.status(404).send({ message: "User not found" });
    return user;
  });

  // POST USER (Create)
  fastify.post<{ Body: UserInput }>(
    "/",
    {
      schema: { body: UserSchema, response: { 201: UserResponse } },
    },
    async (request, reply) => {
      const { name } = request.body;
      const newUser = { id: idCounter++, name };
      users.set(newUser.id, newUser);
      return reply.status(201).send(newUser);
    }
  );

  // PUT USER (Update)
  fastify.put<{ Params: UserParamsType; Body: UserInput }>(
    "/:id",
    async (request, reply) => {
      const user = users.get(Number(request.params.id));
      if (!user) return reply.status(404).send({ message: "User not found" });
      user.name = request.body.name;
      return reply.send(user);
    }
  );

  // DELETE USER
  fastify.delete<{ Params: UserParamsType }>("/:id", async (request, reply) => {
    if (!users.delete(Number(request.params.id))) {
      return reply.status(404).send({ message: "User not found" });
    }
    return reply.send({ message: "User deleted" });
  });
}
