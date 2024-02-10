import Agent from "./Agent"
import readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const prompt = (query: string) =>
  new Promise((resolve) => rl.question(query, resolve))

main()

async function main() {
  const agent = new Agent()
  agent.perceive("start")
  while (!agent.won) {
    const input = (await prompt("Enter the perception: ")) as string
    const perception = {
      deads: parseInt(input[0]),
      injured: parseInt(input[2]),
    }
    agent.perceive(perception)
  }
}
