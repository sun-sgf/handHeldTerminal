<template>
  <div class="home">
    <Button @click.native='startRecognize'>触发按钮</Button>
    <div id="bcid" :style='{zIndex:zIndex}'></div> 
  </div>
</template>

<script>
import { Button } from "vant"
export default {
  name: 'Home',
  components: {
    Button
  },
  data(){
    return {
      text:'',
      codeUrl: '',
      scan:'',
      zIndex:-1
    }
  },
  methods: {
    //初始化扫描控件
    startRecognize() { 
      this.zIndex=9999
      let that = this;
      // if (!window.plus) {return};
      // 初始化扫描控件
      this.scan = new plus.barcode.Barcode('bcid');
      this.scan.onmarked = onmarked; 
      // 调用开始扫描 
      this.startScan()
      // 扫描后回调
      function onmarked(type, result, file) { 
        switch (type) {
          case plus.barcode.QR:
            type = 'QR';
            break;
          case plus.barcode.EAN13:
            type = 'EAN13';
            break;
          case plus.barcode.EAN8:
            type = 'EAN8';
            break;
          default:
            type = '其它' + type;
            break;
        }
        result = result.replace(/\n/g, '');
        that.codeUrl = result;
        // 返回值
        //Toast(result);  
        that.zIndex=-1
        that.closeScan(); 
      }
    },
    //开始扫描
    startScan() { 
      // if (!window.plus) return;
      this.scan.start();
    },
    //关闭扫描
    cancelScan() { 
      // if (!window.plus) return;
      that.zIndex=-1
      this.scan.cancel();
    },
    //关闭条码识别控件
    closeScan() { 
      // if (!window.plus) return;
      this.scan.close();
    }, 
  }
}
</script>
<style lang="scss">
  #bcid {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:3rem;
    text-align: center;
    color: #fff; 
  } 
</style>
