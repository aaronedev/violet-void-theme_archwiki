const test = require('node:test')
const assert = require('node:assert')
const { ConsoleFixer } = require('../../../scripts/console-fixer.js')

test('ConsoleFixer', async (t) => {
  await t.test('generateFixes', async (t) => {
    const fixer = new ConsoleFixer()

    await t.test('handles empty errors array', () => {
      const fixes = fixer.generateFixes([])
      assert.deepStrictEqual(fixes, [])
    })

    await t.test('filters duplicate properties', () => {
      const errors = [
        { type: 'wrap_supports', property: 'clip' },
        { type: 'wrap_supports', property: 'clip' },
      ]
      const fixes = fixer.generateFixes(errors)
      assert.strictEqual(fixes.length, 1)
    })

    await t.test('handles wrap_supports', () => {
      const errors = [{ type: 'wrap_supports', property: 'clip' }]
      const fixes = fixer.generateFixes(errors)
      assert.deepStrictEqual(fixes, [
        {
          property: 'clip',
          fix: '@supports (clip: auto) { ... }',
          autoFixable: true,
        },
      ])
    })

    await t.test('handles wrap_supports_selector', () => {
      const errors = [
        { type: 'wrap_supports_selector', property: '::-webkit-scrollbar' },
      ]
      const fixes = fixer.generateFixes(errors)
      assert.deepStrictEqual(fixes, [
        {
          property: '::-webkit-scrollbar',
          fix: '@supports selector(::-webkit-scrollbar) { ... }',
          autoFixable: true,
        },
      ])
    })

    await t.test('handles investigate', () => {
      const errors = [{ type: 'investigate', property: 'color' }]
      const fixes = fixer.generateFixes(errors)
      assert.deepStrictEqual(fixes, [
        {
          property: 'color',
          fix: 'Manual review required',
          autoFixable: false,
        },
      ])
    })

    await t.test('ignores errors without property', () => {
      const errors = [{ type: 'wrap_supports' }]
      const fixes = fixer.generateFixes(errors)
      assert.deepStrictEqual(fixes, [])
    })

    await t.test('ignores unknown types', () => {
      const errors = [{ type: 'unknown_type', property: 'color' }]
      const fixes = fixer.generateFixes(errors)
      assert.deepStrictEqual(fixes, [])
    })
  })
})
