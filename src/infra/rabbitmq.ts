import client, { Channel, Connection } from "amqplib";

let connection: Connection;

const connect = async () => {
  if (connection) return;

  connection = await client.connect(
    "amqp://docker:dockerpassword@localhost:5672"
  );
};

const bind = async (queue?: string) => {
  const channel = await connection.createChannel();

  if (queue) {
    await channel.assertQueue(queue);
  }

  return channel;
};

const unbind = async (channel: Channel) => {
  return channel.close();
};

const send = async (queue: string, content: any) => {
  const channel = await connection.createChannel();

  return channel.sendToQueue(queue, Buffer.from(content));
};

export const useRabbitMQ = async () => {
  await connect();

  return { bind, unbind, send };
};
