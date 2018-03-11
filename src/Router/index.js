import React from 'react';//只要用了jsx语法就要引入react
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
	} from 'react-router-dom';
import Tuijian from '@/Components/Tuijian';
import Nvzhuang from '@/Components/Nvzhuang';
import Nanzhuang from '@/Components/Nanzhuang';
import Meizhuang from '@/Components/Meizhuang';
import Baonuan from '@/Components/Baonuan';
import Peishi from '@/Components/Peishi';
import Nvxie from '@/Components/Nvxie';
import Nanxie from '@/Components/Nanxie';
import Search from '@/Components/Common/Search';
import Search1 from '@/Components/Search';
import Detail from '@/Components/Detail';
import Picture from '@/Components/Picture';
import Article from '@/Components/Article';
import Zhuanqu from '@/Components/Zhuanqu';
import Baoyou from '@/Components/Baoyou';
import Mianyi from '@/Components/Mianyi';
import Tabs from '@/Components/Tabs';


import App from '@/Components/App';
// import Detail from '@/Components/Detail';

import {Provider} from 'react-redux'
import store from '@/Components/Redux/Store'
// const router=(//创建路由
// 	<Provider store={store}>
// 	<Router>
// 		<App>
// 			<Switch>
// 				<Route path='/home' component={Home} />
// 				<Route path='/card' component={Card} />
// 				<Route path='/film' render={()=>
// 					<Film>
// 						<Switch>
// 							<Route path='/film/nowplaying' component={NowPlaying}/>
// 							<Route path='/film/comingsoon' component={Comingsoon}/>
// 							<Redirect from="/film" to="/film/nowplaying"/>
// 						</Switch>
// 					</Film>
// 				} />
// 				<Route path='/detail/:id' component={Detail} />{/*动态路由*/}
// 				<Redirect from="/" to="/home"/>
// 			</Switch>
// 		</App>
// 	</Router>
// 	</Provider>
// 	)
// export default router;//导出路由
const router=(
	<Provider store={store}>
	<Router>
		<App>
			<Switch>
				<Route path='/tuijian' component={Tuijian} />
 				<Route path='/nvzhuang' component={Nvzhuang} />
 				<Route path='/nanzhuang' component={Nanzhuang} />
 				<Route path='/meizhuang' component={Meizhuang} />
 				<Route path='/baonuan' component={Baonuan} />
 				<Route path='/peishi' component={Peishi} />
 				<Route path='/nvxie' component={Nvxie} />
 				<Route path='/nanxie' component={Nanxie} />
 				<Route path='/search' component={Search} />
 				<Route path='/search1' component={Search1} />
 				<Route path='/detail/:id' component={Detail} />
 				<Route path='/picture/:id/:ids' component={Picture} />
 				<Route path='/article/:id' component={Article} />
 				<Route path='/zhuanqu/:id' component={Zhuanqu} />
 				<Route path='/baoyou/:id' component={Baoyou} />
 				<Route path='/mianyi/:id' component={Mianyi} />
 				<Route path='/tabs/:id' component={Tabs} />
 				<Redirect from="/" to="/tuijian"/>
			</Switch>
		</App>
	</Router>
	</Provider>
	)
export default router;