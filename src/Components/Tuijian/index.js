import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import ReactSwipe from 'react-swipe';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux'

class Tuijian extends Component{

	constructor(){
		super();
		this.state={
			loading:true,
			show:false,
			looplist:[],
			gridsV20:[],
			gridsV21:[],
			gridsV22:[],
			topList:[],
			items:[]
		}
		this.current=0;
		this.tatal=200;
	}
	componentDidMount() {
	    axios.get('/api/tab/1?start=0').then(res=>{
	    	this.setState({
	    		looplist:res.data.data.banners,
	    		gridsV20:res.data.data.gridsV2[0],
	    		gridsV21:res.data.data.gridsV2[1],
	    		gridsV22:res.data.data.gridsV2[2],
	    		topList:res.data.data.topList,
	    		items:res.data.data.items.list
	    	})
	    	this.current=res.data.data.items.nextIndex
	    })
	    this.props.changetitle('home')
	}
	render(){
		return <div>
			<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:2000}} key={this.state.looplist.length}>
				{
					this.state.looplist.map(item=>
						<img src={item.imageUrl} key={item.id} onClick={this.handelBannerClick.bind(this,item.url)}/>
					)
				}
			</ReactSwipe>
			<div className={style.gridsV2}>
				<div className={style.frist} onClick={this.handelClickG1.bind(this,this.state.gridsV20.url)}>
					<p>{this.state.gridsV20.title}</p>
					<span>{this.state.gridsV20.text}</span>
					<img src={this.state.gridsV20.imageUrl}/>
				</div>
				<div className={style.second}>				
					<div className={style.child1} onClick={this.handelClickG2.bind(this,this.state.gridsV21.url)}>
						<p>{this.state.gridsV21.title}</p>
						<span>{this.state.gridsV21.text}</span>
						<img src={this.state.gridsV21.imageUrl}/>
					</div>				
					<div className={style.child2} onClick={this.handelClickG2.bind(this,this.state.gridsV22.url)}>
						<p>{this.state.gridsV22.title}</p>
						<span>{this.state.gridsV22.text}</span>
						<img src={this.state.gridsV22.imageUrl}/>
					</div>
				</div>				
			</div>
			<div className={style.topList}>
				<div className={style.title}>
					<span>每日排行版</span><a>查看全部></a>
				</div>
				<div className={style.flex}>	
					<ul>
						{
							this.state.topList.map(item=>
								<li key={item.id}>
									<img src={item.image}/>
									<p>{item.title}</p>
									<h6>￥{item.price}</h6>
									<span>{item.saleNum}</span>人已买
								</li>
							)
						}
					</ul>
				</div>
			</div>
			<div className={style.items}>
				<div className={style.line}>
					<span className={style.one}></span>
					<span  className={style.text}>更多优惠更新中 (ง •̀_•́)ง</span>
					<span className={style.two}></span>
				</div>
				<InfiniteScroll
				    initialLoad={false}
				    loadMore={this.loadMoreFunc.bind(this)}
				    hasMore={this.state.loading}
				    loader={<div className="loader">Loading ...</div>}
				>
				<div key={this.state.items.length}>
					{this.state.items.map(item=>
						<div className={style.item} key={item.commodityId} onClick={this.handelClick.bind(this,item.id,item.type,item.url)}>
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
				{
					this.state.show?<div>没有更多数据了^-^</div>:null
				}
			</div>
		</div>
	}
	loadMoreFunc(){
		if(this.current>this.total){
			this.setState({
				loading:false,
				show:true
			})
			return
		}
		axios.get(`/api/tab/1/feeds?start=${this.current}`).then(res=>{
	    	this.setState({
	    		items:[...this.state.items,...res.data.data.list]
	    	})
	    	this.current=res.data.data.nextIndex
	    })
	}
	handelClick(id,type,url){
		if(type==1){
			this.props.history.push(`/detail/${id}`)
		}else{
			this.props.history.push(`/picture/${url.split('//')[1].split('?')[0]}/${url.split('//')[1].split('?')[1].split('=')[1]}`)
		}
		
	}
	handelBannerClick(url){
		this.props.history.push(`/article/${url.split('//')[1].split('?')[1].split('=')[1]}`)
	}
	handelClickG1(url){
		this.props.history.push(`/baoyou/${url.split('//')[1].split('?')[1].split('=')[1]}`)
	}
	handelClickG2(url){
		this.props.history.push(`/zhuanqu/${url.split('//')[1].split('?')[1].split('=')[1]}`)
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
	}

	)(Tuijian)