import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../../common/services/app.service';
import { ManageService } from '../../services/manage.service';
import {CoalService} from "../../../coal/services/coal.service";

/**
 * Generated class for the CoalPriceManage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-coal-price-manage',
  templateUrl: 'coal-price-manage.html',
})
export class CoalPriceManagePage {

  productPrice: any = "";
  productTypeList: any = [];
  currentProductList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public heyApp: AppService,
    public coalService: CoalService,
    public manageService: ManageService) {

    this.productPrice = navParams.data;
    this.currentProductList = this.productPrice.currentProductList;
  }

  ionViewDidLoad() {

    if(!this.productPrice.productType.name){
      let data: Object = {
        factoryType: this.productPrice.factory.factoryType
      };

      this.coalService.getProductTypeList(data)
        .then(ret => {

          this.productTypeList = ret;

          // let currentProducts = [];
          // if(this.productPrice.currentProductList){
          //   for(let product of this.productPrice.currentProductList){
          //     currentProducts.push(product.productType.id);
          //   }
          // }
          // for(let product of ret){
          //   if(!this.contains(currentProducts, product.id)){
          //     this.productTypeList.push(product);
          //   }
          // }

        });
    }

  }

  contains(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
}


  uploadImg(event, imagesName) {
    this.heyApp.utilityComp.presentLoading();
    let files = event.srcElement.files;

    this.heyApp.fileUploadService.upload(this.heyApp.fileUploadService.imageUploadAPI, files)
      .then(data => {
        this.productPrice[imagesName] = data;
        this.heyApp.utilityComp.dismissLoading();
      }, () => {
        this.heyApp.utilityComp.dismissLoading();
      });
  }

  onSubmit() {

    if(this.productPrice.state == 1){
      this.productPrice.state = 1;
    } else {
      this.productPrice.state = 0;
    }

    if(!this.productPrice.productType.id){
      this.heyApp.utilityComp.presentToast("必须选择产品种类！");
      return;
    }

    if(this.productPrice.coalWashing == undefined && this.productPrice.factory.factoryType==1){
      this.heyApp.utilityComp.presentToast("必须选择是否水洗!");
      return;
    }

    if(this.productPrice.graded == undefined && this.productPrice.factory.factoryType==1){
      this.heyApp.utilityComp.presentToast("必须选择是否过筛!");
      return;
    }

    if(this.currentProductList){
      for(let product of this.currentProductList){

        if(product.productType.id == this.productPrice.productType.id
          && this.productPrice.factory.factoryType==2){

          this.heyApp.utilityComp.presentToast("该产品种类已经添加过，不能重复添加");
          return;
        }

        if(product.productType.id+"" == this.productPrice.productType.id
          && product.coalWashing+""==this.productPrice.coalWashing
          && product.graded+""==this.productPrice.graded
          && this.productPrice.factory.factoryType==1){

          this.heyApp.utilityComp.presentToast("该产品种类已经添加过，不能重复添加");
          return;
        }
      }
    }

    this.manageService.saveOrUpdateProductPrice(this.productPrice)
      .then(ret => {
        this.heyApp.utilityComp.presentToast("提交成功");
        this.navCtrl.pop();
      });
  }

}
