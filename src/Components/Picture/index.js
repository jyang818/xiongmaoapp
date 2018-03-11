import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'

class Picture extends Component{
	constructor(){
		super();
		this.state={
			cover:'',
			list:[]
		}
	}
	componentDidMount() {
	    if(this.props.match.params.id=='column'){
	    	axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}`).then(res=>{
		    	console.log(res.data)
		    	this.setState({
		    		cover:res.data.data.cover
		    	})
		    })
		    axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}/items?start=0`).then(res=>{
		    	console.log(res.data)
		    	this.setState({
		    		list:res.data.data.list
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
)(Picture)