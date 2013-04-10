var utils = require('utils');
var fs = require('fs');
var casper = require('casper').create({
    //	clientScripts:  [
    //		'includes/jquery.js'
    //    	],
    verbose: true,
    onError: function (self, m) {   // Any "error" level message will be written
        console.log('FATAL:' + m); // on the console output and PhantomJS will
        self.exit();               // terminate
    },
    pageSettings: {
        loadImages: false,        // The WebPage instance used by Casper will
        loadPlugins: true        // use these settings
    }
});



var stores = [];
//var products = [];


var GetDatas = [//{ "Name": "Only", "Link": "http://only.tmall.com/shop/view_shop.htm?spm=a220m.1000858.1000719.1.hZ5QY8" },
//{ "Name": "VM", "Link": "http://veromoda.tmall.com/?spm=a1z10.4.3-7152525306.3.M65iIl" },
//{ "Name": "Jack&Jones", "Link": "http://jackjones.tmall.com/?spm=a1z10.4.3-7152525306.1.M65iIl" },
//{ "Name": "SELECTED", "Link": "http://selected.tmall.com/?spm=a1z10.4.3-6385855188.3.Phjbke" },
//{ "Name": "以纯", "Link": "http://yishion.tmall.com/shop/view_shop.htm?spm=a220m.1000858.1000719.1.dWGzsZ" },
//{ "Name": "美邦", "Link": "http://metersbonwe.tmall.com/shop/view_shop.htm?spm=a220m.1000858.1000719.1.ND81JV" },
//{ "Name": "森马", "Link": "http://semir.tmall.com/shop/view_shop.htm?spm=a220m.1000858.1000719.1.rnIpzf" },
{ "Name": "佰林娜旗舰店", "Link": "http://bailinna.tmall.com/shop/view_shop.htm?spm=a1z0d.1.1000638.1.21KNi3&shop_id=59908060" },
//{ "Name": "搜酷箱包", "Link": "http://socool.tmall.com/shop/view_shop.htm?spm=0.0.0.196.srOk0q" },
//{ "Name": "麦包包箱包", "Link": "http://mbaobao.tmall.com/shop/view_shop.htm?spm=0.0.0.190.KMFiOB" },
//{ "Name": "Skin Food", "Link": "http://skinfood.tmall.com/shop/view_shop.htm?spm=a220m.1000858.1000719.1.pLWBbW" },
//{ "Name": "Face Shop", "Link": "http://list.tmall.com/search_shopitem.htm?spm=a220m.1000858.1000725.2.7tWlIw&user_id=435876330&from=_1_&stype=search" },
//{ "Name": "娜拉旗舰店", "Link": "http://nala.tmall.com/?spm=a220o.1000855.3-17547917705.1.qe2ELL" },
//{ "Name": "DULALA", "Link": "http://dulalasp.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.162.Ynpq26&user_number_id=506892368" },
//{ "Name": "欧菲曼", "Link": "http://ofm.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.35.6fViod&user_number_id=673236997" },
//{ "Name": "易燃火山饰品旗舰店", "Link": "http://yibei.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.168.6fViod&user_number_id=129475121" },
//{ "Name": "Twice 配饰旗舰店", "Link": "http://twice.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.154.6fViod&user_number_id=268912768" },
//{ "Name": "威妮华", "Link": "http://viennois.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.140.6fViod&user_number_id=632766087" },
//{ "Name": "唯一饰品旗舰店", "Link": "http://weiyi.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.7.AQ1EjQ&user_number_id=305275946" },
//{ "Name": "三赐礼品专营店", "Link": "http://sanci.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.186.4lNg5Y&user_number_id=186822183" },
//{ "Name": "伊司达", "Link": "http://east.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.104.VpXzns&user_number_id=264688774" },
//{ "Name": "亿银家居", "Link": "http://yiyinjj.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.21.PWcyNZ&user_number_id=665247423" },
//{ "Name": "天工场", "Link": "http://skyworks.tmall.com/shop/view_shop.htm?spm=a1z09.2.9.122.PWcyNZ&user_number_id=729359782" },
//{ "Name": "三星", "Link": "http://samsung.tmall.com/shop/view_shop.htm?spm=a220m.1000858.1000719.1.yJv9uV" },
//{ "Name": "联想", "Link": "http://lenovo.tmall.com/shop/view_shop.htm?spm=a220m.1000858.1000719.1.nsdXcc" },
//{ "Name": "索尼", "Link": "http://sony.tmall.com/shop/view_shop.htm?spm=a220m.1000858.1000719.1.HnsknE" },
//{ "Name": "联通华盛官方旗舰店", "Link": "http://liantonghuasheng.tmall.com/?spm=a220o.1000859.0.94.BiVcAV" },
//{ "Name": "迪信通官方旗舰店", "Link": "http://dphone.tmall.com/?spm=a220o.1000859.0.91.OMDrcA" },
//{ "Name": "味它宠物食品专营店", "Link": "http://wtcwsp.tmall.com/?spm=a220o.1000855.0.193.0U8IXL" },
//{ "Name": "家居日用", "Link": "http://massjoy.tmall.com/?spm=a220o.1000855.0.112.2ioatN" },
//{ "Name": "耐威克宠物用品专营", "Link": "http://nwkcwyp.tmall.com/?spm=a220o.1000855.0.153.VdAor7" },
//{ "Name": "唐品食品专营店", "Link": "http://tpsp.tmall.com/?spm=a220o.1000855.0.160.tq8R7t" },
//{ "Name": "食人谷", "Link": "http://yunnantechan.tmall.com/?spm=a220o.1000855.0.161.PTgHr6" },
//{ "Name": "希朵曼美食商城", "Link": "http://xiduomanhy.tmall.com/?spm=a220o.1000855.0.120.CNwnDF" },
//{ "Name": "心连心食品专营店", "Link": "http://xlxsp.tmall.com/?spm=a220o.1000855.0.130.gRMYY1" },
//{ "Name": "玛海斯酒类专营店", "Link": "http://mfsjl.tmall.com/?spm=a220o.1000855.0.131.9O7EZ2" },
//{ "Name": "醉梦酒类专营店", "Link": "http://zmjl.tmall.com/?spm=a220o.1000855.0.116.P6rrjc" },
//{ "Name": "郎家园酒类专营店", "Link": "http://ljyjl.tmall.com/?spm=a220o.1000855.0.179.Umo0mV" },
//{ "Name": "也买酒官方旗舰店", "Link": "http://msjl.tmall.com/?spm=a220o.1000859.0.91.JDFerO" },
//{ "Name": "美的百分百特专卖店", "Link": "http://mideabfbt.tmall.com/shop/view_shop.htm?spm=a220m.1000862.1000730.2.B5FDGe&user_number_id=793501476" },
//{ "Name": "先锋欧楠专卖店", "Link": "http://singfunon.tmall.com/?spm=a220o.1000859.0.175.6FCWme" },
//{ "Name": "凯莱手表专营店", "Link": "http://klsb.tmall.com/shop/view_shop.htm?spm=a220m.1000862.1000730.3.PpcxEl&user_number_id=506880127" },
//{ "Name": "宾格东宸专卖店", "Link": "http://bingerdc.tmall.com/shop/view_shop.htm?spm=a220m.1000862.1000730.3.TvHADu&user_number_id=1036969135" },
//{ "Name": "佳能相机好邦专卖店", "Link": "http://cnhb.tmall.com/shop/view_shop.htm?spm=a220m.1000862.1000730.3.BjJNat&user_number_id=92380154" },
//{ "Name": "西门子璞高专卖", "Link": "http://shsiemens.tmall.com/shop/view_shop.htm?spm=a220m.1000862.1000730.3.zvcOi1&user_number_id=182522763" },
//{ "Name": "koti柯帝旗舰店", "Link": "http://koti.tmall.com/?spm=a220o.1000855.0.131.qWF1ir" },
//{ "Name": "小奶花旗舰店", "Link": "http://xiaonaihua.tmall.com/shop/view_shop.htm?spm=a220m.1000862.1000730.3.h1YBap&user_number_id=276040311" }
];

