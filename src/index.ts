class ClickBoss {
	public static NODE_LIMIT = 10;
	public static events = new WeakMap();
	protected static listenerAdded = false;
	private static eventCount = 0;

	static removeEvent(elem: Node) {
		if (ClickBoss.events.has(elem)) {
			ClickBoss.events.delete(elem);
			ClickBoss.eventCount -= 1;

			if (ClickBoss.eventCount === 0) {
				ClickBoss.removeListener();
			}

			return true;
		}

		throw Error('This element does not have a handler');
	}

	static addEvent({ elem, fn }: { elem: Node; fn: Function }) {
		if (!(elem && elem.nodeType === Node.ELEMENT_NODE)) {
			throw Error('"elem" is mandatory and must be an element node');
		}

		if (!(fn && typeof fn === 'function')) {
			throw Error('"fn" is mandatory and must be a function');
		}

		if (ClickBoss.events.has(elem)) {
			throw Error(
				'This element already has a handler. Remove the old one to add a new one.',
			);
		}

		if (!ClickBoss.listenerAdded) {
			ClickBoss.addListener();
		}

		ClickBoss.events.set(elem, fn);
		ClickBoss.eventCount += 1;

		return true;
	}

	private static addListener() {
		document.documentElement.addEventListener('click', listenerFn);
		ClickBoss.listenerAdded = true;
	}

	private static removeListener() {
		document.documentElement.removeEventListener('click', listenerFn);
		ClickBoss.listenerAdded = false;
	}
}

function getTargetElem(elem: Node, nodeLimit: number = ClickBoss.NODE_LIMIT) {
	if (nodeLimit === 0) {
		return false;
	}

	if (ClickBoss.events.has(elem)) {
		return elem;
	}

	if (elem.parentNode) {
		return getTargetElem(elem.parentNode, nodeLimit - 1);
	}

	return false;
}

function listenerFn(event: Event) {
	const targetElem: Node = getTargetElem(event.target as Node);

	if (targetElem) {
		ClickBoss.events.get(targetElem).bind(targetElem)(event);
	}
}

export default ClickBoss;
