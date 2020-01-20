# vueLearning
##  I. 基础知识：html ,css, js, es6
1. html  
1.1 <a href="http://www.w3school.com.cn/html/index.asp" target="_blank">http://www.w3school.com.cn/html/index.asp</a>   
2. css  
2.1 <a href="https://www.w3cschool.cn/css/css-tutorial.html" target="_blank">https://www.w3cschool.cn/css/css-tutorial.html</a>   
3. js  
3.1 <a href="https://wangdoc.com/javascript/operators/index.html" target="_blank">https://wangdoc.com/javascript/operators/index.html</a>   
3.2 <a href="http://www.w3school.com.cn/js/index.asp" target="_blank">http://www.w3school.com.cn/js/index.asp</a>   
4. es6  
4.1 <a href="http://es6.ruanyifeng.com" target="_blank">http://es6.ruanyifeng.com</a>  
5. echartsjs  
5.1 <a href="https://www.echartsjs.com/zh/index.html" target="_blank">https://www.echartsjs.com/zh/index.html</a>  
6. web网站  
6.1 [web开发技术](https://developer.mozilla.org/zh-CN/docs/Web)  
6.2 [菜鸟教程](https://www.runoob.com/)  
6.3 [W3school](https://www.w3school.com.cn/)  
## II. 前端框架及脚手架
1. react  
1.1 react框架入门 <a href="https://zh-hans.reactjs.org/tutorial/tutorial.html" target="_blank">https://zh-hans.reactjs.org/tutorial/tutorial.html</a>  
1.2 antd-pro脚手架文档 <a href="https://pro.ant.design/docs/getting-started-cn" target="_blank">https://pro.ant.design/docs/getting-started-cn</a>  
1.3 antd文档 <a href="https://ant.design/docs/react/introduce-cn" target="_blank">https://ant.design/docs/react/introduce-cn</a>  
1.4 antd实战教程 <a href="https://www.yuque.com/ant-design/course/intro" target="_blank">https://www.yuque.com/ant-design/course/intro</a>  
2. vue  
2.1 vue框架入门 <a href="https://cn.vuejs.org/v2/guide" target="_blank">https://cn.vuejs.org/v2/guide</a>  
2.2 ElementUi文档 <a href="https://element.eleme.cn/#/zh-CN/component/installation" target="_blank">https://element.eleme.cn/#/zh-CN/component/installation</a>  
2.3 vuex <a href="https://vuex.vuejs.org/zh" target="_blank">https://vuex.vuejs.org/zh</a>  
### III. vue相关问题及解决方法
1. 修改滚动条样式
* 使用伪元素进行修改滚动条[类使用方法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar)：
```javaScript
  ::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
    background: #ebf0f7;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: #bbb;
    transition: all .2s;
    border-radius: 0.25rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(95, 95, 95, 0.7);
  }
```
2. 垂直水平居中
```javaScript
  .center-over{
    display: flex;
    justify-content: center;
    align-items: center;
  }
```
3. 滚动条
```javaScript
   .content{
      overflow-x: hidden;
      overflow-y: auto;
      max-height: 300px;
   }
```
4. 覆盖默认样式
* 使用`!important`提升样式的优先级：
```javaScript
  .color-picker-over .el-color-picker__trigger {
    width: 100px !important;
  }
```
* 使用`>>>`样式穿透:
```javaScript
  .selectRadio >>> .el-radio__label {
    font-size: 14px;
  }
```
* 如果是sass/less的话可能无法识别`>>>`,这时候需要使用 `/deep/` 选择器:
```javaScript
  .divClass /deep/ .el-carousel__indicator:nth-child(2n) .el-carousel__button{
    height: 5px;
    background-color: #f00;
  }
```
5. css变量定义`var`函数
* 使用函数引入变量：
```javaScript
  <div :style="getStyle">
     <el-radio-group>
      <el-radio 
       v-for="radio in radioList" 
       :key="radio.radioId" 
       :disabled="radio.disabled" 
       :label="radio.radioId" 
       :value="radio.radioId">
       {{radio.name}}
      </el-radio>
     </el-radio-group>
  </div>

   getStyle() {
       return {
         '--radioFontSize': this.radioFontSize,
       };
   }
```
* 在css中引用变量,`calc()`函数用于动态计算：
```javaScript
   .selectRadio >>> .el-radio__label {
      font-size: calc(var(--radioFontSize, 14) * 1px);
   }
```
6. 动态挂载组件
```javaScript
<template>
  <div ref="product">
  </div>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'ProductModel',
    props: {
        fileName: { required: true }
    },
    computed: {},
    mounted() {
        this.createProduct();
    },
    methods: {
        createProduct() {
            const me = this;
            import('@/components/product/' + fileName + '.vue').then(res => {
                me.mountComponent(res.default);
            });
        },
        mountComponent(loadedModule) {
            // 实例化组件
            let div = this.getEmptyDiv();
            let ComponentContainerClass = Vue.extend(loadedModule);
            new ComponentContainerClass({
                store: this.$store
            }).$mount(div);
        },
        getEmptyDiv() {
            let div = document.createElement('div');
            this.$refs.product.append(div);
            return div;
        }
    }
};
</script>
```
7. axios使用示例
* 封装请求工具：
```javaScript
import axios from 'axios';
import { Message } from 'element-ui';

let instance = axios.create({
    timeout: 20000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest', //设置为异步
        'Content-Type': 'application/json',
    },
    withCredentials: false
});

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        return config
    },
    err => {
        Message.error({ message: '请求超时!' })
        return Promise.resolve(err)
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    data => {
        if (data.data.status === 200) {
            return data.data
        } else {
            Message.error({ message: data.data.message })
            return data.data
        }
    },
    err => {
        if (err.response) {
            if (err.response.status === 504 || err.response.status === 404) {
                Message.error({ message: '服务器被吃了⊙﹏⊙∥' })
            } else if (err.response.status === 401) {
                Message.error({ message: '登录信息失效，请重新登录' });
            } else if (err.response.status === 500) {
                Message.error({ message: '服务器开小差了⊙﹏⊙∥' })
            } else {
                Message.error({ message: '网络不给力，请稍后再试' })
            }
        } else {
            Message.error({ message: '网络不给力，请稍后再试' })
        }
        return Promise.reject(err)
    }
)

const putRequest = (url, params) => {
    return instance.request({
        method: 'put',
        url: url,
        data: params,
    })
}
// 在main.js中进行属性赋值
Vue.prototype.putRequest = putRequest;
```
* 可以将方法注入到Vue属性中，然后直接使用：
```javaScript
    async updateList() {
      const res = await this.putRequest(
        this.url,
        this.params
      );
      // 获取到数据后可以对res进行处理  
    },
```
8. vue集成echarts示例
```javaScript
// main.js中注入echarts属性
Vue.prototype.$echarts = echarts;
// 自定义图表组件
<template>
  <div ref="chart" :style="{width:w,height:h,opacity:opacity,'font-size': '0.15rem',color: 'rgb(179, 179, 179)'}">
  </div>
</template>

<script>
export default {
    name: 'BarChart',
    components: {},
    data() {
        return {
            myChart: {}
        };
    },
    props: {
        x: { default: 0 },
        y: { default: 0 },
        width: { default: 200 },
        height: { default: 200 },
        opacity: { default: 1 },
        hasSplitLine: { default: false },
        legend_fontSize: { default: 15 },
        xAxis_fontSize: { default: 15 },
        legend_color: { default: '#000000' },
        legend_position: { default: ['right', 'top'] },
        legend_direction: { default: 'horizontal' },
        colorList: {
            default: [['#108CEE'], ['#545FC8'], ['#F38900']]
        },
        legend_scroll: { default: true },
        value: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    mounted: function() {
        this.createBarChart();
    },
    methods: {
        createBarChart() {
            // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(this.$refs.chart);
            // 绘制图表
            this.myChart.setOption(this.buildOption);
        }
    },
    computed: {
        w: function() {
            return this.width + 'px';
        },
        h: function() {
            return this.height + 'px';
        },
        buildOption: function() {
            let title_text = '';
            let subtext_text = '';
            let title_x = '';
            let title_y = '';
            let title_itemGap = 10;
            let title_backgroundColor = '';
            let title_textStyle_fontSize = 26;
            let title_textStyle_fontWeight = 'bolder';
            let title_textStyle_color = '#000080';
            let title_subtextStyle_fontSize = 18;
            let title_subtextStyle_fontWeight = 'bolder';
            let title_subtextStyle_color = '#8B2323';

            let legend_orient = this.legend_direction;
            let legend_x = this.legend_position[0];
            let legend_y = this.legend_position[1];
            let legend_itemWidth = 24;
            let legend_itemHeight = 18;
            let legend_textStyle_fontSize = this.legend_fontSize;
            let legend_textStyle_fontWeight = 'bolder';
            let legend_textStyle_color = this.legend_color;
            let legend_itemGap = 5;
            let legend_backgroundColor = 'rgba(0,0,0,0)';
            let legend_data = [];
            let color = [];
            this.colorList.map(item => {
                color.push(item[0]);
            });
            let xAxis_type = 'category';
            let xAxis_splitLine_show = this.hasSplitLine;
            let xAxis_axisLabel_textStyle_fontSize = this.xAxis_fontSize;
            let xAxis_axisLabel_textStyle_color = 'black';
            const legend_type = this.legend_scroll ? 'scroll' : undefined;
            let dataset_source = [];
            let series = [];
            if (
                JSON.stringify(this.value) != '{}' &&
                typeof this.value != 'undefined'
            ) {
                let valuex = this.value.x;
                let valuey = this.value.y;
                let result = new Array();
                for (let i = 0; i < valuey.length; i++) {
                    legend_data.push(Object.keys(valuey[i])[0]);
                }

                for (let i = 0; i < valuex.length + 1; i++) {
                    result[i] = new Array();
                    if (i == 0) {
                        result[i].push('');
                        for (let j = 0; j < legend_data.length; j++) {
                            result[i].push(legend_data[j]);
                        }
                    } else {
                        result[i].push(valuex[i - 1]);
                        for (let j = 0; j < valuey.length; j++) {
                            result[i].push(valuey[j][legend_data[j]][i - 1]);
                        }
                    }
                }
                for (let i = 0; i < legend_data.length; i++) {
                    let item = { type: 'bar', barWidth: 30 };
                    series.push(item);
                }
                dataset_source = result;
            }
            let option = {
                title: {
                    text: title_text,
                    subtext: subtext_text,
                    x: title_x,
                    y: title_y,
                    itemGap: title_itemGap,
                    backgroundColor: title_backgroundColor,
                    textStyle: {
                        fontSize: title_textStyle_fontSize,
                        fontWeight: title_textStyle_fontWeight,
                        color: title_textStyle_color
                    },
                    subtextStyle: {
                        fontSize: title_subtextStyle_fontSize,
                        fontWeight: title_subtextStyle_fontWeight,
                        color: title_subtextStyle_color
                    }
                },
                legend: {
                    orient: legend_orient,
                    type: legend_type,
                    x: legend_x,
                    y: legend_y,
                    itemWidth: legend_itemWidth,
                    itemHeight: legend_itemHeight,
                    textStyle: {
                        fontSize: legend_textStyle_fontSize,
                        fontWeight: legend_textStyle_fontWeight,
                        color: legend_textStyle_color
                    },
                    itemGap: legend_itemGap,
                    backgroundColor: legend_backgroundColor,
                    data: legend_data
                },
                tooltip: {},
                dataset: {
                    source: dataset_source
                },
                xAxis: {
                    type: xAxis_type,
                    splitLine: {
                        show: xAxis_splitLine_show
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: xAxis_axisLabel_textStyle_fontSize,
                            color: xAxis_axisLabel_textStyle_color
                        }
                    }
                },
                yAxis: {},
                color: color,
                series: series
            };
            return option;
        }
    },
    watch: {
        buildOption: function() {
            setTimeout(() => {
                this.myChart.clear();
                this.myChart.setOption(this.buildOption);
            }, 200);
        },
        width: function() {
            this.$nextTick(() => {
                this.myChart.resize();
            });
        },
        height: function() {
            this.$nextTick(() => {
                this.myChart.resize();
            });
        }
    }
};
</script>

<style scoped>
</style>
```