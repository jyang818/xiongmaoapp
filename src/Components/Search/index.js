import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

class Search extends Component{
	constructor(){
		super();
		this.state={
			loading:true,
			shore:[],
			moreshore:[],
		}
		this.current=0;
		this.shoretotal=0;
		this.moreshoretotal=0
	}
	componentDidMount() {
	    axios.get(`/api/search?word=${this.props.value}&start=0&sort=0`).then(res=>{
	    	this.setState({
	    		shore:res.data.data.list
	    	})
	    	this.shoretotal=res.data.data.total;
	    	this.current=res.data.data.nextIndex
	    })

	    axios.get(`/api/search_more?word=${this.props.value}&start=0&sort=0`).then(res=>{
	    	this.setState({
	    		shore:res.data.data.list
	    	})
	    	this.moreshoretotal=res.data.data.total
	    })
	}
	componentWillReceiveProps(nextProps) {
		  axios.get(`/api/search?word=${nextProps.value}&start=0&sort=0`).then(res=>{
		  	this.setState({
		  		shore:res.data.data.list
		  	})		  
		  	this.shoretotal=res.data.data.total;
		  	this.current=res.data.data.nextIndex
		  })

		  // axios.get(`/api/search_more?word=${this.props.value}&start=0&sort=0`).then(res=>{
		  // 	console.log(res.data)
		  // 	this.setState({
		  // 		shore:res.data.data.list
		  // 	})
		  // 	this.moreshoretotal=res.data.data.total
		  // })  
	}	
	render(){
		return <div>
			<InfiniteScroll
			    initialLoad={false}
			    threshold={10}
			    loadMore={this.loadMoreFunc.bind(this)}
			    hasMore={this.state.loading}
			    loader={<div className="loader">Loading ...</div>}
			>
			<div className={style.shore} >
				{this.state.shore.map(item=>
					<div className={style.item} key={item.commodityId} onClick={this.handelClick.bind(this,item.id)}>
						<img src={item.image}/>
						<div className={style.title}>
						{item.title}</div>
						<div>
							{item.price?
								<span>￥{item.price}</span>:null
							}
							{item.originPrice?
								<span>￥{item.originPrice}</span>:null
							}
							{item.couponValue?
								<span>{item.couponValue}</span>:null
							}
							
						</div>
					</div>
					)}
			</div>
			</InfiniteScroll>
		</div>
	}
	loadMoreFunc(){
		if(this.current>this.shoretotal){
			this.setState({
				loading:false,
				show:true
			})
			return
		}
		axios.get(`/api/search?word=${this.props.value}&start=${this.current}&sort=0`).then(res=>{
	    	this.setState({
	    		shore:[...this.state.shore,...res.data.data.list]
	    	})
	    	this.current=res.data.data.nextIndex
	    })
	}
	handelClick(id){
		this.props.history.push(`/detail/${id}`)
	}
}
export default connect(
	(state)=>{
			return {
				mytitle:state.changetitleReducer,
				hotWords:state.changeSearchReducer,
				value:state.changevalueReducer,
			}
		},
	null
	)(Search)