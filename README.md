# ClickBoss

Handle all clicks in a single listener

## Install

`yarn add @sergonius/click-boss`

## Example

```javascript
import ClickBoss from '@sergonius/click-boss';

const elems = document.querySelectorAll('a');

elems.forEach(elem => {
	const fn = event => {
		event.preventDefault();
		ClickBoss.removeEvent({ elem });
	};

	ClickBoss.addEvent({ elem, fn });
});
```
