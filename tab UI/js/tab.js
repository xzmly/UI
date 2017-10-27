
	var Tab = (function(){
		function _Tab(ct){
			this.init(ct)
			this.bind(ct)
		}

		_Tab.prototype.init = function(ct){
			this.headerLis = ct.querySelectorAll('.tab-header>li')
			this.contentLis = ct.querySelectorAll('.tab-content>li')
			this.header = ct.querySelector('.tab-header')
		}

		_Tab.prototype.bind = function(ct){
			var _this = this

			this.header.addEventListener('click',function(e){
				var target = e.target
				var index = [].indexOf.call(_this.headerLis,target)

				if (target !== this) {
					_this.headerLis.forEach(function(node,index){
						node.classList.remove('on')
					})
					target.classList.add('on')
				}else{
					return
				}

				_this.contentLis.forEach(function(node){
					node.classList.remove('show')
				})
					_this.contentLis[index].classList.add('show')
			})
		}
		//接口
		return {
			init: function(ct){
				// ct.forEach(function(node,index){
				// 	new _Tab(node)
				// })
				for(var i = 0;i<ct.length;i++){
					new _Tab(ct[i])
				}
			}
		}
	})()

 	Tab.init(document.querySelectorAll('.tab-cantainer'))