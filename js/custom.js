// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

function validateForm() {
    // Reset previous error messages
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.textContent = '');

    let isValid = true;

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name === "") {
        document.getElementById('name-error').textContent = "Name is required.";
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === "") {
        document.getElementById('email-error').textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    const phonePattern = /^[0-9]{10}$/; // Basic validation for 10-digit phone number
    if (phone === "") {
        document.getElementById('phone-error').textContent = "Phone number is required.";
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        document.getElementById('phone-error').textContent = "Please enter a valid 10-digit phone number.";
        isValid = false;
    }

    // Message validation
    const message = document.getElementById('message').value.trim();
    if (message === "") {
        document.getElementById('message-error').textContent = "Message is required.";
        isValid = false;
    }

    if (isValid) {
        sendEmail(name, email, phone, message);
    }

    return false; // Prevent form submission if validation fails
}

function sendEmail(name, email, phone, message) {
    // EmailJS setup (replace with your actual EmailJS IDs)
    const serviceID = "service_ddo5bh7";
    const templateID = "template_5pf9ann";
    const userID = "6qtkiaZFQ5Y3P-hvg";

    // Prepare the email template data
    const templateParams = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
        .then(function(response) {
            console.log("Success", response);
            // Show success message on successful email send
            document.getElementById('success').style.display = 'block';
            document.getElementById('error').style.display = 'none';
            // Clear form after successful submission
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log("Failed", error);
            // Show error message on failure
            document.getElementById('error').style.display = 'block';
            document.getElementById('success').style.display = 'none';
        });
}




$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    //animatedModal
    // $("#cbzero,#SABC,#AllianPay,#Howzu,#JoyBid,#JoySale").animatedModal();
    $("#animatedModalSABC").animatedModalSABC();
    $("animatedModalcbzero").animatedModalSABC()

    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });





});