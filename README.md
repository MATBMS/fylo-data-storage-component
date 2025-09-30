# Frontend Mentor - Fylo data storage component solution

This is a solution to the [Fylo data storage component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/fylo-data-storage-component-1dZPRbV5n). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Responsive design](#responsive-design)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See the storage usage bar animate from 0 GB to the current value on load
- Have motion reduced if the user prefers reduced motion (the animation is skipped)

### Screenshot

![Screenshot preview](./images/preview.jpg)

### Links

- Solution URL: [Github Repo](https://github.com/MATBMS/fylo-data-storage-component)
- Live Site URL: [Live Site](https://matbms-fylo-data-storage-component.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JavaScript (for the loading animation)

### What I learned

- Coordinating a lightweight UI animation using `requestAnimationFrame` with an ease-out curve while keeping the DOM updates minimal.
- Respecting user preferences with `prefers-reduced-motion` to skip non-essential animations and immediately present final values.
- Using custom properties to drive visual details (e.g., positioning the knob along the progress bar) and keeping styles declarative.

## Responsive design

Key breakpoints used in this project:

```css
/* SMALL DESKTOP */
@media (max-width: 950px) {
}

/* TABLET */
@media (max-width: 768px) {
}

/* SMALL TABLET (card width) */
@media (max-width: 500px) {
}

/* MOBILE */
@media (max-width: 375px) {
}
```

### Extra features

- 5s loading animation increases the used storage from 0 GB to the target value and moves the knob along the bar.
- “You’ve used X GB” updates in real time during the animation.
- The “GB Left” bubble remains hidden during the animation and fades in once complete with the correct remaining value.
- If `prefers-reduced-motion: reduce` is detected, the animation is skipped and final values are shown immediately.
