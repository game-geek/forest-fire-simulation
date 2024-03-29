import { describe, expect, test } from 'vitest'
import {propagateFires, Position, getFires } from '../src/FirePropagatorSimulator'
import generateGrid, { resetGrid } from '../src/gridGenerator'



test('verifies that generateGrid, resets properly', () => {
  const testGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0 ,fireDensity: 0})
  testGrid[0][0].state = 1
  testGrid[0][0].initial = true
  const testFires = getFires(testGrid)

  const sainGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0 ,fireDensity: 0})

  sainGrid[0][0].state = 1
  sainGrid[0][0].initial = true


//   propagate a few times and then reset
    propagateFires(testGrid, testFires)
    propagateFires(testGrid, testFires)
    propagateFires(testGrid, testFires)

    // reset the grid
    resetGrid(testGrid)
  expect(testGrid).toMatchObject(sainGrid)
})

test('verifies that generateGrid, resets properly w/ random values', () => {
    const testGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0 ,fireDensity: 23})
    const testFires = getFires(testGrid)
  
    const sainGrid = JSON.parse(JSON.stringify(testGrid))
  
  
  //   propagate a few times and then reset
      propagateFires(testGrid, testFires)
      propagateFires(testGrid, testFires)
      propagateFires(testGrid, testFires)
  
      // reset the grid
      resetGrid(testGrid)
    expect(testGrid).toMatchObject(sainGrid)
  })