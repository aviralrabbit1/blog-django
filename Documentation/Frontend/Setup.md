### Redux template

From root directory,
```sh
mkdir frontend
cd frontend
npx degit reduxjs/redux-templates/packages/vite-template-redux blog-app
cd blog-app
npm install
```

### Install and configure Tailwind (for Vite)
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

or in `index.html`, add

```html
  <head>
    ...
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
```
