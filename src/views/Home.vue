<template>
  <div class="home">
    <div class="top">
      <!-- 信息框 -->
      <div class="message" v-if="boxShow == 1" @click="tab(2)">
        <div>
          <!-- manager-o -->
          <Icon size="20px" name="manager-o" />
          {{form.deptId == ''?'去填写信息' : form.deptName}}
        </div>
      </div>
      <!-- 二维码扫描 -->
      <div class="scan" v-if="boxShow == 2"  @click="tab(1)">
        <div>
          <!-- manager-o -->
          <Icon size="20px" name="scan" />
          去扫一扫
        </div>
      </div>
      <!-- 信息提交 -->
      <div class="scan" v-if="boxShow == 3" >
        <div>
          <!-- manager-o -->
          <Icon size="20px" name="records" />
          {{form.deptId == ''?'' : form.deptName}}
        </div>
      </div>
    </div>
    <div class="boxContent">
      <div class="box1 box" id="bcid" v-show="boxShow == 1">
        <!-- 二维码扫描窗口 -->
      </div>
      <div class="box2 box" v-if="boxShow == 2">
        <!-- 信息填写窗口 -->
        <Form @submit="tab(1)">
          <Field
            v-model="form.province"
            name="省"
            label="省"
            readonly
            @click="goArea(1)"
            :rules="[{ required: true, message: '请填写省' }]"
          />
          <Field
            v-model="form.city"
            name="市"
            label="市"
            readonly
            @click="goArea(2)"
            :rules="[{ required: true, message: '请填写市' }]"
          />
          <Field
            v-model="form.deptName"
            name="监狱名称"
            label="监狱名称"
            readonly
            @click="goArea(3)"
            :rules="[{ required: true, message: '请填写监狱名称' }]"
          />
          <div style="margin: 16px;">
            <Button round block type="info" native-type="submit">确认</Button>
          </div>
        </Form>
        <!-- 省 -->
        <Popup v-model="showPicker" position="bottom">
          <Picker
            show-toolbar
            :columns="areaData"
            value-key="cname"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          >
          </Picker>
        </Popup>
      </div>
      <div class="box2 box" v-if="boxShow == 3">
        <!-- 信息填写窗口 -->
        <Form >
          <Field
            v-model="form.terminalCode"
            name="终端编号"
            label="终端编号"
            :disabled="true"
          />
          <Button round type="info" style="margin-top: 40px" @click="onSubmit">确认</Button>
          
        </Form>
        <div class="bottomButton">
          <Button round type="info" @click="tab(1)">重新扫描</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let scan = null
