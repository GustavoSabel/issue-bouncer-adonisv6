import Account from '#models/account'
import Driver from '#models/driver'
import { BasePolicy } from '@adonisjs/bouncer'

export default class PostPolicy extends BasePolicy {
  async createWithAccount(user: Account) {
    return Promise.resolve(!!user)
  }

  async createWithDriver(user: Driver) {
    return Promise.resolve(!!user)
  }
}
