import Fastify from "fastify";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

interface TrackBody {
  id: number;
  name: string;
}

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const fastify = Fastify({
  logger: true,
});

const start = async () => {
  try {
    const PORT = Number(process.env.PORT);

    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

fastify.get("/health", async (request, reply) => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

fastify.get("/tracks", async (request, reply) => {
  const { data, error } = await supabase.from("tracks").select();

  return reply.status(201).send({ data });
});

fastify.post("/tracks", async (request, reply) => {
  const { name } = request.body as TrackBody;
  const { data, error } = await supabase.from("tracks").insert({ name: name });

  if (error) {
    return reply.status(500).send({ error: error.message });
  }
  return reply.status(201).send({ data, name });
});

fastify.put("/tracks", async (request, reply) => {
  const { id, name } = request.body as TrackBody;
  const { data, error } = await supabase
    .from("tracks")
    .update({ name: name })
    .eq("id", id);

  if (error) {
    return reply.status(500).send({ error: error.message });
  }

  return reply.status(201).send({ data, id, name });
});

start();
