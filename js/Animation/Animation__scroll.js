export class SmoothScroll {
    constructor(options = {}) {
        const {
          zSpacing = -1000,
          frames,
          ticking = false,
        } = options;
    
        this.zSpacing = zSpacing;
        this.lastPos = zSpacing / 5;
        this.frames = frames || Array.from(document.getElementsByTagName('card-component'));
        this.zVals = this.frames.map((_, i) => i * this.zSpacing + this.zSpacing);
        this.ticking = ticking;
  
        this.smoothScroll = this.smoothScroll.bind(this);
  
        window.addEventListener('scroll', () => {
            if (!this.ticking) {

                window.requestAnimationFrame(this.smoothScroll);
                this.ticking = true;
            }
        });

        this.smoothScroll();
    }
  
    smoothScroll() {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        const delta = this.lastPos - top;
        this.lastPos = top;
    
        this.frames.forEach((frame, i) => {
            this.zVals[i] += delta * -5;
            
            const transform = `translateZ(${this.zVals[i]}px)`;
            const opacity = this.zVals[i] < Math.abs(this.zSpacing) / 1.8 ? 1 : 0;
    
            if (typeof frame.setStyle === 'function') {
                frame.setStyle({
                    transform,
                    opacity: i !== this.frames.length - 1 ? opacity : 1,
                });
            }
        });
    
        this.ticking = false;
    }
}