import PostPolicy from '#policies/post_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async createWithDriver({ bouncer }: HttpContext) {
    await bouncer.with(PostPolicy).authorize('createWithDriver')
    return 'Posto created with driver'
  }

  async createWithAccount({ bouncer }: HttpContext) {
    // Typescript fails to recognize the method 'createWithAccount' from the policy
    await bouncer.with(PostPolicy).authorize('createWithAccount') 
    return 'Post created with account'
  }
}
