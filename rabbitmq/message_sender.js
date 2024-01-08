import amqplib from 'amqplib';

const queue = process.env.QUEUE_NAME || "register_queue";
const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';


export default async function message_sender(text){
  let connection;
  try {
    connection = await amqplib .connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log("Message Sent", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
};
