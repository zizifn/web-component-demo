// CSS-in-JS Helper Functions
const createStyles = (color = 'black', theme = '') => {
    const baseStyles = {
        host: {
            display: 'inline-block',
            margin: '10px'
        },
        container: {
            padding: '15px 20px',
            border: '2px solid #007acc',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #f0f8ff, #e6f3ff)',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
        },
        greeting: {
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: color,
            margin: '0'
        },
        wave: {
            fontSize: '1.5em',
            animation: 'wave 2s infinite',
            display: 'inline-block',
            marginLeft: '10px'
        },
        timestamp: {
            fontSize: '0.8em',
            color: '#666',
            marginTop: '5px'
        }
    };

    // Apply theme variations
    if (theme === 'dark') {
        baseStyles.container.background = 'linear-gradient(135deg, #2d3748, #4a5568)';
        baseStyles.container.borderColor = '#63b3ed';
        baseStyles.container.color = 'white';
    } else if (theme === 'success') {
        baseStyles.container.background = 'linear-gradient(135deg, #f0fff4, #c6f6d5)';
        baseStyles.container.borderColor = '#48bb78';
    }

    return baseStyles;
};

const stylesToCSS = (styles) => {
    const convertObjectToCSS = (obj, selector = '') => {
        let css = '';

        if (selector) {
            css += `${selector} {\n`;
            Object.entries(obj).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    // Nested object - skip for now
                    return;
                }
                // Convert camelCase to kebab-case
                const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                css += `    ${cssProperty}: ${value};\n`;
            });
            css += '}\n\n';
        }

        return css;
    };

    let fullCSS = `
        :host {
            display: ${styles.host.display};
            margin: ${styles.host.margin};
        }
        
        .hello-container {
            padding: ${styles.container.padding};
            border: ${styles.container.border};
            border-radius: ${styles.container.borderRadius};
            background: ${styles.container.background};
            font-family: ${styles.container.fontFamily};
            text-align: ${styles.container.textAlign};
            transition: ${styles.container.transition};
            cursor: ${styles.container.cursor};
            ${styles.container.borderColor ? `border-color: ${styles.container.borderColor};` : ''}
            ${styles.container.color ? `color: ${styles.container.color};` : ''}
        }
        
        .hello-container:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0,122,204,0.3);
        }
        
        .greeting {
            font-size: ${styles.greeting.fontSize};
            font-weight: ${styles.greeting.fontWeight};
            color: ${styles.greeting.color};
            margin: ${styles.greeting.margin};
        }
        
        .wave {
            font-size: ${styles.wave.fontSize};
            animation: ${styles.wave.animation};
            display: ${styles.wave.display};
            margin-left: ${styles.wave.marginLeft};
        }
        
        @keyframes wave {
            0%, 50%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-10deg); }
        }
        
        .timestamp {
            font-size: ${styles.timestamp.fontSize};
            color: ${styles.timestamp.color};
            margin-top: ${styles.timestamp.marginTop};
        }
    `;

    return fullCSS;
};

// Hello World Web Component with CSS-in-JS
class HelloWorldCSSInJSComponent extends HTMLElement {
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

    render() {
        // Generate styles based on current properties
        const styles = createStyles(this.color, this.theme);
        const css = stylesToCSS(styles);

        this.shadowRoot.innerHTML = `
            <style>
                ${css}
            </style>
            
            <div class="hello-container">
                <p class="greeting">
                    Hello, ${this.name}!
                    <span class="wave">👋</span>
                </p>
                <div class="timestamp">
                    CSS-in-JS: ${new Date().toLocaleTimeString()}
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('.hello-container').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('hello-clicked', {
                detail: { name: this.name, timestamp: new Date() },
                bubbles: true
            }));
        });
    }
}

customElements.define('hello-world-css-in-js', HelloWorldCSSInJSComponent);
