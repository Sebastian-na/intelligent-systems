import Agent from "../Agent"
import calculateInjuredAndDeads from "../utils/calculateInjuredAndDeads"

describe("Agent", () => {
  test("allNumbers performance against agent", () => {
    const agent = new Agent()
    const allPossibleNumbers = agent.generatePossibleNumbers()
    const result: { number: string; attempts: number }[] = []

    for (const number of allPossibleNumbers) {
      agent.perceive("start")
      while (!agent.won) {
        const perception = calculateInjuredAndDeads(agent.lastGuess, number)
        agent.perceive(perception)
      }
      result.push({ number, attempts: agent.attempts })
    }

    const average = result.reduce((a, b) => a + b.attempts, 0) / result.length
    const max = Math.max(...result.map((r) => r.attempts))
    const min = Math.min(...result.map((r) => r.attempts))
    console.log("Average attempts:", average)
    console.log("Max attempts:", max)
    console.log("Min attempts:", min)

    // Print how many number were guessed in min, ... , max attempts
    const report = result.reduce((acc, r) => {
      if (!acc[r.attempts]) {
        acc[r.attempts] = 0
      }
      acc[r.attempts]++
      return acc
    }, {} as Record<number, number>)
    console.log(report)
  })
})
