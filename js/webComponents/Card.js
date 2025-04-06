class CardComponent extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <div class="frame__content">
                <slot></slot>
            </div>
        `;
    }

    setStyle({ transform, opacity }) {

        if (transform !== undefined) this.style.transform = transform;
        if (opacity !== undefined) this.style.opacity = opacity;
    }
}

customElements.define('card-component', CardComponent);