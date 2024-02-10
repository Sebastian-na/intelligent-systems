import { Perception } from "../interfaces"

export default function calculateInjuredAndDeads(
  lastGuess: string,
  number: string
): Perception {
  let deads = 0
  let injured = 0
  for (let i = 0; i < 4; i++) {
    if (lastGuess[i] === number[i]) {
      deads++
    } else if (lastGuess.includes(number[i])) {
      injured++
    }
  }
  return { deads, injured }
}
