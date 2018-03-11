import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
class Article extends Component{
	constructor(){
		super();
		this.state={
			banners:[],
			share:'',
			title:''
		}
	}
	componentDidMount() {
	    axios.get(`/api/article/${this.props.match.params.id}`).then(res=>{
	    	console.log(res.data.data)
	    	this.setState({
	    		banners:res.data.data.contentList,
	    		share:res.data.data.share,
	    		title:res.data.data.title
	    	})
	    })
	    this.props.changetitle('picture')
	}
	render(){
		return <div className={style.article}>
			<div className={style.banner}>
				<img src={this.state.share.imageUrl}/>
			</div>
			<h2>{this.state.title}</h2>
			<div>
			{this.state.banners.map(item=>{
				if(item.type==1){
					return <p>{item.text}</p>
				}else if(item.type==2){
					return <h3>{item.title}</h3>
				}else if(item.type==3){
					return <img src={item.image.url}/>
				}else if(item.type==4){
					return <div className={style.card}>
						<img src={item.commodity.image}/>
						<p>{item.commodity.title}</p>
					</div>
					
				}
			})}
			</div>
		</div>
			
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
)(Article)