var count = 0;
casper.start().each(GetDatas, function (self, data) {
    var products = [];
    self.thenOpen(data.Link, function () {        
    });
    self.wait(5000, function () {
    });
    self.then(function () {
        count++;
        this.echo(count.toString() + '/' + GetDatas.length);        
        var links = this.evaluate(function () {
            var anchorLinks = [];
            try {
                var anchors = __utils__.findAll('a[href^="http://detail.tmall.com/item.htm?spm"]');
                for (var i = 0; i < anchors.length; i++) {
                    anchorLinks.push(anchors[i].getAttribute('href'));
                }
            }
            catch (e) {
            }
            return anchorLinks;
        });
        var product;
        for (var i = 0; i < links.length; i++) {
            product = new Object;
            product.storeName = data.Name;
            product.link = links[i];
            //this.echo(links[i]);
            products.push(product);
        }
    });
    var pCount = 0;

    self.then(function () {
        this.each(products, function (self, product) {
            self.wait(5000, function () {
            });
            self.thenOpen(product.link, function () {
                pCount++;
                this.echo('product:' + pCount.toString() + '/' + products.length);                
                this.echo(product.link);
                product.info = this.evaluate(function () {
                    try {
                        var productName = document.querySelector('.tb-detail-hd').innerText;
                    }
                    catch (e) {
                        return null;
                    }
                    var price = document.querySelector('#J_StrPrice').innerText;
                    try {
                        var promotionalPrice = document.querySelector('#J_PromoBox strong').innerText;
                    }
                    catch (e) {
                        promotionalPrice = 0;
                    }
                    try {
                        
                        var description = document.querySelector('#J_DcTopRightWrap').innerHTML;
                        while (description == '描述加载中') {
                            self.wait(1000);
                            description = document.querySelector('#J_DcTopRightWrap').innerHTML;
                        }
                            
                    }
                    catch (e) {
                        description = '';
                    }
                    try {
                        var options = document.querySelectorAll('.tb-prop');
                    }
                    catch (e) {
                        options = [];
                    }
                    try {
                        var attribute = document.querySelectorAll('#J_AttrList li');
                    }
                    catch (e) {
                        attribute = [];
                    }
                    try {
                        var pics = document.querySelectorAll('#J_UlThumb img');
                    }
                    catch (e) {
                        pics = [];
                    }
                    var mallProduct = new Object;
                    mallProduct.name = productName;
                    mallProduct.price = price;
                    if (promotionalPrice == 0) {
                        mallProduct.shoppingPrice = price;
                    }
                    else {
                        mallProduct.shoppingPrice = promotionalPrice;
                    }
                    mallProduct.description = description;
                    mallProduct.option = [];
                    mallProduct.images = [];
                    mallProduct.attribute = [];
                    var productOption;
                    var optionValues;
                    var j;
                    for (var i = 0; i < options.length; i++) {
                        productOption = new Object;
                        productOption.name = options[i].querySelector('dt').innerText;
                        productOption.options = [];
                        optionValues = options[i].querySelectorAll('dd li span');
                        for (j = 0; j < optionValues.length; j++) {
                            productOption.options.push(optionValues[j].innerText);
                        }
                        mallProduct.option.push(productOption);
                    }
                    for (i = 0; i < pics.length; i++) {
                        mallProduct.images.push(pics[i].getAttribute('src'));
                    }
                    var tempStr = '';
                    var attributeName = '';
                    var attributeValue = '';
                    for (i = 0; i < attribute.length; i++) {
                        j = -1;
                        tempStr = attribute[i].innerHTML;
                        j = tempStr.indexOf('&nbsp;');
                        attributeName = tempStr.substring(0, j);
                        attributeValue = tempStr.substring(j + 6);
                        mallProduct.attribute.push({ name: attributeName, value: attributeValue });
                    }
                    return mallProduct;
                });
            });
        });

    });
	
    self.then(function () {
        var stream = fs.open(data.Name + '.txt', 'a');
        stream.write(utils.serialize(products));
        stream.close();
    });
});

//casper.then(function () {
//    count = 0;
//    this.each(products, function (self, product) {        
       
//    });
//});




casper.run(function () {
    //var stream = fs.open('produts.txt', 'a');
    //stream.write(utils.serialize(products));
    //stream.close();
    this.echo('done').exit();
});


