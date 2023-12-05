// receive.js
import { connect } from 'amqplib';
import fs from 'fs';


const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
const queueName = process.env.QUEUE_NAME || 'register_queue';
const logFilePath = process.env.LOG_FILE_PATH || 'received_messages.log';

async function receive() {
  try {
    // Connect to RabbitMQ server
    const connection = await connect(rabbitmqUrl); // Replace with your RabbitMQ server URL
    const channel = await connection.createChannel();

    // Declare the queue to ensure it exists
    await channel.assertQueue(queueName, { durable: false });

    console.log(`Waiting for messages. To exit press CTRL+C`);

    // Consume messages from the queue
    channel.consume(queueName, (message) => {
      if (message) {
        const receivedMessage = message.content.toString();
        console.log(`Received message: ${receivedMessage}`);

         // Write the received message to the log file
            fs.appendFile(logFilePath, `${receivedMessage}\n`, (err) => {
            if (err) {
              console.error(`Error writing to log file: ${err.message}`);
            }else { 
                // Get the file contents after the append operation 
                console.log("\nFile Contents of file after append:", 
                  fs.readFileSync(logFilePath, "utf8")); 
              } 
          });

        // Acknowledge the message to remove it from the queue
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

receive();