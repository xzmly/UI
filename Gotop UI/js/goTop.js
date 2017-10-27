var _goTop = (function (){
    function GoTop(ct){
        this.ct = document.querySelector(ct)
        this.target = document.createElement('button')
        this.bindEvent()
        this.createNode()
    }

    GoTop.prototype.bindEvent = function(num){
        var _this = this
        _this.target.addEventListener('click',function(){
            scrollTo(0,0);
        })
    }

    GoTop.prototype.createNode = function(){
        var _this = this
        window.onscroll = function(){
            if(window.scrollY >= 600){
                _this.target.innerText = "Go to top"
                _this.target.classList.add('main')
                _this.ct.appendChild(_this.target)
                _this.target.style.display="block"
            }else{
                _this.target.classList.remove('main')//对应的css叫main 可以自己写一个
                _this.target.style.display="none"
            }
        }
    }
    return  {
        init: function($id){
            new GoTop($id)
        }
    }
})()

_goTop.init('.div2') //输入你要插入到的元素