import { Page } from 'chitu.mobile';
import Vue = require('vue');
import * as services from 'services';
import 'controls/imageBox';

export default function (page: Page) {
    let cateoriesPromise = services.shop.cateories();
    let vm = new Vue({
        el: page.dataView,
        data: {
            cateories: [],
        },
        render
    });

    cateoriesPromise.then(items => {
        vm.cateories = items;
        page.loadingView.style.display = 'none';
    })

    function render(h) {
        return (
            <section class="main">
                <div class="row">
                    {this.cateories.map(item => (
                        <a href={`#home_productList?categoryId=${item.Id}`} class="col-xs-3">
                            <image-box src={item.ImagePath}></image-box>
                            <span class="mini interception">{item.Name}</span>
                        </a>
                    ))}
                </div>
            </section>
        );
    }

    createHeader(page);
}

function createHeader(page: Page) {
    new Vue({
        el: page.header,
        render(h) {
            return (
                <header>
                    <nav class="search bg-primary">
                        <div name="search-box" class="form-control" style="">
                            寻找商品、品牌、品类
                        </div>
                        <div class="search-icon">
                            <i class="icon-search"></i>
                        </div>
                    </nav>
                </header>
            );
        }
    })
}