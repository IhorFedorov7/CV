export class SmoothScroll {
    constructor(options = {}) {
        const {
            zSpacing = -1000,
            frames,
            ease = 0.12,
            speed = 2.5
        } = options;

        this.zSpacing = zSpacing;
        this.frames = frames || Array.from(document.getElementsByTagName('card-component'));
        this.defaultEase = ease;
        this.ease = ease;
        this.speed = speed;

        
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        const applyPRM = (matches) => {
            this.ease = matches ? 1 : this.defaultEase;
        }

        applyPRM(mql.matches);
        mql.addEventListener?.('change', (e) => applyPRM(e.matches));

        this.targetScroll = window.scrollY;
        this.smoothedScroll = this.targetScroll;

        this.animate = this.animate.bind(this);

        window.addEventListener('scroll', () => {
            
            this.targetScroll = window.scrollY;
        }, { passive: true });

        this.animate();
    }

    animate() {
        this.smoothedScroll += (this.targetScroll - this.smoothedScroll) * this.ease;
        
        const scrollTop = this.smoothedScroll;

        this.frames.forEach((frame, i) => {
            const z = i * this.zSpacing + scrollTop * this.speed + this.zSpacing;
            const opacity = z < Math.abs(this.zSpacing) / 1.8 ? 1 : 0;

            if (typeof frame.setStyle === 'function') {
                frame.setStyle({
                    transform: `translateZ(${z}px)`,
                    opacity: i !== this.frames.length - 1 ? opacity : 1,
                });
            }
        });

        requestAnimationFrame(this.animate);
    }
}