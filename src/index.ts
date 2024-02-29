import { useRabbitMQ } from "./infra/rabbitmq";

const MY_QUEUE = "MY_QUEUE";

async function start() {
  const { bind, send } = await useRabbitMQ();

  const channel = await bind(MY_QUEUE);

  channel.consume(MY_QUEUE, (message) => {
    if (message) {
      console.log("Message reveived: ", message.content.toString());
      channel.ack(message);
    }
  });

  await send(MY_QUEUE, "HELLO WORLD!");
}

start();
