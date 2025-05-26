import {
	BaseBladeParams,
	BladePlugin,
	createPlugin,
	LabelPropsObject,
	MicroParser,
	parseRecord,
	ValueMap,
} from '@tweakpane/core';

import {MediaMonitorApi} from './api/media-monitor.js';
import {MediaMonitorController} from './controller/main.js';
import { MediaController } from './controller/media.js';

export type Media = HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;

export interface MediaMonitorParams extends BaseBladeParams {
	media: Media;
	view: 'media-monitor';

	height?: number;
	label?: string;
}

export const PluginMediaMonitor: BladePlugin<MediaMonitorParams> =
	createPlugin({
		id: 'media-monitor',
		type: 'blade',

		accept(params) {
			const result = parseRecord<MediaMonitorParams>(params, (p) => ({
				media: p.required.custom<Media>((value) => {
					if (value instanceof HTMLCanvasElement || value instanceof HTMLImageElement || value instanceof HTMLVideoElement) return value;
				}),
				view: p.required.constant('media-monitor'),
				height: p.optional.number,
				label: p.optional.string,
			}));
			return result ? {params: result} : null;
		},

		controller(args) {
			return new MediaMonitorController(args.document, {
				blade: args.blade,
				labelProps: ValueMap.fromObject<LabelPropsObject>({
					label: null,
				}),
				valueController: new MediaController(args.document, {
					media: args.params.media,	
					label: args.params.label,
				}),
				media: args.params.media,
				label: args.params.label,
			});
		},

		api(args) {
			if (args.controller instanceof MediaMonitorController) {
				return new MediaMonitorApi(args.controller);
			}
			return null;
		},
	});