import { Perception } from "./interfaces"

/**
 * This class represents the agent that will play the game.
 * It will receive the perceptions and will compute the next guess.
 * The game consists of guessing a 4-digit number, where each digit is different.
 * The game will provide the agent with the number of "deads" and "injured" digits.
 * The deads are the digits that are in the correct position.
 * The injured are the digits that are in the wrong position but are part of the number.
 */
class Agent {
  private lastGuess: string = ""
  private possibleNumbers: string[] = []
  public won = false

  public compute(perception: Perception | "start") {
    if (perception === "start") {
      this.initialize()
      console.log("Starting the agent...")
      this.lastGuess = "0123"
      console.log("Initial guess:", this.lastGuess)
      return
    }

    if (perception.deads === 4) {
      console.log("The agent won!")
      this.won = true
      return
    }

    this.possibleNumbers = this.filterPossibleNumbers(perception)

    if (this.possibleNumbers.length === 1) {
      console.log("Your number is:", this.possibleNumbers[0])
      this.won = true
      return
    }

    console.log("Possible numbers:", this.possibleNumbers.length)
    const nextGuess = this.possibleNumbers[0]
    this.lastGuess = nextGuess
    console.log("Next guess:", nextGuess)
  }

  private initialize() {
    this.won = false
    this.possibleNumbers = this.generatePossibleNumbers()
  }

  private generatePossibleNumbers() {
    const numbers: string[] = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        for (let k = 0; k < 10; k++) {
          for (let l = 0; l < 10; l++) {
            if (
              i !== j &&
              i !== k &&
              i !== l &&
              j !== k &&
              j !== l &&
              k !== l
            ) {
              numbers.push(`${i}${j}${k}${l}`)
            }
          }
        }
      }
    }
    return numbers
  }

  private filterPossibleNumbers(perception: Perception) {
    let possibleNumbers = this.possibleNumbers
    possibleNumbers = this.filterPossibleDeads(possibleNumbers, perception)
    possibleNumbers = this.filterPossibleInjured(possibleNumbers, perception)
    return possibleNumbers
  }

  /**
   * This function filters the possible numbers that have the same number of deads
   * as the given perception. It counts the number of digits in the guess that are
   * in the same position as the last guess. If the count is the same as the number of deads
   * in the perception, then the number is kept.
   * @returns
   */
  private filterPossibleDeads(
    possibleNumbers: string[],
    perception: Perception
  ): string[] {
    return possibleNumbers.filter((number) => {
      let count = 0
      for (let i = 0; i < 4; i++) {
        if (number[i] === this.lastGuess[i]) {
          count++
        }
      }
      return count === perception.deads
    })
  }

  /**
   * This function filters the possible numbers that have the same number of injured
   * as the given perception. It counts the number of digits in the guess that are present in the last guess.
   * It takes into account the deads, so it only counts the digits that are not in the same position as the last guess.
   */
  private filterPossibleInjured(
    possibleNumbers: string[],
    perception: Perception
  ): string[] {
    return possibleNumbers.filter((number) => {
      let count = 0
      for (let i = 0; i < 4; i++) {
        if (this.lastGuess.includes(number[i])) {
          count++
        }
      }
      return count === perception.deads + perception.injured
    })
  }
}

export default Agent
