import amqplib from 'amqplib';

const queue = process.env.QUEUE_NAME || "register_queue";
const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';

let connection;

async function initializeConnection() {
  try {
    connection = await amqplib.connect(rabbitmqUrl);
    console.log("Connection Established")
    process.on('exit', () => {
      if (connection) {
        connection.close();
      }
    });
  } catch (err) {
    console.warn(err);
  }
}

initializeConnection();

export default async function message_sender(text){

  try {
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log("Message Sent", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } 
};
