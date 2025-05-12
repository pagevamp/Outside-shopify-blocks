const initPlates = () => {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const devicePixelRatio = isAndroid
    ? Math.min(window.devicePixelRatio, 2)
    : window.devicePixelRatio || 1;

  const matterContainer = document.querySelector('#matter-plate-canvas');
  let plateStack = null;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.left = 0;
  canvas.style.bottom = 0;
  canvas.width = matterContainer.clientWidth * devicePixelRatio;
  canvas.height = matterContainer.clientHeight * devicePixelRatio;
  canvas.style.width = `${matterContainer.clientWidth}px`;
  canvas.style.height = `${matterContainer.clientHeight}px`;
  matterContainer.appendChild(canvas);

  // module aliases
  const {
    Engine,
    Render,
    Runner,
    Body,
    Bodies,
    Vector,
    Vertices,
    Composites,
    Composite,
    Mouse,
    MouseConstraint,
    Events,
  } = Matter;

  // create an engine
  let engine = Engine.create();

  // create a renderer
  let render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      background: 'rgba(0,0,0,0)',
      wireframes: false,
      width: matterContainer.clientWidth,
      height: matterContainer.clientHeight,
      pixelRatio: devicePixelRatio,
    },
  });

  const getRandomAngle = () => {
    const minMaxAngle = 20;
    const type = Math.random() < 0.5 ? -1 : 1;
    return (Math.random() * 10 - minMaxAngle) * type * (Math.PI / 180);
  };

  const createPlates = (start_height = -600, no_of_Plate = 5) => {
    const width_of_palte = 241;
    const no_of_Rows = Math.floor(window.innerWidth / width_of_palte) + 1;
    const height_of_plate = 60;
    // const column_gap =
    //   (window.innerWidth + 300 - width_of_palte * no_of_Rows) / no_of_Rows;
    //   const column_gap = 0; // Previous
    const column_gap = 20;

    const stack = Composites.stack(
      -100,
      start_height,
      no_of_Rows,
      no_of_Plate,
      column_gap,
      0,
      (x, y) => {
        const tarpezoid = Vertices.fromPath(
          'M0 0 L241 0 L212.08 27.6 L36.15 27 Z',
        );

        return Bodies.fromVertices(x, y, tarpezoid, {
          isStatic: false,
          angle: getRandomAngle(),
          render: {
            sprite: {
              texture:
                'https://cdn.shopify.com/s/files/1/0903/4258/8722/files/plate.webp?v=1738581916', // Replace with your image path
              xScale: 0.55,
              yScale: 0.55,
              yOffset: 0.1,
            },
          },
          friction: 0.4,
          frictionAir: 0.01,
          restitution: 0.1,
          density: 1,
        });
        //   Old
        //   return Bodies.rectangle(x, y, width_of_palte, height_of_plate / 2, {
        //     isStatic: false,
        //     angle: getRandomAngle(),
        //     render: {
        //       sprite: {
        //         texture:
        //           'https://cdn.shopify.com/s/files/1/0903/4258/8722/files/plate.webp?v=1738581916', // Replace with your image path
        //         xScale: 0.5,
        //         yScale: 0.5,
        //         yOffset: 0.1,
        //       },
        //     },
        //     friction: 0.4,
        //     frictionAir: 0.01,
        //     restitution: 0.1,
        //     density: 1,
        //   });
      },
    );

    plateStack = Composite.allBodies(stack);
    plateStack.sort((a, b) => b.position.y - a.position.y);

    Composite.add(engine.world, plateStack);
  };

  // create ground
  let ground = Bodies.rectangle(
    matterContainer.clientWidth / 2 - 241,
    matterContainer.clientHeight + 50,
    matterContainer.clientWidth * 2 + 400,
    100,
    {
      isStatic: true,
      render: { fillStyle: 'rgba(0, 0, 0,0)' },
      angle: '-0.013',
    },
  );

  let leftWall = Bodies.rectangle(
    -241,
    matterContainer.clientHeight / 2,
    241,
    matterContainer.clientHeight * 5,
    {
      isStatic: true,
      render: { fillStyle: 'rgba(0, 0, 0,0)' },
    },
  );

  let rightWall = Bodies.rectangle(
    matterContainer.clientWidth + 241,
    matterContainer.clientHeight / 2,
    40,
    matterContainer.clientHeight * 5,
    { isStatic: true, render: { fillStyle: 'rgba(0, 0, 0,0)' } },
  );

  const world = engine.world;
  // add all of the bodies to the world
  Composite.add(world, [ground, leftWall, rightWall]);

  // run the renderer
  Render.run(render);

  // create runner
  let runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);

  const setupMouse = () => {
    let mouse = Mouse.create(render.canvas);
    let mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(world, mouseConstraint);

    // allow scroll through the canvas
    mouseConstraint.mouse.element.removeEventListener(
      'mousewheel',
      mouseConstraint.mouse.mousewheel,
    );
    mouseConstraint.mouse.element.removeEventListener(
      'wheel',
      mouseConstraint.mouse.mousewheel,
    );

    mouseConstraint.mouse.element.removeEventListener(
      'DOMMouseScroll',
      mouseConstraint.mouse.mousewheel,
    );

    // allow scroll through the canvas on mobile
    mouseConstraint.mouse.element.removeEventListener(
      'touchstart',
      mouseConstraint.mouse.mousedown,
    );
    mouseConstraint.mouse.element.removeEventListener(
      'touchmove',
      mouseConstraint.mouse.mousemove,
    );
    mouseConstraint.mouse.element.removeEventListener(
      'touchend',
      mouseConstraint.mouse.mouseup,
    );

    mouse.mousedown = function (event) {
      var position = Mouse._getRelativeMousePosition(
          event,
          mouse.element,
          mouse.pixelRatio,
        ),
        touches = event.changedTouches;

      mouse.button = touches ? 0 : event.button;
      mouse.absolute.x = position.x;
      mouse.absolute.y = position.y;
      mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
      mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
      mouse.mousedownPosition.x = mouse.position.x;
      mouse.mousedownPosition.y = mouse.position.y;
      mouse.sourceEvents.mousedown = event;
    };

    mouseConstraint.mouse.element.addEventListener(
      'touchstart',
      mouseConstraint.mouse.mousedown,
      { passive: true },
    );
    mouseConstraint.mouse.element.addEventListener('touchmove', e => {
      if (mouseConstraint.body) {
        mouseConstraint.mouse.mousemove(e);
      }
    });
    mouseConstraint.mouse.element.addEventListener('touchend', e => {
      if (mouseConstraint.body) {
        mouseConstraint.mouse.mouseup(e);
      }
    });

    // Change cursor when hovering over food items
    Events.on(mouseConstraint, 'mousemove', event => {
      const mousePosition = mouse.position;
      const hoveredBodies = Composite.allBodies(world).filter(body =>
        Matter.Bounds.contains(body.bounds, mousePosition),
      );

      canvas.style.cursor = hoveredBodies.length > 0 ? 'grab' : 'default';
    });
  };

  const clearPlates = () => {
    if (plateStack) {
      Composite.remove(world, plateStack);
      plateStack = null;
    }
  };
  let prevWidth = window.innerWidth;

  const handleResize = matterContainer => {
    // set canvas size to new values
    render.canvas.width = matterContainer.clientWidth * devicePixelRatio;
    render.canvas.height = matterContainer.clientHeight * devicePixelRatio;
    render.canvas.style.width = `${matterContainer.clientWidth}px`;
    render.canvas.style.height = `${matterContainer.clientHeight}px`;

    let width = window.innerWidth;

    Body.setPosition(
      ground,
      Vector.create(
        matterContainer.clientWidth / 2 - 241,
        matterContainer.clientHeight + 50,
        matterContainer.clientHeight + 50,
        matterContainer.clientWidth * 2 + 400,
        100,
        {
          isStatic: true,
          render: { fillStyle: 'rgba(0, 0, 0,0.5)' },
          angle: '-0.013',
        },
      ),
    );
    Body.setPosition(
      leftWall,
      Vector.create(-241, matterContainer.clientHeight / 2),
    );
    Body.setPosition(
      rightWall,
      Vector.create(
        matterContainer.clientWidth + 241,
        matterContainer.clientHeight / 2,
      ),
    );
    const no_of_Plate = 5;
    let startPlateHeight = matterContainer.clientHeight - 60 * no_of_Plate;
    clearPlates();
    createPlates(startPlateHeight);
  };

  setupMouse();
  createPlates();

  if(window.platform != 'iOS') {
    window.addEventListener('resize', () => handleResize(matterContainer));
  }

  // window.addEventListener('resize', () => handleResize(matterContainer));
};

// Create observer wrapper
const observePlatesSection = () => {
  const platesSection = document.querySelector('#matter-plate-canvas');
  if (!platesSection) return;

  let initialized = false;
  let cleanup = null;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !initialized) {
          cleanup = initPlates();
          initialized = true;
          observer.unobserve(platesSection);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  observer.observe(platesSection);
};

document.addEventListener('DOMContentLoaded', observePlatesSection);
