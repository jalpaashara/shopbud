import {Component, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {IonSlides} from '@ionic/angular';
import {EbayProductsService} from '../services/ebay-products.service';
import {BestbuyProductsService} from '../services/bestbuy-products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchControl: FormControl;
  searching: boolean;
  products: any = [];
  eBayLaptops: any = [];
  bestBuyproducts: any = [];
  popularProducts: any = [];
  serachProducts: any = [];
  bestbuyheader: string;
  ebayheader: string;

  customActionSheetOptions: any = {
    header: 'Category'
  };

  // @ts-ignore
  @ViewChild('slides') slides: IonSlides;
  slideOpts = {
    speed: 1200,
    autoplay: true,
    slidesPerView: 2,
    coverflowEffect: {
      rotate: 50,
      stretch: 1,
      depth: 80,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) { translateX = 0; }
          if (Math.abs(translateY) < 0.001) { translateY = 0; }
          if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
          if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
          if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

          // tslint:disable-next-line:max-line-length
          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
            if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
          }
        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
            .transition(duration)
            .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
            .transition(duration);
      }
    }
  };

  constructor(private bestBuyProductsService: BestbuyProductsService, private ebayProductsService: EbayProductsService) {
    this.searchControl = new FormControl();
    this.getBestBuyMostPopularProducts();
    this.getEBayLaptops();
  }

  onSearchInput() {
    this.searchItem();
  }

  private searchItem() {
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(search => {
      this.searching = false;
      // this.searchTerm = search;

      if (search.length > 0) {
        this.getBestBuyProduct(search);
        this.getEbaySearchProducts(search);
      } else {
        this.getBestBuyMostPopularProducts();
        this.getEBayLaptops();
      }
    });
  }

  private getBestBuyProduct(searchProduct: string) {
    this.bestbuyheader = searchProduct;
    const searchArr = searchProduct.split(' ');
    this.bestBuyProductsService.getBestBuyProducts(searchArr).subscribe((result: any[]) => {
      this.serachProducts = result;
      this.setBestBuyProductData();
    });
  }

  setBestBuyProductData() {
    this.bestBuyproducts = [];
    this.serachProducts.products.map(
        (bestBuyserachProduct) => {
          this.bestBuyproducts.push({
            link: bestBuyserachProduct.url,
            img: bestBuyserachProduct.image,
            name: bestBuyserachProduct.name,
            currentPrice: bestBuyserachProduct.salePrice,
            regularPrice: bestBuyserachProduct.regularPrice
          });
        }
    );
  }

  getBestBuyMostPopularProducts() {
    this.bestbuyheader = 'Most Popular Products';
    this.bestBuyProductsService.getBestBuyMostPopularProducts().subscribe(
        (res: any[]) => {
          this.popularProducts = res;
          this.setBestBuyPopularProductsData();
        });
  }

  private setBestBuyPopularProductsData() {
    this.bestBuyproducts = [];
    this.popularProducts.results.map(
        (bestBuypopularProducts) => {
          this.bestBuyproducts.push({
            link: bestBuypopularProducts.links.web,
            img: bestBuypopularProducts.images.standard,
            name: bestBuypopularProducts.names.title,
            currentPrice: bestBuypopularProducts.prices.current,
            regularPrice: bestBuypopularProducts.prices.regular
          });
        }
    );
  }

  getEBayLaptops() {
    this.ebayheader = 'PC Laptops & Notebooks';
    this.ebayProductsService.getEbayLaptops().subscribe(res => {
      this.eBayLaptops = res;
    });
  }

  getEbaySearchProducts(searchProduct) {
    this.ebayheader = searchProduct;
    this.ebayProductsService.getEBayProducts(searchProduct).subscribe(res => {
      this.eBayLaptops = res;
    });
  }

}
