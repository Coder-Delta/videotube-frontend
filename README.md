# VideoTube Frontend

A modern Vue 3 video sharing platform built with Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

### 1. Install Dependencies

```sh
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure your backend URL:

```sh
cp .env.example .env
```

Edit `.env` and set your backend URL:

```env
VITE_API_BASE_URL=http://localhost:8000
```

📖 **For detailed environment configuration, see [ENV_CONFIG.md](./ENV_CONFIG.md)**


### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
