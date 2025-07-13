# Web Component Hello World Demo

This repository contains a simple "Hello World" web component demonstration that showcases the fundamentals of creating custom HTML elements using Web Components.

## Features

- **Custom HTML Element**: `<hello-world>` tag that can be used like any HTML element
- **Shadow DOM**: Encapsulated styling and structure
- **Reactive Attributes**: Components update when attributes change
- **Custom Events**: Components emit events when interacted with
- **Hover Effects**: Interactive styling with CSS animations
- **Customizable Properties**: Name and color can be customized via attributes

## Files

- `index.html` - Demo page showcasing the web component
- `hello-world-component.js` - The web component implementation

## Usage

### Basic Usage

```html
<hello-world></hello-world>
```

### With Custom Name

```html
<hello-world name="Alice"></hello-world>
```

### With Custom Name and Color

```html
<hello-world name="Bob" color="blue"></hello-world>
```

## Running the Demo

1. Clone or download this repository
2. Open `index.html` in a web browser
3. You should see multiple examples of the Hello World component

## Web Component Features Demonstrated

### 1. Custom Elements

The component is defined as a class extending `HTMLElement` and registered with `customElements.define()`.

### 2. Shadow DOM

The component uses Shadow DOM for style and markup encapsulation.

### 3. Observed Attributes

The component responds to changes in `name` and `color` attributes.

### 4. Lifecycle Callbacks

- `constructor()` - Initial setup
- `attributeChangedCallback()` - Responds to attribute changes

### 5. Custom Events

Clicking on a component dispatches a custom `hello-clicked` event.

### 6. CSS Animations

The wave emoji has a CSS animation, and the component has hover effects.

## Browser Support

This demo uses modern Web Components APIs and works in:

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Learning Resources

- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [web.dev Custom Elements](https://web.dev/custom-elements-v1/)
- [Web Components Specifications](https://www.webcomponents.org/specs)

## License

This project is open source and available under the [MIT License](LICENSE).
