export class SmoothScroll {
    constructor(options = {}) {
        const {
            zSpacing = -1000,
            frames
        } = options;

        this.zSpacing = zSpacing;
        this.frames = frames || Array.from(document.getElementsByTagName('card-component'));

        this.zTargets = this.frames.map((_, i) => i * this.zSpacing + this.zSpacing);
        this.zCurrent = [...this.zTargets];

        this.lastScroll = window.scrollY;

        this.animate = this.animate.bind(this);

        window.addEventListener('scroll', () => {
            
            this.lastScroll = window.scrollY;
        }, { passive: true });

        requestAnimationFrame(this.animate);
    }

    animate() {
        const scrollTop = this.lastScroll;

        this.frames.forEach((frame, i) => {
            const targetZ = i * this.zSpacing + scrollTop * 2.5 + this.zSpacing;
            this.zTargets[i] = targetZ;

            this.zCurrent[i] += (this.zTargets[i] - this.zCurrent[i]) * 0.1;

            const transform = `translateZ(${this.zCurrent[i]}px)`;
            const opacity = this.zCurrent[i] < Math.abs(this.zSpacing) / 1.8 ? 1 : 0;

            if (typeof frame.setStyle === 'function') {
                frame.setStyle({
                    transform,
                    opacity: i !== this.frames.length - 1 ? opacity : 1,
                });
            }
        });

        requestAnimationFrame(this.animate);
    }
}