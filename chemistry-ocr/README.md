## App to test tes availability of 'Chemistry love project'

This is a a one repository multi package made in node and react

### Usage

1. Install dependencies

   `pnpm install`

2. Run the main project with only one command

   `pnpm run dev`

### Resume

Dependencies used

    - ts-node (typescript)
    - express (backend)
    - standard (eslintrc)
    - multer (store images)
    - cors (available cors support)
    - sooner (pretty messages)

Technologies used

    - JavaScript
    - Node

Frameworks used

    - React
    - Express

---

## Additional settings

- Set eslintrc in the root `"extends": "./node_modules/standard/eslintrc.json"`
- Add the following `env: { browser: true, node: true, es2020: true },`
- Add the following line `"dev": "sh -c 'pnpm --filter \"**\" dev'"` into the own dev script in the file `package.json`

```yaml
packages:
  - frontend
  - backend
```
