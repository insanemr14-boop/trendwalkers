// Navbar

    $(".navbar-toggler").click(function(){
        $("#mainNavigation").toggleClass("active");
    });

// Animate Aos

    AOS.init({
        duration: 1200,
    });

// Scroll Animation

    const lenis = new Lenis()

    function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)


     //CURSOR FUNCTIONALITY

     const cursor = document.querySelector(".cursor");
     const body = document.body;
     const toggleClass = "show-custom-cursor";

     function pointermoveHandler(e) {
         const target = e.target;
         if (
             e.target.closest(".hover-slide") &&
             window.matchMedia("(hover: hover)").matches
         ) {
             body.classList.add(toggleClass);
             cursor.style.setProperty("--cursor-x", `${e.clientX}px`);
             cursor.style.setProperty("--cursor-y", `${e.clientY}px`);
         } else {
             body.classList.remove(toggleClass);
         }
     }
     document.addEventListener("pointermove", pointermoveHandler);



    //  Custom Curssor

    const $bigBall = document.querySelector('.cursor__ball--big');
    const $smallBall = document.querySelector('.cursor__ball--small');
    const $hoverables = document.querySelectorAll('a');

    // Listeners
    document.body.addEventListener('mousemove', onMouseMove);
    for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    }

    // Move the cursor
    function onMouseMove(e) {
    TweenMax.to($bigBall, .4, {
        x: e.pageX - 15,
        y: e.pageY - 15 });

    TweenMax.to($smallBall, .1, {
        x: e.pageX - 5,
        y: e.pageY - 7 });

    }

    // Hover an element
    function onMouseHover() {
    TweenMax.to($bigBall, .3, {
        scale: 4 });

    }
    function onMouseHoverOut() {
    TweenMax.to($bigBall, .3, {
        scale: 1 });
    }


    var magnets = document.querySelectorAll('a')
    var strength = 50

    magnets.forEach( (magnet) => {
    magnet.addEventListener('mousemove', moveMagnet );
    magnet.addEventListener('mouseout', function(event) {
        TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
    } );
    });

    function moveMagnet(event) {
    var magnetButton = event.currentTarget
    var bounding = magnetButton.getBoundingClientRect()
    TweenMax.to( magnetButton, 1, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
        ease: Power4.easeOut
    })
    }
