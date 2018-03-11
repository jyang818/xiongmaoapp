import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import Navbar from '@/Components/Common/Navbar';
import "@/assets/iconfont/iconfont.css";
class App extends Component{
	constructor(){
		super();
	}
	render(){
		
		return <div>
			<Navbar></Navbar>
			<div id={style.top} onClick={()=>{
				var timer = null;
				
				cancelAnimationFrame(timer);
				timer = requestAnimationFrame(function fn(){
				var oTop = document.body.scrollTop || document.documentElement.scrollTop;
				if(oTop > 0){
				document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
				timer = requestAnimationFrame(fn);
				}else{
				cancelAnimationFrame(timer);
				} 
				});
				
			}}><i className='iconfont icon-less'></i></div>
			<section>
				{this.props.children}
			</section>
		</div>
	}
}
export default App