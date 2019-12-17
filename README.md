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
3. 覆盖默认样式
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
4. css变量定义`var`函数
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
5. 动态挂载组件
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