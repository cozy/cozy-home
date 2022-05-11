/* eslint-disable promise/no-callback-in-promise */
const cozyMiddleware =
  client =>
  ({ dispatch }) => {
    return next => action => {
      const { promise, type, types, ...rest } = action
      if (!promise) {
        return next(action)
      }

      if (!type && !types) {
        return promise(client).then(action => dispatch(action))
      }

      if (type) {
        return promise(client).then(response => {
          next({ ...rest, response, type })
          return response
        })
      }

      const [REQUEST, SUCCESS, FAILURE] = types
      next({ ...rest, type: REQUEST })

      return promise(client)
        .then(
          response => {
            next({ ...rest, response, type: SUCCESS })
            return response
          },
          error => {
            console.log(error) // eslint-disable-line no-console
            next({ ...rest, error, type: FAILURE })
          }
        )
        .catch(error => {
          console.error('MIDDLEWARE ERROR:', error) // eslint-disable-line no-console
          next({ ...rest, error, type: FAILURE })
        })
    }
  }

export default cozyMiddleware