// import {plus} from "@/utils/auth"
import { provinceApi, cityApi, prisonApi, insertEquipmentApi } from "@/Api/home.js"
import { Button, Icon, Form, Field, Popup, Picker   } from "vant"
export default {
  name: 'Home',
  components: {
    Button,
    Icon,
    Form,
    Field,
    Popup,
    Picker 
  },
  data(){
    return {
      boxShow: 2,
      //1 二维码扫描窗口 2 信息填写窗口 3 核对扫描信息
      form: {
        province: "", //省
        provinceId: "", // 省id
        city: "", //市
        cityId: "", //市id
        terminalCode: "", //终端编号
        terminalName: "", //终端名称
        terminalModel: "",//设备型号
        deptId: "", //部门ID
        deptName: "",
      },
      areaData: [], //选择器数据
      areaValue: 1, // 1，省 2， 市 3，监狱
      provinceData: [],
      cityData: [],
      prisonData: [],
      showPicker: false,
      codeUrl: '',
    }
  },
  created(){
    this.getProvince();
  },
  mounted(){
    console.log("mounted,mmmmmmmmmmm......................",scan);
  },
  
  methods: {
    goArea(value){
      this.areaValue = value;
      switch(value){
        case 1: 
          this.areaData = this.provinceData
          break;
        case 2: 
          if(this.form.provinceId != ""){
            let sendData ={
              id: this.form.provinceId
            }
            this.getOtherData(sendData, this.areaValue);
          }
          this.areaData = this.cityData
          break;
        case 3: 
          if(this.form.cityId != ""){
            let sendData ={
              id: this.form.cityId
            }
            this.getOtherData(sendData, this.areaValue);
          }
          this.areaData = this.prisonData
          break;
      }
      this.showPicker = true
    },
    getProvince(){
      provinceApi().then(res => {
        if( res.code == 200 ){
          this.provinceData = res.data;
          console.log("provinceApi", res)
        }
      })
    },
    getOtherData(data, type){
      if( type == 2 ){
        // 获取市
        cityApi(data).then(res => {
          if(res.code == 200){
            this.cityData = res.data;
          }
        })
      } else if(type == 3){
        // 获取监狱
        prisonApi(data).then(res => {
          console.log("监狱");
          if(res.code == 200){
            if(res.data.length  == 0){
              this.$notify({
                message: "该市下暂无所属监狱！！",
                type: 'warning'
              })
            } 
            this.prisonData = res.data;
          }
        })
      }
    },
    onConfirm(value) {
      this.showPicker = false;
      if(value){
        this.value = value;
        console.log("点击数据", value);
        console.log("点击数据", this.areaValue);
        
        let data = {
          id: value.id
        };
        if( this.areaValue == 1) {
          if(this.form.province != ""){
            this.$dialog.confirm({
              message: '确认要重新更换省吗，如更换将清空之前所有数据？？',
              theme: 'round-button',
            }).then(() => {
              //
              this.form = {
                province: value.cname, //省
                provinceId: value.id, // 省id
                city: "", //市
                cityId: "", //市id
                terminalCode: "", //终端编号
                terminalName: "", //终端名称
                terminalModel: "",//设备型号
                deptId: "", //部门ID
                deptName: "",
              }
              console.log("确定按钮！！")
            });
          } else {
            // 首次进入
            this.form.province = value.cname;
            this.form.provinceId = value.id;
          }
          // 获取市
          console.log("市", );
          this.getOtherData(data, 2);
          
        } else if(this.areaValue == 2){
          this.form.city = value.cname;
          this.form.cityId = value.id;
          // 获取监狱
          this.getOtherData(data, 3);

        } else if (this.areaValue == 3){
          this.form.deptName = value.cname;
          this.form.deptId = value.id;
        }
      }
    },
    starting() {
      this.startRecognize()
    },
    tab(val){
      if( val == 2 || val == 3){
        // 去填写信息
        console.log(" 关闭ccccccccccccccccccccccccccccccccccc", scan);
        if(scan != "" || scan != null){
          this.cancelScan();
        }
        this.boxShow = val;

      } else if(val == 1) {
        console.log(" 开启AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", scan);
        if(this.form.deptId != ""){
          this.form.terminalCode = ""; //重新扫描时把结果置空
          if(scan == "" || scan == null){
            this.starting();
          } else{
            // 查找扫码控件
            let status = this.findBarcode();
            console.log("查找扫码控件", status);
            if(!status) {
              this.starting();
            } else {
              this.startScan();
              this.boxShow = val;
            }
          }
        } else {
          this.$notify({
            message: "请选择您要录入信息的监狱！！",
            type: 'warning'
          })
          this.boxShow = 2;
        }

      }
    },
    findBarcode() {
      var b = plus.barcode.getBarcodeById('bcid');
      if(b){
        console.log('find success!');
        return true;
      } else {
        console.log('find failed!');
        return false;
      }
    },
    onSubmit(values) {
      // 提交！！
      console.log('submit', values);
      let data = {
        terminalCode: this.form.terminalCode, //终端编号
        terminalName: this.form.terminalName, //终端名称
        terminalModel: this.form.terminalModel,//设备型号
        deptId: this.form.deptId, //部门ID
      }
      insertEquipmentApi(data).then(res => {
        if(res.code == 200){
          this.$notify({
            message: "录入设备成功！！",
            type: "success"
          })
          this.tab(1);
        } else {
          this.$notify({
            message: res.msg,
            type: "warning"
          })

        }
      })
      // this.tab(1);
    },
    // 创建并扫描控件
    startRecognize () {
      console.log("创建扫描控件---------", window.plus);
      let that = this
      if (!window.plus) return
      // scan = new plus.barcode.create('bcid');
      scan = plus.barcode.create('bcid', [plus.barcode.QR], {
        top:'59px',
        left:'0px',
        width: '100%',
        height: '100%',
        position: 'static',
        frameColor: "#409EFF",  
        scanbarColor: "#409EFF",  
        background: "rgba(255,255,255,-20)"
      });
      plus.webview.currentWebview().append(scan);
      console.log("scan、、、、、、、、、、、、、、、、、、、、、、、、", scan);
      // 开始扫描
      console.log("开始扫描");
      that.startScan();
      this.boxShow = 1; // 跳转页面
      scan.onmarked = onmarked
      function onmarked (type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = 'QR'
            break
          case plus.barcode.EAN13:
            type = 'EAN13'
            break
          case plus.barcode.EAN8:
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        console.log("扫描数据",type, result, file);
        result = result.replace(/\n/g, '')
        that.form.terminalCode = result;
        // alert(result)
        that.closeScan()
        that.boxShow = 3
      }
    },
    // 开始扫描
    startScan () {
      console.log("开始扫描数据-----window.plus", window.plus);
      if (!window.plus) return
      scan.start()
    },
    // 关闭扫描
    cancelScan () {
      if (!window.plus) return
      scan.close()
    },
    // 关闭条码识别控件
    closeScan () {
      if (!window.plus) return
      scan.close()
    },
  }
}
</script>
<style lang="scss">
  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 16px;
    .top{
      height: 60px;
      color: #fff;
      background: #409EFF;
      .message, .scan{
        height: 100%;
        padding: 0 20px;
        div {
          height: 100%;
          display: flex;
          align-items: center;
          .van-icon{
            padding-right: 10px;
          }
        }
      }
    }
    // 窗口
    .boxContent{
      width: 100%;
      height: calc(100% - 60px);
      position: relative;
      .box2{
        height: calc(100% - 60px);
        padding-top: 60px;
        position: relative;
        .bottomButton{
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 20px;
          
        }
      }
      /deep/.van-button{
        width: 80%;
        margin: 0 auto 20px;
      }
      #bcid {
        width: 100%;
        height: 100%;
        color: #fff;
        text-align: center;
        background: #ccc;
      }
    }

  }

  .zIndex{
    z-index: 99999 !important;
  }
</style>
