import React,{Component} from 'react';
import style from './index.scss';//引入CSS时起一个名字要用样式时{style.active}
import {NavLink} from 'react-router-dom';
import ReactSwipe from 'react-swipe';
import { Carousel,Icon } from 'antd-mobile';
import {connect} from 'react-redux'

class Datail extends Component{
	constructor(){
		super();
		this.state={
			itemlist:[],
			looplist:[],
			descContentList:[]
		}
	}
	componentDidMount() {
	    axios.get(`/api/detail?id=${this.props.match.params.id}&normal=1`).then(res=>{
	    	this.setState({
	    		looplist:res.data.data.detail.photo,
	    		itemlist:res.data.data.detail,
	    		descContentList:res.data.data.detail.descContentList
	    	})
	    })
	    this.props.changetitle('detail')
	}
	render(){
		return <div className={style.detail}>
			<div className={style.return} onClick={this.handelClick.bind(this)}><Icon type='left' size='lg'/></div>
			<Carousel
	          autoplay={true}
	          infinite
	          selectedIndex={1}
        		key={this.state.looplist.length}>
                {
                	this.state.looplist.map(itme=>{
                		return <img src={itme.url} key={itme.id}/>
                	}
                	)
                	
                }
            </Carousel>
            <div className={style.info}>
            	<h5><img src='http://img6.lukou.com/js/img/baoyou.20f74bf.png'/>{this.state.itemlist.title}</h5>
            	<p><img src='//img6.lukou.com/js/img/quan.574de0f.png'/>￥<span>{this.state.itemlist.price}</span></p>
            	<h6>原价<span>￥{this.state.itemlist.originPrice}</span>
            		<span>月销量：{this.state.itemlist.saleNum}</span>
            	</h6>
            </div>
            <h2 className={style.title}>
            	<span className={style.line}></span> <span className={style.text}>淘宝图文详情</span> <span className={style.line}></span>
            </h2>
            <div className={style.img}>
            	{
            		this.state.descContentList.map(item=>
            		{
            			let url=item.photo.url//直接用会未定义，可以先赋值在用这个值
            			let id=item.photo.id
            			return <img src={url} key={id}/>
            		}
            		)
            	}
            </div>
		</div>
	}
	handelClick(){
		this.props.history.go(-1)//返回上一级
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
	)(Datail)