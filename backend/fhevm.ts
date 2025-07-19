import { createInstance } from "../fhevmjs/dist/node.js";

let instance;

export async function initFheInstance(): Promise<void> {
  instance = await createInstance({
    publicKey: "0x00", // Фиктивный публичный ключ, если не используешь генерацию
    kmsAddress: "0x518549923A16D646E883BC7345A663D307Bf3164", // 🔁 новый адрес контракта
    chainId: 11155111, // Sepolia
  });
}

export function encryptValue(value: number): Uint8Array {
  if (!instance) throw new Error("Instance is not initialized");

  const { ciphertext } = instance.encrypt32(value);

  if (typeof ciphertext === "string") {
    throw new Error("❌ fhevmjs не возвращает Uint8Array — перепроверь сборку");
  }

  return ciphertext;
}
