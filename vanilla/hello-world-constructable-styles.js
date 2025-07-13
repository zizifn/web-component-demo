// Hello World Web Component with Constructable Stylesheets
class HelloWorldConstructableComponent extends HTMLElement {
    constructor() {
        super();

        // Create shadow DOM
        this.attachShadow({ mode: 'open' });

        // Set up default values
        this.name = this.getAttribute('name') || 'World';
        this.color = this.getAttribute('color') || 'black';

        // Create constructable stylesheet
        this.stylesheet = new CSSStyleSheet();

        // Render the component
        this.render();
    }

    static get observedAttributes() {
        return ['name', 'color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    // Method to update styles dynamically
    updateStyles() {
        const css = `
            :host {
                display: inline-block;
                margin: 10px;
            }
            
            .hello-container {
                padding: 15px 20px;
                border: 2px solid #007acc;
                border-radius: 8px;
                background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
                font-family: 'Arial', sans-serif;
                text-align: center;
                transition: transform 0.2s ease;
                cursor: pointer;
            }
            
            .hello-container:hover {
                transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(0,122,204,0.3);
            }
            
            .greeting {
                font-size: 1.2em;
                font-weight: bold;
                color: ${this.color};
                margin: 0;
            }
            
            .wave {
                font-size: 1.5em;
                animation: wave 2s infinite;
                display: inline-block;
                margin-left: 10px;
            }
            
            @keyframes wave {
                0%, 50%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(20deg); }
                75% { transform: rotate(-10deg); }
            }
            
            .timestamp {
                font-size: 0.8em;
                color: #666;
                margin-top: 5px;
            }
        `;

        // Replace the stylesheet content
        this.stylesheet.replaceSync(css);

        // Adopt the stylesheet
        this.shadowRoot.adoptedStyleSheets = [this.stylesheet];
    }

    render() {
        // Update styles first
        this.updateStyles();

        // Set innerHTML without style tag
        this.shadowRoot.innerHTML = `
            <div class="hello-container">
                <p class="greeting">
                    Hello, ${this.name}!
                    <span class="wave">👋</span>
                </p>
                <div class="timestamp">
                    Created at: ${new Date().toLocaleTimeString()}
                </div>
            </div>
        `;

        // Add event listener
        this.shadowRoot.querySelector('.hello-container').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('hello-clicked', {
                detail: { name: this.name, timestamp: new Date() },
                bubbles: true
            }));
        });
    }
}

customElements.define('hello-world-constructable', HelloWorldConstructableComponent);
