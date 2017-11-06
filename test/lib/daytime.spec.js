/* eslint-env jest */
import { randomDayTime } from '../../src/lib/daytime'

describe('daytime library', () => {
  describe('randomDayTime', () => {
    it('throws error when interval is null', () => {
      expect(() => randomDayTime(null)).toThrowErrorMatchingSnapshot()
    })

    it('throws error when interval is not an array', () => {
      expect(() => randomDayTime(1)).toThrowErrorMatchingSnapshot()
    })

    it('throws error when interval is malformed', () => {
      expect(() => randomDayTime([1, 2, 3])).toThrowErrorMatchingSnapshot()
    })

    it('throws error on inconsistent start hour', () => {
      expect(() => randomDayTime([-1, 12])).toThrowErrorMatchingSnapshot()
    })

    it('throws error on inconsistent end hour', () => {
      expect(() => randomDayTime([-1, 12])).toThrowErrorMatchingSnapshot()
    })

    it('throws error when randomize is null', () => {
      expect(() => randomDayTime([0, 1], null)).toThrowErrorMatchingSnapshot()
    })

    it('throws error when randomize is not a function', () => {
      expect(() => randomDayTime([0, 1], 2)).toThrowErrorMatchingSnapshot()
    })

    it('returns expected hours/minutes values', () => {
      const randomizeStub = jest
        .fn()
        .mockReturnValueOnce(10)
        .mockReturnValueOnce(34)

      const result = randomDayTime([0, 24], randomizeStub)

      expect(result).toMatchSnapshot()
    })

    it('throw error on incorrect minimal hour', () => {
      const randomizeStub = jest
        .fn()
        .mockReturnValueOnce(-1)
        .mockReturnValueOnce(34)

      expect(() =>
        randomDayTime([0, 24], randomizeStub)
      ).toThrowErrorMatchingSnapshot()
    })

    it('throws error on incorrect maximal hour', () => {
      const randomizeStub = jest
        .fn()
        .mockReturnValueOnce(24)
        .mockReturnValueOnce(34)

      expect(() =>
        randomDayTime([0, 24], randomizeStub)
      ).toThrowErrorMatchingSnapshot()
    })

    it('throws error on incorrect minimal minute', () => {
      const randomizeStub = jest
        .fn()
        .mockReturnValueOnce(12)
        .mockReturnValueOnce(-1)

      expect(() =>
        randomDayTime([0, 24], randomizeStub)
      ).toThrowErrorMatchingSnapshot()
    })

    it('throws error on incorrect maximal minute', () => {
      const randomizeStub = jest
        .fn()
        .mockReturnValueOnce(12)
        .mockReturnValueOnce(-1)

      expect(() =>
        randomDayTime([0, 24], randomizeStub)
      ).toThrowErrorMatchingSnapshot()
    })
  })
})
