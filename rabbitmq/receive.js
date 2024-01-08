import { connect } from 'amqplib';
import fs from 'fs';


const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
const queueName = process.env.QUEUE_NAME || 'register_queue';
const logFilePath = process.env.LOG_FILE_PATH || 'received_messages.log';

async function receive() {
  try {

    const connection = await connect(rabbitmqUrl); 
    const channel = await connection.createChannel();


    await channel.assertQueue(queueName, { durable: false });

    console.log(`Waiting for messages. To exit press CTRL+C`);


    channel.consume(queueName, (message) => {
      if (message) {
        const receivedMessage = message.content.toString();
        console.log(`Received message: ${receivedMessage}`);

          fs.appendFile(logFilePath, `${receivedMessage}\n`, (err) => {
            if (err) {
              console.error(`Error writing to log file: ${err.message}`);
            }
          });

        channel.ack(message);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

receive();