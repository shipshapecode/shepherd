## JS Framework Wrappers

We strive to make it easy to use Shepherd in all the major frameworks, and have written wrappers to facilitate this.

* [angular-shepherd](https://github.com/shepherd-pro/angular-shepherd)
* [ember-shepherd](https://github.com/shepherd-pro/ember-shepherd)
* [react-shepherd](https://github.com/shepherd-pro/react-shepherd)
* [vue-shepherd](https://github.com/shepherd-pro/vue-shepherd)

## Install Directly

### npm

```bash
npm install shepherd.js --save
```

### yarn

```bash
yarn add shepherd.js
```

### pnpm

```bash
pnpm add shepherd.js
```

### bun

```bash
bun add shepherd.js
```

### styles

Don't forget to add your styles

```javascript
import 'shepherd.js/dist/css/shepherd.css';
```

### GitHub Releases

Whenever we release a new version, the contents of the `dist` are uploaded
to the release in GitHub. You can find those assets [here](https://github.com/shepherd-pro/shepherd/releases).

### jsDelivr CDN

You can use jsDelivr to pull down any release from npm. For example, you could include v10.0.1 with styles in your app
with:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/shepherd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/css/shepherd.css"/>
```

