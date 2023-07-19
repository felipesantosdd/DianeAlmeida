import { expect, test } from 'vitest'
// import { print } from '../server'

test('sum twu numbers', () => {
    expect(1 + 3).toEqual(4)
})

const client = {
    name: 'Felipe'
}
// test('print', () => {
//     expect(print(client)).toEqual('Oii Felipe')
// })