import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import { Tabs} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {connect} from 'react-redux'

class Search extends Component{
	constructor(){
		super();
		this.state={
			 hotWords:[]
		}
	}
	componentDidMount() {
	    axios.get('/api/hotWords').then(res=>{
	    	this.setState({
	    		hotWords:res.data.data.slice(0,8)
	    	})
	    })
	    this.props.changetitle('search')
	}

	
	 render() {
	   return (
	   		
	     <div className={style.search}>
	     	<p>热门搜索</p>
	     	<div className={style.hotWords}>
	      	{
	      		this.state.hotWords.map((item,index)=>
	      			<div key={index} onClick={this.handelClick.bind(this,item)}>{item}</div>
	      		)
	      	}
	      	</div>
	      	<div className={style.shore}>
		      	<p>商品分类</p>
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
	   );
	 }
	 handelClick(hotWords){
	 		this.props.search(hotWords)
	 }
}
export default connect(
	null,
	{
		changetitle:(state)=>{
			return {
				type:'CHANGE_TITAL',
				payload:state
			}
		},
		search:(state)=>{
			return {
				type:'CHANGE_SEARCH',
				payload:state
			}
		}	
	}
	)(Search)