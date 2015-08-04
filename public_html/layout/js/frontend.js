(function() {
  this.sliderGo = function(e) {
    var $active, $block, $next, direction, mods;
    mods = ['left', 'right'];
    $block = $('.slider');
    $active = $block.elem('item').byMod('active');
    direction = false;
    _.each(mods, function(el) {
      if ($(e.target).parents('a').hasMod(el)) {
        direction = el;
        if (!$block.hasMod(el)) {
          return $block.mod(el, true);
        }
      } else {
        return $block.delMod(el);
      }
    });
    if (direction === 'left') {
      $next = $active.prev();
      if ($next.length === 0) {
        $next = $block.find('.slider__item:last-of-type');
      }
    } else {
      $next = $active.next();
      if ($next.length === 0) {
        $next = $block.find('.slider__item:first');
      }
    }
    $active.find('.slider__bg').removeAttr('style');
    $next.toggleClass('slider__item--active').find('.slider__bg').css({
      'z-index': 1000
    });
    delay(500, function() {
      return $active.toggleClass('slider__item--active');
    });
    return e.preventDefault();
  };

  $('.slider').elem('arrow').click(_.throttle(sliderGo, 1500));

  this.delay = function(ms, func) {
    return setTimeout(func, ms);
  };

  this.end = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

  this.calculateLayout = function() {
    var $blockScroll;
    $blockScroll = $('.sidebar');
    if ($blockScroll.data('perfect-scrollbar')) {
      return $blockScroll.perfectScrollbar('update');
    } else {
      return $blockScroll.perfectScrollbar({
        suppressScrollX: true,
        includePadding: true
      });
    }
  };

  $(window).on('resize', _.debounce(calculateLayout, 300));

  this.navOpen = function() {
    $('footer').setMod('hidden', true);
    $('body').addClass('action');
    return delay(150, function() {
      $('body').addClass('open');
      return delay(300, function() {
        $('footer').setMod('delay', true);
        return $('footer').setMod('hidden', false);
      });
    });
  };

  this.navClose = function() {
    $('body').removeClass('open');
    return delay(400, function() {
      $('footer').setMod('delay', false);
      return $('body').removeClass('action');
    });
  };

  $('.sidebar').elem('close').click(function(e) {
    navClose();
    return e.preventDefault();
  });

  $(document).on('click', function(e) {
    if ($('body').hasClass('open') && $(e.target).parents('.sidebar').length === 0) {
      navClose();
      return console.log(123);
    }
  });

  $('.nav-trigger').click(function(e) {
    if ($('body').hasClass('open')) {
      navClose();
    } else {
      navOpen();
    }
    return e.preventDefault();
  });

  delay(300, function() {
    return calculateLayout();
  });

}).call(this);
