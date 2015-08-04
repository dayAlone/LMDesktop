@sliderGo = (e)->
	mods      = ['left', 'right']
	$block    = $('.slider')
	$active   = $block.elem('item').byMod('active')
	direction = false
	_.each mods, (el)->
		if $(e.target).parents('a').hasMod el
			direction = el
			if !$block.hasMod el
				$block.mod el, true
		else
			$block.delMod el
	if direction == 'left'
		$next = $active.prev()
		if $next.length == 0
			$next =  $block.find('.slider__item:last-of-type')
	else
		$next = $active.next()
		if $next.length == 0
			$next =  $block.find('.slider__item:first')

	$active.find('.slider__bg').removeAttr 'style'
	$next.toggleClass('slider__item--active').find('.slider__bg').css('z-index':1000)

	delay 500, ->
		$active.toggleClass 'slider__item--active'

	e.preventDefault()

$('.slider').elem('arrow').click _.throttle(sliderGo, 1500)

@delay = (ms, func) -> setTimeout func, ms

@end = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd'

@calculateLayout = ->
	$blockScroll = $('.sidebar')
	if $blockScroll.data('perfect-scrollbar')
		$blockScroll.perfectScrollbar 'update'
	else
		$blockScroll.perfectScrollbar({suppressScrollX: true, includePadding: true})

$(window).on 'resize', _.debounce(calculateLayout, 300)

@navOpen = ->
	$('footer').setMod 'hidden', true
	$('body').addClass 'action'
	delay 150, ->
		$('body').addClass 'open'
		delay 300, ->
			$('footer').setMod 'delay', true
			$('footer').setMod 'hidden', false
@navClose = ->
	$('body').removeClass 'open'
	delay 400, ->
		$('footer').setMod 'delay', false
		$('body').removeClass 'action'

$('.sidebar').elem('close').click (e)->
	navClose()
	e.preventDefault()

$(document).on 'click', (e)->
	if $('body').hasClass('open') && $(e.target).parents('.sidebar').length == 0
		navClose()
		console.log 123

$('.nav-trigger').click (e)->
	if $('body').hasClass 'open'
		navClose()
	else
		navOpen()
	e.preventDefault()

delay 300, ->
	calculateLayout()
