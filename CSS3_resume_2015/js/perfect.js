// JavaScript Document

	function getStyle(obj,name){//IE和chrome的两种取非行间样式的方式，因为startMove中parseInt直接取只能去行间样式
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else{
			return getComputedStyle(obj,false)[name];//flase那的参数随便写
		}
	}

	function startMove(obj,json,fnEnd)
	{
		clearInterval(obj.timer);//防止出现多个计时器 导致 运动过程中快速不断移入鼠标速度越来越快
		obj.timer=setInterval(function(){//多个div要用多个计时器，所以给每个obj一个timer样式
									   
          var bStop=true;//假设所有值到了
	       for(var attr in json)//完美运框架调整(json)
		   {
			//取运动初始值
			var cur=0;
			
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);//透明度是小数，要四舍五入不然会出问题
			}
			else{
				cur=parseInt(getStyle(obj,attr));//offset有bug 不用了
			}
			
			//设置速度
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);//px必须是整数个 不然会出问题
			
			if(cur!=json[attr])
				bStop=false;
			
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';//透明度特殊对待
					obj.style.opacity=(cur+speed)/100;
				}
				else{
					obj.style[attr]=cur+speed+'px';
				}
			
		  }//完美运动
		if(bStop)//所有值到了才关定时器
		{
			clearInterval(obj.timer);
			if(fnEnd)fnEnd();
		}
		},30)
	}