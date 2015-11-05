# Hover On Scroll
Do you have a website that uses some type of hover effect on elements? Chances are they don't operate when on mobile since there is no mouse to hover with. Hover on Scroll was written to help bring that functionality to mobiles with ease. Watch a [demo of the product](http://www.bencomeau.com/projects/hoverOnScroll/hos.html) to better understand what it does!

## Install
- Download the source file(s)
    - Use the `hos.min.js` for production sites
- Add `<script src="path-to-file/hos.js"></script>` or `<script src="path-to-file/hos.min.js"></script>` to your page

## Usage
- Attach the plugin to any desired element that would normally have a `hover` or `mouseover` event
```
$(function(){
	$('.some-element').hos(); // Will attach to all matching objects
});
```
- You can pass along custom settings the standard jQuery way
```
$('.some-element').hos({
    small: 768, // Define the "up to" screen size should show the hover effect
    showAt: 100, // How many pixel of the element should be visible before we show the effect (from bottom)
    hideAt: 250, // How many pixels from the top of the screen to the element should there be before we hide the effect
    applyTo: ".caption", // Define which element to apply the hovering affect to
    toggleClass: "noOpacity", // If desired, pass a class that should be toggled (see options below for details)
    opacity: .9 // If your hover effect uses opacity to show and hide on hover, you can specify the opacity here
});
```

## Features
- Very lightweight (1.26 KB compressed)
- Can be used with any JavaScript libraries without conflict
	- Protects `$` variable by using Immediately Invoked Function Expression
- Easily adjusted to fit project quickly
	- When calling plugin pass along custom options to override default behavior
- Amazingly documented with comments throughout the non-minified version
    - No joke, each step is explained to help walk through any questions that might come up