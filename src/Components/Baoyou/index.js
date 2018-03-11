import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import "@/assets/iconfont/iconfont.css";

class Baoyou extends Component{
	constructor(){
		super();
		this.state={
			list:[],
			cover:'',
			subColumns:[],
			name:''
		}
	}
	componentDidMount() {
	    axios.get(`/api/sub_column/7/items?start=0`).then(res=>{
	    	this.setState({
	    		list:res.data.data.list
	    	})
	    })
	    axios.get(`/api/column/${this.props.match.params.id}`).then(res=>{
	    	this.setState({
	    		cover:res.data.data.cover,
	    		subColumns:res.data.data.subColumns,
	    		name:res.data.data.name
	    	})
	    })
	    this.props.changetitle('baoyou')
	}
	render(){
		return <div id={style.picture}>
			<nav>
				<span onClick={()=>{
					this.props.history.go(-1)
				}}><i className='iconfont icon-back'></i>返回</span>
				<h3>{this.state.name}</h3>
				<div className={style.flex}>
					<span>
						<NavLink to='/baoyou' activeClassName={style.active}>精选</NavLink>
					</span>
					<div className={style.one}>
						<div className={style.two}>
							<ul>
							{
								this.state.subColumns.slice(1).map(item=>
									<li key={item.id}>
										<NavLink to={{pathname:`/tabs/${item.id}`}} activeClassName={style.active} >{item.name}</NavLink>
									</li>
								)
							}
							</ul>
						</div>
					</div>
				</div>
			</nav>
			<div className={style.cover}>
				{
					<img src={this.state.cover}/>
				}
			</div>
			<div className={style.item}>
				{
					this.state.list.map(item=>
						<div key={item.commodityId} className={style.content} onClick={this.handelClick.bind(this,item.id)}>
							<img src={item.image}/>
								<div className={style.title}>
									<p>{item.title}</p>
									<span>￥<h3>{item.price}</h3></span>
								</div>
						</div>
					)
				}
			</div>
		</div>
	}
	handelClick(id){
		this.props.history.push(`/detail/${id}`)
	}
}
export default connect(
	null,
	{
		changetitle:(title)=>{
			return {
				type:'CHANGE_TITAL',
				payload:title
			}
		}
	}
)(Baoyou)