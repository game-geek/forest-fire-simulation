import { describe, expect, test } from 'vitest'
import {propagateFires, Position, getFires } from '../src/FirePropagatorSimulator'
import generateGrid from '../src/gridGenerator'



test('verifies that generateGrid, generates properly at 0,0', () => {
  const testGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})
  testGrid[0][0].state = 1
  testGrid[0][0].initial = true
  const testFires = getFires(testGrid)

  const sainGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})

  sainGrid[0][0].state = 3
  sainGrid[0][0].initial = true
  sainGrid[1][0].state = 1
  sainGrid[0][1].state = 1
  sainGrid[1][1].state = 1


  propagateFires(testGrid, testFires)
  expect(testGrid).toMatchObject(sainGrid)
})

test('verifies that generateGrid, generates properly at 99,99', () => {
  const testGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})
  testGrid[99][99].state = 1
  testGrid[99][99].initial = true
  const testFires = getFires(testGrid)

  const sainGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})

  sainGrid[99][99].state = 3
  sainGrid[99][99].initial = true
  sainGrid[99][98].state = 1
  sainGrid[98][98].state = 1
  sainGrid[98][99].state = 1

  propagateFires(testGrid, testFires)
  expect(testGrid).toMatchObject(sainGrid)
})
test('verifies that generateGrid, generates properly at 99,0', () => {
  const testGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})
  testGrid[99][0].state = 1
  testGrid[99][0].initial = true
  const testFires = getFires(testGrid)

  const sainGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})

  sainGrid[99][0].state = 3
  sainGrid[99][0].initial = true
  sainGrid[98][0].state = 1
  sainGrid[98][1].state = 1
  sainGrid[99][1].state = 1

  propagateFires(testGrid, testFires)
  expect(testGrid).toMatchObject(sainGrid)
})

test('verifies that generateGrid, generates properly at 0,99', () => {
  const testGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})
  testGrid[0][99].state = 1
  testGrid[0][99].initial = true
  const testFires = getFires(testGrid)

  const sainGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})

  sainGrid[0][99].state = 3
  sainGrid[0][99].initial = true
  sainGrid[0][98].state = 1
  sainGrid[1][98].state = 1
  sainGrid[1][99].state = 1

  propagateFires(testGrid, testFires)
  expect(testGrid).toMatchObject(sainGrid)
})

test('verifies that generateGrid, generates properly at 4,52', () => {
  const testGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})
  testGrid[4][52].state = 1
  testGrid[4][52].initial = true
  const testFires = getFires(testGrid)

  const sainGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})

  sainGrid[4][52].state = 3
  sainGrid[4][52].initial = true

  sainGrid[4][51].state = 1
  sainGrid[4][53].state = 1
  sainGrid[3][51].state = 1
  sainGrid[3][52].state = 1
  sainGrid[3][53].state = 1
  sainGrid[5][51].state = 1
  sainGrid[5][52].state = 1
  sainGrid[5][53].state = 1

  propagateFires(testGrid, testFires)
  expect(testGrid).toMatchObject(sainGrid)
})

test('verifies that generateGrid, generates properly all together in the 5 cases', () => {
  const testGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})
  testGrid[4][52].state = 1
  testGrid[4][52].initial = true
  testGrid[0][0].state = 1
  testGrid[0][0].initial = true
  testGrid[99][99].state = 1
  testGrid[99][99].initial = true
  testGrid[99][0].state = 1
  testGrid[99][0].initial = true
  testGrid[0][99].state = 1
  testGrid[0][99].initial = true
  const testFires = getFires(testGrid)

  const sainGrid = generateGrid({size: {height: 100, width: 100}, forestDensity: 0, fireDensity: 0})

  sainGrid[4][52].state = 3
  sainGrid[4][52].initial= true
  sainGrid[0][0].state = 3
  sainGrid[0][0].initial= true
  sainGrid[99][99].state = 3
  sainGrid[99][99].initial= true
  sainGrid[99][0].state = 3
  sainGrid[99][0].initial= true
  sainGrid[0][99].state = 3
  sainGrid[0][99].initial= true

  sainGrid[4][51].state = 1
  sainGrid[4][53].state = 1
  sainGrid[3][51].state = 1
  sainGrid[3][52].state = 1
  sainGrid[3][53].state = 1
  sainGrid[5][51].state = 1
  sainGrid[5][52].state = 1
  sainGrid[5][53].state = 1
  
  sainGrid[1][0].state = 1
  sainGrid[0][1].state = 1
  sainGrid[1][1].state = 1

  sainGrid[99][98].state = 1
  sainGrid[98][98].state = 1
  sainGrid[98][99].state = 1

  sainGrid[98][0].state = 1
  sainGrid[98][1].state = 1
  sainGrid[99][1].state = 1

  sainGrid[0][98].state = 1
  sainGrid[1][98].state = 1
  sainGrid[1][99].state = 1

  propagateFires(testGrid, testFires)
  expect(testGrid).toMatchObject(sainGrid)
})
