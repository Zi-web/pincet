'use strict';
window.onload = function() {
        var link_form = document.querySelectorAll('.btn-popap');
        var popup_form = document.querySelector('.popap-wrapper');
        var close_form = document.querySelector('#closeform');
        var overlay_form = document.querySelector('.overlay');
        var index; var button;


for (index = 0; index < link_form.length; index++) {
    button = link_form[index];
    button.addEventListener('click', function (event) {
        popup_form.classList.add('show-form');
        popup_form.classList.remove('hidden-form');
        overlay_form.classList.add('show');
        event.preventDefault();
    });
    close_form.addEventListener('click', function (event){
        popup_form.classList.remove('show-form');
        popup_form.classList.add("hidden-form");
        overlay_form.classList.remove('show');
        event.preventDefault();
    });
};

  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
        if (popup_form.classList.contains("show-form")) {
        popup_form.classList.remove('show-form');
        popup_form.classList.add("hidden-form");
        overlay_form.classList.remove('show');
        event.preventDefault();
        }
    }
})

}


/*const overlay = document.querySelector('.overlay');
const popapWrapper = document.querySelector('.popap-wrapper');

document.getElementById("register-popap").onclick = function() {showForm()};
      function showForm() {
    overlay.classList.add("show");
    popapWrapper.classList.add("show-form");
    popapWrapper.classList.remove("hidden-form");
}

document.getElementById("closeform").onclick = function() {closeForm()};
      function closeForm() {
    overlay.classList.remove("show");
    popapWrapper.classList.remove("show-form");
    popapWrapper.classList.add("hidden-form");
}

window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {
            if (overlay.classList.contains('show')) {
                document.querySelector('.overlay').classList.remove("show");
    			document.querySelector('.popap-wrapper').classList.remove("show-form");
    			document.querySelector('.popap-wrapper').classList.add("hidden-form");
        }
    }
})*/