import {
	Blade,
	BladeController,
	LabelController,
	LabelProps,
	LabelView,
} from '@tweakpane/core';

import {MediaController} from './media.js';
import { Media } from '../plugin.js';

interface Config {
	blade: Blade;
	labelProps: LabelProps;
	valueController: MediaController;
	label?: string,
	media?: Media,
}

export class MediaMonitorController extends BladeController<LabelView> {
	public readonly labelController: LabelController<MediaController>;
	public readonly valueController: MediaController;

	constructor(doc: Document, config: Config) {
		const bc = config.valueController;

		const lc = new LabelController(doc, {
			blade: config.blade,
			props: config.labelProps,
			valueController: bc,
		});

		super({
			blade: config.blade,
			view: lc.view,
			viewProps: bc.viewProps,
		});

		this.valueController = bc;
		this.labelController = lc;
	}
}
