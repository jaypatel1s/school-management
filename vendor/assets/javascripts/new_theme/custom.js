// Mobile Sidebar
document.addEventListener('DOMContentLoaded', function () {
  var menuToggle = document.getElementById('menu-toggle');
  var sideMenu = document.getElementById('mobile-side-menu');

  menuToggle.addEventListener('click', function () {
    if (sideMenu.style.left === '0px') {
      sideMenu.style.left = '-300px';
    } else {
      sideMenu.style.left = '0px';
    }
  });
});

// Inquiry form
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('/inquiry')) {
    window.location.hash = 'demo-feature';
  }
});

// Counter
document.addEventListener('DOMContentLoaded', function () {
  var counters = document.querySelectorAll('.counter');
  var speed = 300;

  counters.forEach((counter) => {
    var target = +counter.getAttribute('data-target');
    var count = 0;
    var increment = target / speed;

    var updateCount = function () {
      count += increment;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
});

// Slider
document.addEventListener('DOMContentLoaded', function () {
  new Splide('#splide', {
    type: 'loop',
    perPage: 3.2,
    perMove: 1,
    start: 1,
    lazyLoad: true,
    autoplay: true,
    interval: 2000,
    flickMaxPages: 3,
    updateOnMove: true,
    pagination: false,
    gap: 20,
    throttle: 300,
    arrows: false,
    breakpoints: {
      1199: {
        perPage: 2,
        padding: '3%',
      },
      991: {
        perPage: 1,
        padding: '3%',
        perPage: 1.4,
      },
      767: {
        perPage: 1,
        padding: '0%',
        pagination: false,
      },
    },
  }).mount();
});

// Faq
var acc = document.getElementsByClassName('accordion_item_title');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    var isActive = this.classList.contains('active');
    var activeItems = document.querySelectorAll('.accordion_item_title.active');
    activeItems.forEach(function (item) {
      item.classList.remove('active');
      item.nextElementSibling.style.maxHeight = null;
    });
    if (!isActive) {
      this.classList.add('active');
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
};

// Back TO Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName('custom-select');
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
    c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener('click', function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName('select')[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName('same-as-selected');
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute('class');
          }
          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener('click', function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
    except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}
/*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
document.addEventListener('click', closeAllSelect);
