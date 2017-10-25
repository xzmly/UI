
	var Carousel = (function(){
		function _Carousel($ct){
			this.$ct = $ct
			this.init()
			this.bind()
		}

		_Carousel.prototype.init = function(){
			//克隆图片，一前一后
			var $wrap = this.$wrap = this.$ct.find('.wrap')
			var $image = this.$ct.find('.wrap>li')
			this.imageWidth = $image.width()
			this.imageLength = $image.length

			$wrap.append($image.first().clone())
			$wrap.prepend($image.last().clone())

			var newImageLength = this.$ct.find('.wrap>li').length//增加图片后的数量
			$wrap.width(this.imageWidth*newImageLength)
			$wrap.css({left:-this.imageWidth})
			var $bulletLi = this.$bulletLi = this.$ct.find(".bullet>li")
			this.num = 0
			this.lock = false;
		}

		_Carousel.prototype.bind = function(){
			var _this = this
			//当left按钮被点击时
			this.$ct.find(".left").on('click',function(e){
				e.preventDefault();  
				_this.moveLeft()
			})
			//当right按钮被点击时
			this.$ct.find(".right").on('click',function(e){
				e.preventDefault();  
				_this.moveRight()
			})
			//点击小按钮时候
			_this.$bulletLi.on('click',function(){
				_this.showBullet($(this))
				_this.bulletLiMoveImg($(this))
			})
		}

		//小按钮控制图片移动
		_Carousel.prototype.bulletLiMoveImg=function($this){
			var _this = this
			var bulletIndex = $this.index()
			var move = (bulletIndex+1)*-_this.imageWidth
			if (_this.lock) return
				_this.lock = true
			_this.$wrap.animate({left:move},function(){
				_this.num = bulletIndex
			})
			_this.lock = false
		}

		_Carousel.prototype.showBullet=function($this){
			var _this = this
			if (arguments.length == 0) {
				 _this.$bulletLi.removeClass('active')
				 _this.$bulletLi.eq(_this.num).addClass('active')
			}else{
				$this.siblings().removeClass('active')
				$this.addClass('active')
			}

		}

		_Carousel.prototype.moveLeft=function(){
			var _this = this
			if (_this.lock)return
				_this.lock = true
			_this.$wrap.animate({left:"+="+_this.imageWidth},function(){
				_this.num--
				if (_this.num < 0) {
					_this.$wrap.css({left:_this.imageWidth*-_this.imageLength})
					_this.num = _this.imageLength-1
				}
				_this.showBullet()
				_this.lock = false
			})
		}

		_Carousel.prototype.moveRight=function(){
			var _this = this
			if (_this.lock)return
				_this.lock = true
			_this.$wrap.animate({left:"-="+_this.imageWidth},function(){
				_this.num++
				if (_this.num == _this.imageLength) {
					_this.$wrap.css({left:-_this.imageWidth})
					_this.num = 0
				}
				_this.showBullet()
				_this.lock = false
			})
		}
		//接口
		return {
			init: function($ct){
				$ct.each(function(index,node){
					new _Carousel($(node))
				})
			}
		}		
	})()

	Carousel.init($('.Carousel-cantainer'))
