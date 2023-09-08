const context = [];

function subscribe(running, subscriptions) {
	subscriptions.add(running);
	running.dependencies.add(subscriptions);
}

export function makeSignal(initialValue) {
	const subscriptions = new Set();

	const getter = () => {
		const running = context[context.length - 1];
		if (running) subscribe(running, subscriptions);
		return initialValue;
	};
	const setter = (updatedValue) => {
		initialValue = updatedValue;

		for (const subscription of [...subscriptions]) {
			subscription.execute();
		}
	};
	return [getter, setter];
}
