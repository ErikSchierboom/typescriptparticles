# Typescript partial

A small demo project that implements a very simple particle system using [TypeScript](http://www.typescriptlang.org/).

## Implementation
The application is implemented as a very simple HTML page. This page contains a canvas element to which particles are rendered. The actual particle system is implemented in TypeScript. The main advantage of using TypeScript is that it allows you to program in a way that is very familiar to other object-oriented languages (such as C# and Java). You can thus define interfaces, classes, getters, setters and much more. Another big advantage is that you get compile-time type-safety, which is great for catching errors early.

### Structure

The main entry point of the application is the [Scripts/app.js] file, which is generated from [Scripts/app.ts](Scripts/app.ts). Here we setup the application by creating an instance of the `AppViewModel` class, which we then use to bind to [Knockout](http://knockoutjs.com/) when the document is ready:

    $(document).ready(function () {

        // Create the view model and apply its bindings to knockout
        var viewModel = new AppViewModel();
        ko.applyBindings(viewModel);

    });

The `AppViewModel` class will create a `Particles` instance in its constructor. This `Particles` instance will be rendering the individual particles to the screen. This rendering to the screen is done by rendering to a `HTMLCanvasElement`, which is asked for a 2D rendering context:

        var canvas = <HTMLCanvasElement>$('#particlesCanvas')[0]; // Do type-casting of the return value
        var ctx = canvas.getContext('2d');

After the rendering context has been requested and the particles have been created, we start the image loop by requesting the animation frame and calling the `draw()` method of the `Particles` instance.

### Modules

The application consists of several TypeScript files, which are defined as [AMD modules](http://en.wikipedia.org/wiki/Asynchronous_module_definition). Once a module is defined as an AMD module, it can easily be used by any other module. This allowed us to separate functionality in different files, just like you would do in other object-oriented languages. To enable modules to be reference other AMD modules, you need to include the [RequireJS](http://requirejs.org/) library in your project. Including RequireJS is done in our **index.html** file as follows:

    <script data-main="Scripts/app" type="text/javascript" src="Scripts/libs/require.min.js"></script>

You see that a **data-main** attribute is specified. This attribute is used by RequireJS to determine the entry point of our application (in our case the [Scripts/app.js](Scripts/app.js) file). This TypeScript files includes other modules using the following, simple code:

    import Drawing = module('drawing');
    import Particles = module('particles');
    import Particle = module('particle');

The names of the modules are the names of the TypeScript files, so the **'drawing'** module refers to the code defined in the **drawing.ts** file. In that file, the `Drawable` class is defined as follows:

    export class Drawable implements IDrawable {
       ...
    }

Due to the class being prefixed with the `export` keyword, it will be available when other modules import the _drawing_ module. If you use the correct module export functionality in TypeScript, it will output the following code when compiling the `Drawable` class:

    define(["require", "exports"], function(require, exports) {
        var Drawable = (function () {
            function Drawable(ctx) {
                this.ctx = ctx;
            }
            Drawable.prototype.draw = function () {
            };
            return Drawable;
        })();
        exports.Drawable = Drawable;    
    })

One can see that the code starts with a call to the `define` function, which is part of the RequireJS library. Now that the `Drawable` class is correctly registered as an AMD module, the aforementioned `import Drawing = module('drawing');` code will return the drawing module containing the `Drawable` class. After import the the _drawing_ module, one can refer to the `Drawable` class as follows: `Drawing.Drawable`.

### Rendering
As said we use the canvas for rendering and request an animation frame to do periodic rendering. One problem is that the default method, `requestAnimationFrame`, is not available in all browsers. Erik Moller from Opera created a [simple piece of code](http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating) that adds a simulated version of requestAnimationFrame for browsers that don't support it. We include this code in our application in the [Scripts/animation.js](Scripts/animation.js) file.

## Libraries
This project uses the following libraries:

* [TypeScript](http://www.typescriptlang.org/): for writing our JavaScript code in.
* [jQuery](http://jquery.com/): for retrieving elements and its `document.ready()` method.
* [Knockout](http://knockoutjs.com/): for easy data-binding and event handling.
* [RequireJS](http://requirejs.org/): for the loading of our code in different modules.

## License
[Apache License 2.0](LICENSE.md)