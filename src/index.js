// Swarm classes to expose
import * as commonErrors from './errors'
import { errors as apiErrors } from './api'
import { errors as horizonErrors } from './horizon'

export * from './sdk'
export * from './const'

export { default as base } from './base'
export { Wallet } from './wallet'

export { HorizonResponse } from './horizon'
export { ApiResponse } from './api'

// Typed errors
export const errors = {
  common: commonErrors,
  api: apiErrors,
  horizon: horizonErrors
}
