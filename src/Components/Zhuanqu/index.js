import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import "@/assets/iconfont/iconfont.css";

class Zhuanqu extends Component{
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
		if(this.props.match.params.id=170){
			axios.get(`/api/column/170/items?start=0`).then(res=>{
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
		}else{
			axios.get(`/api/category/${this.props.match.params.id}/items?start=0`).then(res=>{
				this.setState({
					list:res.data.data.items.list,
					cover:''
				})
			})
		}
	    
	    this.props.changetitle('picture')
	}
	render(){
		return <div id={style.picture}>
			
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
)(Zhuanqu)