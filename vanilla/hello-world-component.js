// Hello World Web Component
class HelloWorldComponent extends HTMLElement {
    constructor() {
        super();

        // Create shadow DOM for encapsulation
        this.attachShadow({ mode: 'open' });

        // Set up default values
        this.name = this.getAttribute('name') || 'World';
        this.color = this.getAttribute('color') || 'black';

        // Render the component
        this.render();
    }

    // Define which attributes to observe for changes
    static get observedAttributes() {
        return ['name', 'color'];
    }

    // Called when observed attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    // Render method to update the component's HTML
    render() {
        // Log scoping information
        console.log(`🔒 Rendering component with scoped styles for: ${this.name}`);
        console.log(`📦 Shadow root:`, this.shadowRoot);

        this.shadowRoot.innerHTML = `
            <style>
                /* These styles are SCOPED to this component only */
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
            </style>
            
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

        // Demonstrate scoping with console logs
        const scopedContainer = this.shadowRoot.querySelector('.hello-container');
        console.log(`✅ Scoped element found in ${this.name}:`, !!scopedContainer);

        // Add click event listener
        scopedContainer.addEventListener('click', () => {
            console.log(`🎯 Click even  t in scoped component: ${this.name}`);
            this.dispatchEvent(new CustomEvent('hello-clicked', {
                detail: { name: this.name, timestamp: new Date() },
                bubbles: true
            }));
        });
    }

    // Public method to update the greeting
    updateGreeting(newName) {
        this.setAttribute('name', newName);
    }

    // Public method to change color
    changeColor(newColor) {
        this.setAttribute('color', newColor);
    }
}

// Register the custom element
customElements.define('hello-world', HelloWorldComponent);

// Add global event listener to demonstrate custom events
document.addEventListener('hello-clicked', (event) => {
    console.log('Hello World component clicked!', event.detail);

    // Optional: Show an alert (you can remove this in production)
    alert(`Hello ${event.detail.name}! Component clicked at ${event.detail.timestamp.toLocaleTimeString()}`);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HelloWorldComponent;
}
