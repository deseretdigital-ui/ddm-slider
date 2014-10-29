# Slider

Just a simple jquery plugin that hides the details of working with [flexslider](http://www.woothemes.com/flexslider/)
so that you can get a photo slider that looks and works right with one line of javascript.

Please note, There is not currently a way to handle sliders with no slides. Please add your own no slide image as a slide
to handle this issue yourselves.


## Bower

We aren't ready to register this in the bower registry but you can still install with bower like so:

```shell
bower install --save git@github.com:deseretdigital-ui/ddm-slider.git#<commit or branch>
```


## Demo

See [demo](http://creatives.deseretdigital.com/ksl-assets/build/static/components/slider/index.html)


## Setup

Attach files:

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<link rel="stylesheet" href="bower_components/ddm-slider/slider.css" />
<script src="bower_components/ddm-slider/slider.js"></script>
```

Html structure:

```html
  <div class="slider">
    <ul class="slides">
      <li><img src="http://placehold.it/200x300&amp;text=1" /></li>
      <li><img src="http://placehold.it/400x400&amp;text=2" /></li>
      <li><img src="http://placehold.it/600x300&amp;text=3" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=4" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=5" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=6" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=7" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=8" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=9" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=10" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=11" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=12" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=13" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=14" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=15" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=16" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=17" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=18" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=19" /></li>
      <li><img src="http://placehold.it/400x300&amp;text=20" /></li>
    </ul>
  </div>
```

Initialize with javascript:

```javascript
$(function() {
  $('.slider').slider();
});
```

The plugin will generate thumbs and insert them inside the slider element.


## Custom Controls

Adding custom controls using api object is easy:

```javascript
  // setup controls
  $('.slider .controls .prev').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.slider').slider().prev();
  });

  $('.slider .controls .next').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.slider').slider().next();
  });
```


## Youtube Videos

Youtube videos are supported. All you need is a `div.youtube` placeholder with a `data-video-id` attribute:

```html
  <div class="slider">
    <ul class="slides">
      <!-- ... more slides ... -->
      <li><div class="youtube" data-video-id="PpccpglnNf0"></div></li>
      <!-- ... more slides ... -->
    </ul>
  </div>
```

The slider will replace this element with an `<iframe>` for the video and an `<img>` for the thumb,
using the `data-video-id` attribute to build the urls.


## Intiial Styles

If your page is crufty and takes a long time to load all the assets and your slider isn't initialized
immediately, you can add the `slider-uninitialized` modifier class to apply some initial styling to the slider
element:

```html
<div class="slider slider-uninitialized">
  <ul class="slides">
    <!-- ... slides ... -->
  </ul>
</div>
```


## Captions

Just add a `<span class="caption">` to a slide element:

```html
  <div class="slider">
    <ul class="slides">
      <!-- ... more slides ... -->
      <li>
        <img src="http://placehold.it/200x300&amp;text=1" />
        <span class="caption">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
      </li>
      <!-- ... more slides ... -->
    </ul>
  </div>
```

If [dotdotdot](http://dotdotdot.frebsite.nl/) is included on the page it will be executed on caption elements by default.



## Conflicts with javascript libraries

If you find a conflict with another javascript library, there is an alternative. Instead of this:

```javascript
$(function() {
  $('.slider').slider();
});
```

Do this:

```javascript
$(function() {
  ksl.assets.slider($('.slider'));
});
```
