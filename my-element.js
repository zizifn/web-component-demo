import { LitElement, css, html } from 'lit';

class MyElement extends LitElement {
    static styles = css`
    :host {
      display: block;
      padding: 16px;
      border: 2px solid #007acc;
      border-radius: 8px;
      margin: 16px 0;
      background: #f0f8ff;
    }
    
    .greeting {
      color: #007acc;
      font-size: 1.2em;
      font-weight: bold;
    }
  `;

    static properties = {
        name: { type: String }
    };

    constructor() {
        super();
        this.name = 'World';
    }

    render() {
        return html`
      <div class="greeting">
        Hello, ${this.name}! 🚀
      </div>
      <p>This is a Lit web component loaded via import map!</p>
    `;
    }
}

customElements.define('my-element', MyElement);
