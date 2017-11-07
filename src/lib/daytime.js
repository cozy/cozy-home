// Returns an our of the day between two hours given in parameters
// @param interval An array containing start hour as first index and end hour
// in second index
// @param randomize The function used to generate random values
// @returns an object with two atributes : hours and minutes
export const randomDayTime = (
  interval = [0, 1],
  randomize = (min, max) => Math.floor(Math.random() * (max - min) + min)
) => {
  if (!interval) throw new Error('Missing interval parameter')
  if (!randomize) throw new Error('Missing randomize parameter')

  if (!Array.isArray(interval)) throw new Error('interval must be an array')
  if (interval.length !== 2) throw new Error('interval must contain two values')
  if (typeof randomize !== 'function')
    throw new Error('randomize must be a function')

  const [start, end] = interval

  if (start < 0 || end > 24) throw new Error('interval must be inside [0, 24]')

  let hours = randomize(start, end)
  let minutes = randomize(0, 60)

  if (hours < 0 || hours > 23)
    throw new Error('randomize function returns inconsistent hour value')
  if (minutes < 0 || minutes > 59)
    throw new Error('randomize function returns inconsistent minute value')

  return { hours, minutes }
}
