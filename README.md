# Tweakpane plugin media monitor

Media monitor blade plugin for [Tweakpane][tweakpane].

![](https://cosmicshelter.github.io/tweakpane-plugin-media-monitor/test/demo.png)

## Installation

### Browser
```html
<script type="module">
import {Pane} as Tweakpane from './tweakpane.min.js';
import * as TweakpaneTemplatePlugin from './tweakpane-plugin-media-monitor.min.js';

const pane = new Pane();
pane.registerPlugin(TweakpaneTemplatePlugin);
</script>
```


### Package
```js
import {Pane} from 'tweakpane';
import * as TweakpanePluginMediaMonitor from 'tweakpane-plugin-media-monitor';

const pane = new Pane();
pane.registerPlugin(TweakpanePluginMediaMonitor);
```


## Usage
```js
const canvas = document.createElement('canvas');

const blade = pane.addBlade({
  view: 'media-monitor',
  media: canvas, // Can be image, video or canvas
  label: 'Media'
});
```


[tweakpane]: https://github.com/cocopon/tweakpane/
