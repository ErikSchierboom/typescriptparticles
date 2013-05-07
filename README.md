# Typescript partial

A small demo project that implements a very simple particle system using [TypeScript](http://www.typescriptlang.org/).

## Implementation
The application is implemented as a very simple HTML page. The actual particle system is implemented in the [particles.ts](Scripts/particles.ts) file. The `Particle` class defines a single particle, which has a coordinate, a direction of movement and a color. The only functionality it offers is that it can render itself to a rendering context using its `draw()` method. The `Particles` class is nothing more than a collection of particles, which can all be rendered at once using a `draw()` method. 

We see that both classes have the same method that has the same purpose. Therefore, we have created an interface `IDrawable`:

    interface IDrawable {
        draw();
    }

We also provided a default implementation of this interface:

    class Drawable implements IDrawable {
        constructor(public ctx: CanvasRenderingContext2D) { }
        draw() { }
    }

Although this class doesn't do much, it serves as the base for the `Particle` and `Particles` classes. This class _does_ do something though. If you look at its constructor you see



## License
[Apache License 2.0](LICENSE.md)