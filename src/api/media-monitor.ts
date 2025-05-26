import {BladeApi, ButtonController, Emitter} from '@tweakpane/core';
import { MediaMonitorController } from '../controller/main.js';

export class MediaMonitorApi extends BladeApi {
	constructor(controller: MediaMonitorController) {
		super(controller);
	}
}
