
var _fullCarousel = (function(){
	function fullCarousel($ct){
		this.$ct = $ct
		this.init()
		this.bind()
	}

	fullCarousel.prototype.init=function(){
		var $li = this.$ct.find('.full-wrap>li')
		var $wrap =this.wrap= this.$ct.find('.full-wrap')
		var $listLi =this.listLi= this.$ct.find('.full-list>li')
		var ctWidth =this.ctWidth= $('.fullCarousel-cantainer').width()
		var imglength =this.imglength= this.$ct.find('.full-wrap img').length

		$wrap.append($li.first().clone())
		$wrap.prepend($li.last().clone())

		this.$ct.find('.full-wrap img').width(ctWidth)
		$wrap.width(ctWidth*$('.full-wrap img').length)
		$wrap.css({left:-ctWidth})

		this.num = 0
		this.lock = false
	}

	fullCarousel.prototype.bind = function(){
		var _this = this
		$(window).resize(function(){
			_this.windowChange()
		})

		_this.$ct.find('.right').on('click',function(){
		 	_this.moveRight()
		})

		_this.$ct.find('.left').on('click',function(){
			_this.moveLeft()
		})

		_this.$ct.find('.full-list>li').on('click',function(){
			_this.showList(this)
			 _this.moveIMG(this)
		})
	}

	fullCarousel.prototype.moveRight = function(){
		var _this = this
		var newCtWidth = $('.fullCarousel-cantainer').width()
		if (_this.lock)return
		_this.lock = true
		_this.wrap. animate({left:"-="+newCtWidth},1000,function(){
			_this.num++
			if (_this.num == _this.imglength) {
				_this.wrap.css({left:-newCtWidth})
				_this.num = 0
			}
			_this.showList()
			_this.lock = false
		})
	}

	fullCarousel.prototype.moveLeft = function(){
		var _this = this
		var newCtWidth = $('.fullCarousel-cantainer').width()
		if (_this.lock)return
		_this.lock = true
		_this.wrap. animate({left:"+="+newCtWidth},1000,function(){
			_this.num--
			if (_this.num<0) {
				_this.wrap.css({left:-newCtWidth*_this.imglength})
				_this.num = _this.imglength-1
			}
			_this.showList()
			_this.lock = false
		})
	}

	fullCarousel.prototype.showList = function(node){
		var _this = this
		if (arguments.length == 0) {
			_this.listLi.removeClass('hover')
			_this.listLi.eq(_this.num).addClass('hover')
		}else{
			$(node).siblings().removeClass('hover')
			$(node).addClass('hover')
		}
	}

	fullCarousel.prototype.moveIMG = function(node){
		var _this = this
		var newCtWidth = $('.fullCarousel-cantainer').width()
		var index = $(node).index()
		_this.wrap.animate({left:-newCtWidth*(index+1)},500)
		_this.num = index
	}

	fullCarousel.prototype.windowChange = function(){
		var _this = this
		var newCtWidth = $('.fullCarousel-cantainer').width()
		$('.full-wrap img').width(newCtWidth)
		_this.wrap.width(newCtWidth*$('.full-wrap img').length)
		_this.wrap.css({left:-newCtWidth})
	}
	return{
		init:function($ct){
			$ct.each(function(index,node){
				new fullCarousel($(node))
			})
		}
	}
})()

	_fullCarousel.init($('.fullCarousel-cantainer'))