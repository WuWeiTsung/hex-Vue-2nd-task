import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const apiUrl = "https://vue3-course-api.hexschool.io";
const api_path = "xianbei";

const url = `${apiUrl}/v2/api/${api_path}/admin/products`;

//取出token
const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
//將token放入axios的header中
axios.defaults.headers.common.Authorization = token;


const app = createApp({
	data(){
		return {
			//準備兩個裝資料，products裝抓回來的全部資料，detail裝點選要查看的單一筆資料
			products:[],
			detail :{},
		}
	},

	methods:{
		//抓取資料
		getAll(){
			axios.get(url)
				.then((res) => {
					//將抓到的資料放入products中
					this.products = res.data.products;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		//檢查是否登入
		checkLogin(){
			const checkUrl =`${apiUrl}/v2/api/user/check`;
			axios.post(checkUrl)
				.then((res) => {
					//回傳成功代表已在登入狀態，此時抓取全部資料
					this.getAll()
				})
				.catch((err)=>{
					//回傳失敗代表未登入，直接轉回登入頁面
					location.href="login.html"
				})
		}
	},

	mounted(){
		this.checkLogin()
	}
})

app.mount("#app");