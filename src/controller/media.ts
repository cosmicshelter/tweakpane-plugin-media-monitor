import {
    ClassName,
	Controller,
	PlainView,
	ViewProps,
} from '@tweakpane/core';
import { Media } from '../plugin.js';

interface Config {  
    media: Media,
    label?: string,
    height?: number,
}
export type MediaControllerConfig = Config;

// Create a class name generator from the view name
// ClassName('tmp') will generate a CSS class name like `tp-tmpv`
const className = ClassName('media-monitor');

export class MediaController implements Controller<PlainView> {
	public readonly view: PlainView;
	public readonly viewProps: ViewProps;
	public readonly media: Media;
	public readonly label: string | undefined;
	public readonly height: number | undefined;
	public readonly mediaContainer: HTMLDivElement;
	public readonly labelContainer: HTMLDivElement | undefined;

	constructor(doc: Document, config: Config) {
        this.label = config.label;
        this.height = config.height;
        
		this.viewProps = ViewProps.create();
		this.viewProps.handleDispose(() => {
			this.view.element.remove();
		});

		this.view = new PlainView(doc, {
			viewProps: this.viewProps,
			viewName: 'media-monitor',
		});

        if (this.label) this.labelContainer = this.createLabelContainer_(doc);

        this.mediaContainer = this.createMediaContainer_(doc);
        this.media = this.createMedia_(config.media);
	}

    private createLabelContainer_(doc: Document): HTMLDivElement {
        const div = doc.createElement('div');

        div.innerHTML = `${this.label}`;

        div.classList.add(className('label-container'));

        this.view.element.appendChild(div);

        return div;
    }

    private createMediaContainer_(doc: Document): HTMLDivElement {
        const div = doc.createElement('div');

        div.classList.add(className('media-container'));

        if (this.height) {
            div.style.height = `${this.height}px`;
        }

        this.view.element.appendChild(div);

        return div;
    }

    private createMedia_(media: Media): Media {
        const isCanvas = media instanceof HTMLCanvasElement;
        const isImage = media instanceof HTMLImageElement;
        const isVideo = media instanceof HTMLVideoElement;

        if (isCanvas) return this.createCanvas_(media);
        if (isImage) return this.createImage_(media);
        if (isVideo) return this.createVideo_(media);

        return media;
    }

    private createCanvas_(canvas: HTMLCanvasElement): HTMLCanvasElement {
        this.mediaContainer.appendChild(canvas);

        canvas.classList.add(className('media'));
        canvas.classList.add(className('canvas'));

        if (this.height) canvas.classList.add('fixed-height');

        return canvas;
    }

    private createImage_(image: HTMLImageElement): HTMLImageElement {
        this.mediaContainer.appendChild(image);

        image.classList.add(className('media'));
        image.classList.add(className('video'));

        if (this.height) image.classList.add('fixed-height');

        return image;
    }

    private createVideo_(video: HTMLVideoElement): HTMLVideoElement {
        video.setAttribute('muted', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('playsinline', '');

        this.mediaContainer.appendChild(video);

        video.classList.add(className('media'));
        video.classList.add(className('video'));

        if (this.height) video.classList.add('fixed-height');

        return video;
    }
}
