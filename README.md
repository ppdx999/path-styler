# path-styler

Rewrite path styles. ex) /user/:userId ---> /user/{user_id}


# Install

deno

```
import {styler} from 'https://raw.githubusercontent.com/ppdx999/path-styler/main/mod.ts'
```

node
```
npm i path-styler
```

# Usage

```ts
import {styler} from 'path-styler'

const convert = newStyler({ var: ':' , case: 'snake' })
const result = convert('/user/{user_id}/contents/{contents_id}')
result === '/user/:userId/contents/:contentsId'


const convert2 = newStyler({ var: ":", case: "camel" })
const result = convert2("/user/{user_id}/contents/{contents_id}")
result === "/user/:userId/contents/:contentsId"


const result = newStyler({var: "{}", case: "snake"})(
    "/user/:user_id/contents/:contents_id"
)
reuslt === "/user/{user_id}/contents/{contents_id}"
```
