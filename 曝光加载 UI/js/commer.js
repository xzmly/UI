
var Lazy = (function(){
	function Exposure($target,callblack){
		this.$target = $target
		this.callblack = callblack
		this.bind()
		this.showScrollImg()
	}

	Exposure.prototype.bind = function(){
		var _this = this
		$(window).on('scroll',function(){
			 _this.showScrollImg()
	 	})
	}

	Exposure.prototype.showScrollImg = function(){
		var _this = this
		if (_this.checkImg()) {
			_this.callblack(this.$target)
		}
	}

	Exposure.prototype.checkImg = function(){
		var scrollHeight = $(window).scrollTop()
		var windowHeight = $(window).height()
		var imgHeight = this.$target.offset().top
		if(scrollHeight+windowHeight>imgHeight && scrollHeight<imgHeight){
			return true
		}
		return false
	}

	Exposure.prototype.loadImg = function(node){
		return node.attr('src') === node.attr('data-src')
	}

	Exposure.prototype.showImg = function(node){
		node.attr('src',node.attr('data-src'))
	}
	return {
		init:function($target,callblack){
			$target.each(function(index,node){
				new Exposure($(node),callblack)
			})
		}
	}
})()

Lazy.init($('#hello'),function($node){
	$node.html(3.12263456313216541313245631)
})

Lazy.init($('.container img'),function($node){
	if (!this.loadImg($node)) {
		this.showImg($node)
	}else{
		return
	}
})