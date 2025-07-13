// Hello World Web Component with External CSS
class HelloWorldExternalComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.name = this.getAttribute('name') || 'World';
        this.color = this.getAttribute('color') || 'black';
        this.theme = this.getAttribute('theme') || '';

        this.render();
    }

    static get observedAttributes() {
        return ['name', 'color', 'theme'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    async loadExternalCSS() {
        // Method 1: Using fetch to load CSS
        try {
            const response = await fetch('./component-styles.css');
            const css = await response.text();
            return css;
        } catch (error) {
            console.warn('Could not load external CSS:', error);
            return '';
        }
    }

    async render() {
        // Load external CSS
        const externalCSS = await this.loadExternalCSS();

        // Create link element for external CSS (Alternative method)
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', './component-styles.css');

        this.shadowRoot.innerHTML = `
            <style>
                /* Inline styles for dynamic color */
                .greeting {
                    color: ${this.color};
                }
                
                /* Loaded external CSS */
                ${externalCSS}
            </style>
            
            <div class="hello-container ${this.theme ? 'theme-' + this.theme : ''}">
                <p class="greeting">
                    Hello, ${this.name}!
                    <span class="wave">👋</span>
                </p>
                <div class="timestamp">
                    External CSS: ${new Date().toLocaleTimeString()}
                </div>
            </div>
        `;

        // Alternative: Append link element (less reliable in Shadow DOM)
        // this.shadowRoot.appendChild(linkElem);

        this.shadowRoot.querySelector('.hello-container').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('hello-clicked', {
                detail: { name: this.name, timestamp: new Date() },
                bubbles: true
            }));
        });
    }
}

customElements.define('hello-world-external', HelloWorldExternalComponent);
