import { MathProblem } from '../types';

/**
 * Generate a random math problem
 * Numbers: 0-9
 * Operations: + or -
 * Answer range: 0-20
 */
export function generateMathProblem(): MathProblem {
  let num1: number;
  let num2: number;
  let operation: '+' | '-';
  let answer: number;

  // Keep generating until we get valid constraints
  do {
    num1 = Math.floor(Math.random() * 10); // 0-9
    num2 = Math.floor(Math.random() * 10); // 0-9
    operation = Math.random() < 0.5 ? '+' : '-';

    if (operation === '+') {
      answer = num1 + num2;
    } else {
      answer = num1 - num2;
    }
  } while (answer < 0 || answer > 20);

  return { num1, num2, operation, answer };
}
