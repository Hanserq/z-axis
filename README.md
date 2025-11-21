# Z-Axis UI Library

[![npm version](https://badge.fury.io/js/z-axis-hanser.svg)](https://badge.fury.io/js/z-axis-hanser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, high-performance 3D physics engine for the web. It turns flat HTML elements into interactive, holographic objects that respond to mouse movement and mobile gyroscope tilt.

[**✨ Launch Live Studio Demo**](https://hanserq.github.io/z-axis)

---

## Features

* **Physics-Based Motion:** Choose between "Heavy" (weighted inertia) or "Instant" (HUD-style) movement.
* **Holographic Glare:** Auto-generated light reflections that react to the angle of the card.
* **Mobile Gyroscope:** Uses device orientation sensors to tilt cards based on how you hold your phone.
* **3D Parallax Depth:** Automatically separates text and images into floating layers.
* **Zero Dependencies:** Pure Vanilla JS. Works with React, Vue, Angular, or plain HTML.

---

## Installation

Install via NPM:

```bash
npm install z-axis-hanser
```
---

## Usage 

1. The "Plug & Play" Method (Recommended)

Just add data-z attributes to your HTML. The library handles the rest.
```
<!-- 1. Create your card -->
<div class="card" 
     data-z 
     data-z-force="30" 
     data-z-mode="heavy"
     data-z-glare>
     
    <!-- 2. Add depth to children -->
    <h1 data-z-depth="40px">I Float!</h1>
    <p data-z-depth="20px">I float less.</p>
</div>

<!-- 3. Initialize in your script -->
<script type="module">
    import Z from 'z-axis-hanser';
    
    // Scans the DOM and activates all [data-z] elements
    Z.init();
</script>
```
2. The "Manual" Method (For React/Vue)

If you are building components dynamically, you can bind specific elements.
```
import Z from 'z-axis-hanser';

const myElement = document.querySelector('#my-card');

// Bind manually
Z.bind(myElement, {
    force: 30,        // Tilt limit in degrees
    mode: 'heavy',    // 'heavy' or 'instant'
    glare: true,      // Enable holographic shine
    reverse: false    // Reverse tilt direction
});
```
---

## Mobile Support (Gyroscope)

Modern iOS versions require user permission to access motion sensors. You must trigger this with a user interaction (like a button click).

```
// Add a button to your UI
document.getElementById('btn-enable-gyro').addEventListener('click', () => {
    Z.mobile(); // Requests permission and activates tilt
});
```
---

## API Reference 

HTML Attributes

| Attribute | Value | Description |
| :--- | :--- | :--- |
| `data-z` | (Empty) | **Required.** Marks the container as a 3D element. |
| `data-z-force` | `Number` | Max tilt angle in degrees (Default: `20`). |
| `data-z-mode` | `heavy` \| `instant` | Physics style. `heavy` has inertia; `instant` is 1:1 tracking. |
| `data-z-glare` | (Empty) | Adds the holographic reflection layer. |
| `data-z-reverse`| (Empty) | Inverts the tilt axis. |
| `data-z-depth` | `20px` | **Child Element.** Distance the child floats above the card. |


---

## JavaScript Options

When using Z.bind(el, options):
```
{
    force: 30,       // Number
    mode: 'heavy',   // String
    glare: true,     // Boolean
    reverse: false   // Boolean
}
```
---

## Using the Studio Website

The repository includes a **Live Studio** (`index.html`) to help you design cards visually.

1.  **Clone the repo:** `git clone https://github.com/hanserq/z-axis.git`
2.  **Install:** `npm install`
3.  **Run:** `npm run dev`
4.  **Design:** Use the sliders to adjust physics, copy the generated HTML code, and paste it into your project.
   
---
## License
MIT © Hanser
