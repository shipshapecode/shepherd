export const defaults = {
	trigger: 'manual',
	arrow: true,
	animation: 'fade',
	duration: 420,
	flip: true,
	animateFill: false, // https://atomiks.github.io/tippyjs/#animate-fill-option
	interactive: true,  // https://atomiks.github.io/tippyjs/#interactive-option
	hideOnClick: 'toggle', // https://atomiks.github.io/tippyjs/#hide-on-click-option
	multiple: true,  // https://atomiks.github.io/tippyjs/#multiple-option
	popperOptions: {
		modifiers: {
			addShepherdClass: {
				enabled: true,
				fn: (data) => {
					data.instance.popper.classList.add('shepherd-popper');
					return data;
				}
			}
		}
	}
};
