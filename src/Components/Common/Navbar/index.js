import React,{Component} from 'react';
import style from './index.scss';
import "@/assets/iconfont/iconfont.css";
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom';
import ReactSwipe from 'react-swipe';
import Search from '../Search'
import { Tabs} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
class Navbar extends Component{
	constructor(){
		super();
		this.state={
			show:false,
			value:''
		}
	}
	componentDidMount() {
	    axios.get('/api/tab/1?start=0').then(res=>{
	    	this.setState({
	    		tabs:res.data.data.list,
	    	})
	    	// this.props.changetitle('search')
	    })
	}
	render(){
		if(this.props.mytitle=='home'){
					return <nav>
			<div className={style.search}>
				<NavLink to='/search'><i className="iconfont icon-search"></i>
			搜索商品，发现更多优选</NavLink>
			</div>
			<div className={style.tab}>
				<span className={style.frist}>
					<NavLink to='/tuijian' activeClassName={style.active}>今日推荐</NavLink>
					<span></span>
				</span>
				
				<div className={style.one}>
					<div className={style.two}>
						<ul>
							<li>
								<NavLink to='/nvzhuang' activeClassName={style.active}>女装</NavLink>
							</li>
							<li>
								<NavLink to='/nanzhuang' activeClassName={style.active}>男装</NavLink>
							</li>
							<li>
								<NavLink to='/meizhuang' activeClassName={style.active}>美妆护肤</NavLink>
							</li>
							<li>
								<NavLink to='/baonuan' activeClassName={style.active}>保暖内饰</NavLink>
							</li>
							<li>
								<NavLink to='/peishi' activeClassName={style.active}>配饰</NavLink>
							</li>
							<li>
								<NavLink to='/nvxie' activeClassName={style.active}>女鞋</NavLink>
							</li>
							<li>
								<NavLink to='/nanxie' activeClassName={style.active}>男鞋</NavLink>
							</li>
						</ul>
					</div>
				</div>
				
				<span className={style.last}>
					<i className="iconfont icon-category"></i>
				</span>
			</div>
		</nav>
		}
		else if(this.props.mytitle=='search'){
			return <nav className={style.search}>
				<div><NavLink to='/home'>返回</NavLink></div>
				<div className={style.search1}>
					<i className="iconfont icon-search"></i>
					<input type='text' placeholder='搜索商品，发现更多优选' value={this.state.value} id='input' onChange={()=>{
						var input = document.getElementById('input');
						this.setState({
							value:input.value
						})
					}}/>
				</div>
				<div onClick={this.handelClick.bind(this)}>
				<NavLink to='/search1'>搜索</NavLink></div>
			</nav>
		}else if(this.props.mytitle=='picture'){
						return <nav>
				<div className={style.search}>
					<NavLink to='/search'><i className="iconfont icon-search"></i>
				搜索商品，发现更多优选</NavLink>
				</div>
				<div className={style.tab}>
					<span className={style.frist}>
						<NavLink to='/tuijian'><i className='iconfont icon-back'></i>返回</NavLink>
						<span></span>
					</span>
					
					<div className={style.one}>
						<div className={style.two}>
							<ul>
								<li>
									<NavLink to='/nvzhuang' activeClassName={style.active}>女装</NavLink>
								</li>
								<li>
									<NavLink to='/nanzhuang' activeClassName={style.active}>男装</NavLink>
								</li>
								<li>
									<NavLink to='/meizhuang' activeClassName={style.active}>美妆护肤</NavLink>
								</li>
								<li>
									<NavLink to='/baonuan' activeClassName={style.active}>保暖内饰</NavLink>
								</li>
								<li>
									<NavLink to='/peishi' activeClassName={style.active}>配饰</NavLink>
								</li>
								<li>
									<NavLink to='/nvxie' activeClassName={style.active}>女鞋</NavLink>
								</li>
								<li>
									<NavLink to='/nanxie' activeClassName={style.active}>男鞋</NavLink>
								</li>
							</ul>
						</div>
					</div>
					
					<span className={style.last}>
						<i className="iconfont icon-category"></i>
					</span>
				</div>
			</nav>

		}else if(this.props.mytitle=='baoyou'){
			return <nav className={style.detail}></nav>
		}

	}
	handelClick(){
		this.props.changevalue(this.state.value)
	}	
}
export default connect(
	(state)=>{
			return {
				mytitle:state.changetitleReducer,
				hotWords:state.changeSearchReducer,
			}
		},
	{
		changevalue:(value)=>{
			return {
				type:'CHANGE_VALUE',
				payload:value
			}
		}
	}
	)(Navbar)