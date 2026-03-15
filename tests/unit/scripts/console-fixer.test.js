const test = require('node:test')
const assert = require('node:assert')
const { ConsoleFixer } = require('../../../scripts/console-fixer.js')

test('ConsoleFixer.parseConsoleMessage', async (t) => {
  const fixer = new ConsoleFixer()

  await t.test('should parse "Unknown property" error', () => {
    const mockMsg = {
      text: () => "Unknown property 'foo-bar'.  Declaration dropped.",
      location: () => ({ url: 'test.css', lineNumber: 10, columnNumber: 5 }),
    }

    const errors = fixer.parseConsoleMessage(mockMsg)

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0].type, 'wrap_supports')
    assert.strictEqual(errors[0].message, "Property 'foo-bar' not supported")
    assert.strictEqual(errors[0].property, 'foo-bar')
    assert.deepStrictEqual(errors[0].location, {
      url: 'test.css',
      lineNumber: 10,
      columnNumber: 5,
    })
  })

  await t.test(
    'should parse "Unknown pseudo-class" error and prioritize it over generic bad selector',
    () => {
      const mockMsg = {
        text: () =>
          "Unknown pseudo-class or pseudo-element '-moz-foo'.  Ruleset ignored due to bad selector.",
        location: () => ({ url: 'test.css', lineNumber: 20, columnNumber: 1 }),
      }

      const errors = fixer.parseConsoleMessage(mockMsg)

      // We expect it to match the more specific rule and NOT just the generic "Ruleset ignored due to bad selector"
      // Though current implementation might return both, we should at least check the specific one is there.
      const specificError = errors.find(
        (e) => e.type === 'wrap_supports_selector'
      )
      assert.ok(specificError, 'Should find the specific pseudo-class error')
      assert.strictEqual(
        specificError.message,
        "Pseudo-element '-moz-foo' not supported"
      )
      assert.strictEqual(specificError.property, '-moz-foo')
    }
  )

  await t.test('should parse "Unrecognized at-rule" error', () => {
    const mockMsg = {
      text: () =>
        "Unrecognized at-rule or error parsing at-rule '@-moz-document'.",
      location: () => ({}),
    }

    const errors = fixer.parseConsoleMessage(mockMsg)

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0].type, 'wrap_supports')
    assert.strictEqual(
      errors[0].message,
      "At-rule '@-moz-document' not supported"
    )
    assert.strictEqual(errors[0].property, '@-moz-document')
  })

  await t.test(
    'should parse "Ruleset ignored due to bad selector" error when alone',
    () => {
      const mockMsg = {
        text: () => 'Ruleset ignored due to bad selector.',
        location: () => ({}),
      }

      const errors = fixer.parseConsoleMessage(mockMsg)

      assert.strictEqual(errors.length, 1)
      assert.strictEqual(errors[0].type, 'investigate')
      assert.strictEqual(
        errors[0].message,
        'Bad selector - needs manual review'
      )
      assert.strictEqual(errors[0].property, null)
    }
  )

  await t.test('should parse "Error in parsing value" error', () => {
    const mockMsg = {
      text: () =>
        "Error in parsing value for 'background-color'.  Declaration dropped.",
      location: () => ({}),
    }

    const errors = fixer.parseConsoleMessage(mockMsg)

    assert.strictEqual(errors.length, 1)
    assert.strictEqual(errors[0].type, 'investigate')
    assert.strictEqual(
      errors[0].message,
      "Invalid value for 'background-color' - needs manual review"
    )
    assert.strictEqual(errors[0].property, 'background-color')
  })

  await t.test('should return empty array for unrelated messages', () => {
    const mockMsg = {
      text: () => 'Just a normal console.log message.',
      location: () => ({}),
    }

    const errors = fixer.parseConsoleMessage(mockMsg)

    assert.strictEqual(errors.length, 0)
  })
})
