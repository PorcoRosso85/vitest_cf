import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import type { UnstableDevWorker } from 'wrangler'
import { unstable_dev } from 'wrangler'
import app from './index'

// simple version
describe('Hono API version', () => {
  test('GET /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Hello Hono!')
  })
})

// unstable_dev version
describe('Wrangler', () => {
    let worker: UnstableDevWorker
  
    beforeAll(async () => {
      // relative path from project root to app file
      worker = await unstable_dev('./src/index.ts', {
        experimental: { disableExperimentalWarning: true },
      })
    })
    afterAll(async () => {
      await worker.stop()
    })
  
    test('GET /', async () => {
      const res = await worker.fetch('/')
      expect(res.status).toBe(200)
      expect(await res.text()).toBe('Hello Hono!')
    })
  })