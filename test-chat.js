// test-chat.js
import { generateLocalReply } from './server/chatService.js';

const testCases = [
  "Halo",
  "Pagi",
  "Saya mau cat motor",
  "Motor saya Vario 160",
  "Berapa harga cat motor?",
  "Terima kasih",
];

console.log("=== RUNNING CHATBOT TESTS ===\n");

testCases.forEach((input, index) => {
  const result = generateLocalReply(input, []);
  console.log(`[Test ${index + 1}] Input: "${input}"`);
  console.log(`Response:\n${result.reply}`);
  console.log(`suggestAdmin: ${result.suggestAdmin}`);
  console.log("-".repeat(50) + "\n");
});
