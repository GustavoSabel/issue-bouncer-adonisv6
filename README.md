# Bug Report: Bouncer with Two Guars fails to list the methods in Policy

## Overview
This repository is dedicated to documenting, reproducing, and tracking the resolution of a bug 

## Description of the Issue
The bug manifests with Bouncer when the Auth has more than one Guard with different models 

Auth configuration:
```ts
const authConfig = defineConfig({
  default: 'driver',
  guards: {
    account: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/account'),
      }),
    }),
    driver: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/driver'),
      }),
    }),
  },
})
```

Policy:
```ts
export default class PostPolicy extends BasePolicy {
  async createWithAccount(user: Account) {
    return Promise.resolve(!!user)
  }

  async createWithDriver(user: Driver) {
    return Promise.resolve(!!user)
  }
}
```

Controller:
```ts
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
```

## Expected Behavior
Expect method `createWithAccount` to be recognized

## Actual Behavior
This
```ts
await bouncer.with(PostPolicy).authorize('createWithAccount')
```
Gives this typescript error: 
> Argument of type '"createWithAccount"' is not assignable to parameter of type '"createDriver"'.ts(2345)