(this.webpackJsonpcorona=this.webpackJsonpcorona||[]).push([[0],{14:function(e,t,a){},25:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(6),s=a.n(c),l=(a(14),a(4)),i=a(1),o=a.n(i),m=a(3),d=a(2),h=a(7),u=function(){return n.a.createElement("div",{className:"header"},n.a.createElement("div",{className:"headerWrapper"},n.a.createElement("h1",{className:"header-title"},"CORONA",n.a.createElement("span",null,"+"))))},v=function(e){return n.a.createElement("div",{className:"search"},n.a.createElement("input",{"aria-label":"Search country",className:"search-field",placeholder:"Search country..",onChange:function(t){return function(t){t.preventDefault(),e.searchFilter(t.target.value)}(t)},autoComplete:"off"}))},f=function(e){var t=function(e,t){switch(t){case"sortByNonCritical":return e.slice().sort((function(e,t){return e.nonCriticalPercent<t.nonCriticalPercent?1:-1}));case"sortByName":return e.slice().sort((function(e,t){return e.country>t.country?1:-1}));case"sortByCases":return e.slice().sort((function(e,t){return e.cases<t.cases?1:-1}));case"sortByRecovered":default:return e.slice().sort((function(e,t){return e.recoveredPercent<t.recoveredPercent?1:-1}))}};return n.a.createElement("div",{className:"filter"},n.a.createElement("div",{className:"filter-checkbox"},n.a.createElement("input",{type:"checkbox","aria-label":"Toggle death statistics",defaultChecked:!1,onChange:function(){e.hide(!e.hideDeaths)}}),n.a.createElement("span",null,"Show deaths")),n.a.createElement("div",{className:"filterListWrapper"},n.a.createElement("div",{className:"filterListSearchWrapper"},n.a.createElement("div",{className:"filterCategoriesWrapper"},n.a.createElement("span",{className:"filterList-label"},"Sort by: "),n.a.createElement("ul",{className:"filterList resetList"},n.a.createElement("li",{className:"filterList-item ".concat(e.activeFilter.first?"filterList-item--active":""),onClick:function(){var a=t(e.countriesState,"sortByRecovered");e.sortCountriesData(a),e.setFilter({first:!0,second:!1,third:!1,fourth:!1})}},"Recovered"),n.a.createElement("li",{className:"filterList-item ".concat(e.activeFilter.second?"filterList-item--active":""),onClick:function(){var a=t(e.countriesState,"sortByNonCritical");e.sortCountriesData(a),e.setFilter({first:!1,second:!0,third:!1,fourth:!1})}},"Mild cases"),n.a.createElement("li",{className:"filterList-item ".concat(e.activeFilter.third?"filterList-item--active":""),onClick:function(){var a=t(e.countriesState,"sortByName");e.sortCountriesData(a),e.setFilter({first:!1,second:!1,third:!0,fourth:!1})}},"Country"),n.a.createElement("li",{className:"filterList-item ".concat(e.activeFilter.fourth?"filterList-item--active":""),onClick:function(){var a=t(e.countriesState,"sortByCases");e.sortCountriesData(a),e.setFilter({first:!1,second:!1,third:!1,fourth:!0})}},"Total cases"))),n.a.createElement(v,{searchFilter:function(t){return e.setSearchFilter(t)}})),n.a.createElement("span",{className:"filterList-subtitle"},"Only showing countries with over ",e.threshold," cases")))},g=function(e){return n.a.createElement("li",{className:"listItem"},n.a.createElement("div",{className:"listItem-titleWrapper"},n.a.createElement("div",{className:"listItem-title"},n.a.createElement("span",{className:"listItem-flag"},n.a.createElement("img",{src:e.itemData.countryInfo.flag,alt:"Flag of ".concat(e.itemData.country),title:"Flag of ".concat(e.itemData.country),key:e.i,className:"listItem-flag",loading:"lazy",maxwidth:"30",maxheight:"25"})),n.a.createElement("h2",{className:"listItem-countryname"},e.itemData.country)),n.a.createElement("div",{className:"listItem-alertWrapper"},0===e.itemData.todayDeaths&&0===e.itemData.todayCases&&n.a.createElement("div",{className:"listItem-noData highlighted highlightTag"},"No new data since yesterday"),0===e.itemData.todayDeaths&&e.itemData.todayCases>0&&n.a.createElement("div",{className:"listItem-noDeaths highlighted highlightTag"},"No reported deaths today!"),e.itemData.daysWithoutDeaths>1&&e.itemData.daysWithoutDeaths<7&&0===e.itemData.todayDeaths?n.a.createElement("div",{className:"listItem-noDeaths highlighted highlightTag"},"No reported deaths the past ",e.itemData.daysWithoutDeaths," days!"):e.itemData.daysWithoutDeaths>6&&0===e.itemData.todayDeaths?n.a.createElement("div",{className:"listItem-noDeaths highlighted highlightTag"},"No reported deaths in 7+ days!"):"")),n.a.createElement("ul",{className:"listItem-stats resetList"},n.a.createElement("li",{className:"recovered listItem-statsItem"},n.a.createElement("span",{className:"title ".concat(!0===e.activeFilter.first?"listItem--filterIsActive":"")},"Recovered:"),n.a.createElement("div",{className:"listItem-recoveredWrapper"},n.a.createElement("span",{className:"percent ".concat(!0===e.activeFilter.first?"highlighted":"")},e.itemData.recoveredPercent.toFixed(2),"%"),e.itemData.recoveredPercent>e.itemData.recoveredYesterday?n.a.createElement("div",{className:"highlighted plus",title:"Percent of recovered increased since yesterday"},"\u2191"):e.itemData.recoveredPercent===e.itemData.recoveredYesterday?n.a.createElement("div",{className:"highlighted equal",title:"No change since yesterday"},"-"):n.a.createElement("div",{className:"highlighted minus",title:"Percent of recovered decreased since yesterday"},"\u2193"),n.a.createElement("span",null,"(",e.itemData.recovered.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g,","),")"))),n.a.createElement("li",{className:"nonCritical listItem-statsItem"},n.a.createElement("span",{className:"title ".concat(!0===e.activeFilter.second?"listItem--filterIsActive":"")},"Mild cases:"),n.a.createElement("span",{className:"".concat(!0===e.activeFilter.second?"highlighted":"")},e.itemData.nonCriticalPercent.toFixed(2),"%")),n.a.createElement("li",{className:"active listItem-statsItem"},n.a.createElement("span",{className:"title"},"Active cases:"),e.itemData.active.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g,",")),n.a.createElement("li",{className:"cases listItem-statsItem"},n.a.createElement("span",{className:"title ".concat(!0===e.activeFilter.fourth?"listItem--filterIsActive":"")},"Total cases:"),n.a.createElement("span",{className:"".concat(!0===e.activeFilter.fourth?"listItem--filterIsActive":"")},e.itemData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g,","))),!e.hideDeaths&&n.a.createElement("li",{className:"deaths listItem-statsItem"},n.a.createElement("span",{className:"title"},"Total deaths:"),n.a.createElement("span",{className:"deaths-number"},e.itemData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g,",")))))},p=a(8),E=a.n(p),D=function(){return n.a.createElement("div",{className:"loading"},"Loading..")},N=function(e){return n.a.createElement("div",{className:"globalStats componentSpacing"},e.error?n.a.createElement("div",{className:"error"},e.error):n.a.createElement("div",{className:"globalStatsTextWrapper"},n.a.createElement("div",{className:"globalStats-total"},n.a.createElement("strong",null,"Total cases: "),e.globalData?n.a.createElement("span",null,e.globalData.cases.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g,",")):n.a.createElement(D,null)),n.a.createElement("div",{className:"globalStats-recovered highlighted"},n.a.createElement("strong",null,"Recovered: "),e.globalData?n.a.createElement("span",null,e.globalData.recovered.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g,",")):n.a.createElement(D,null),e.globalData&&n.a.createElement("span",{className:"highlighted globalStats-recoveredNumber"},"(",n.a.createElement(E.a,{end:e.globalData.recoveredPercent,separator:",",suffix:"%",delay:.3,decimals:2,duration:3.2}),")")),!e.hideDeaths&&n.a.createElement("div",{className:"globalStats-deaths"},n.a.createElement("strong",null,"Deaths: "),n.a.createElement("span",null,e.globalData.deaths.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g,","))),n.a.createElement("div",{className:"globalStats-updated"},n.a.createElement("strong",null,"Updated: "),e.globalData?n.a.createElement("span",null,e.globalData.updated):n.a.createElement(D,null))))},y=function(e){return n.a.createElement("div",{className:"statsSummary componentSpacing"},n.a.createElement("div",{className:"statsSummary-title"},"Summary"),n.a.createElement("ul",{className:"statsSummary-list"},n.a.createElement("li",{className:"statsSummary-item"},n.a.createElement("strong",{className:"country"},e.globalData.mostRecovered[0].country),"has the highest amount of recovered patients ",n.a.createElement("span",{className:"highlighted"},"(",e.globalData.mostRecovered[0].recoveredPercent.toFixed(),"%)"),", followed by",n.a.createElement("strong",null,e.globalData.mostRecovered[1].country),n.a.createElement("span",{className:"highlighted"},"(",e.globalData.mostRecovered[1].recoveredPercent.toFixed(),"%)"),"and",n.a.createElement("strong",null,e.globalData.mostRecovered[2].country),n.a.createElement("span",{className:"highlighted"},"(",e.globalData.mostRecovered[2].recoveredPercent.toFixed(),"%)")),e.globalData.noDeaths.length>0&&n.a.createElement("li",{className:"statsSummary-item"},e.globalData.noDeaths.map((function(t,a){return n.a.createElement("span",{className:"highlighted",key:a},t.country,0===a&&2===e.globalData.noDeaths.length&&" and ",0===a&&e.globalData.noDeaths.length>2&&", "," ",1===a&&e.globalData.noDeaths.length>2&&" and ")})).slice(0,3),e.globalData.noDeaths.length>3&&"are some of the countries that"," have had ",n.a.createElement("strong",null,"multiple days")," without any reported deaths."),n.a.createElement("li",{className:"statsSummary-item"},"In ",n.a.createElement("span",{className:"highlighted"},e.globalData.criticalLessThanFive.toFixed(),"%"),"of the countries with active cases, ",n.a.createElement("span",{className:"highlighted"},"less than 5% of them are critical."),"*"),e.globalData.recoveredMostDifference.country&&n.a.createElement("li",{className:"statsSummary-item"},n.a.createElement("strong",{className:"country"},e.globalData.recoveredMostDifference.country),"has the highest increase in recoveries from the past day with ",n.a.createElement("span",{className:"highlighted"},"+",e.globalData.recoveredMostDifference.recoveredDifference.toFixed(),"%"),"*")),n.a.createElement("div",{className:"listNotice"},"*Based on countries with at least ",e.threshold," reported cases"))},b=function(){return n.a.createElement("div",{className:"footer componentSpacing"},"Created by ",n.a.createElement("a",{href:"https://www.petterastedt.com/",target:"_blank",alt:"Link to portifolio website",rel:"noopener noreferrer"},"Petter \xc5stedt"),". See the code on ",n.a.createElement("a",{href:"https://github.com/petterastedt/",target:"_blank",alt:"Link to Github",rel:"noopener noreferrer"},"Github"),".")},S=function(){var e=Object(r.useState)(null),t=Object(d.a)(e,2),a=t[0],c=t[1],s=Object(r.useState)([]),i=Object(d.a)(s,2),v=i[0],p=i[1],E=Object(r.useState)(""),D=Object(d.a)(E,2),S=D[0],F=D[1],I=Object(r.useState)(!0),w=Object(d.a)(I,2),C=w[0],x=w[1],P=Object(r.useState)(null),O=Object(d.a)(P,2),j=O[0],k=O[1],L=Object(r.useState)({first:!0}),B=Object(d.a)(L,2),W=B[0],R=B[1],T=new h.NovelCovid;Object(r.useEffect)((function(){Object(m.a)(o.a.mark((function e(){var t,a,r,n,s,l,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T.countries();case 3:return t=e.sent,a=_(t),e.next=7,M(a);case 7:return r=e.sent,n=Y(r),s=U(a,n,r),e.next=12,T.all();case 12:l=e.sent,i=G(l,s),p(s.slice().sort((function(e,t){return e.recoveredPercent<t.recoveredPercent?1:-1}))),c(i),e.next=22;break;case 18:e.prev=18,e.t0=e.catch(0),k("Something went wrong when contacting the API, please try again later."),console.log(e.t0);case 22:case"end":return e.stop()}}),e,null,[[0,18]])})))()}),[]);var A=function(e,t,a){return e/(t-a)*100},M=function(){var e=Object(m.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.map(function(){var e=Object(m.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.historical(null,t.country);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:return a=e.sent,e.next=5,Promise.all(a);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(e){var t=[];return e.forEach((function(e){var a=[];for(var r in e.timeline.deaths)e.timeline.deaths.hasOwnProperty(r)&&a.push(e.timeline.deaths[r]);t.push(a.slice(a.length-7))})),t},U=function(e,t,a){var r=[];return e.forEach((function(e,n){var c,s,i=0;t[n].reverse().forEach((function(e,a){e===t[n][0]&&0!==a&&e!==t[n][a+1]&&(i=a+1)})),a.forEach((function(t){if(e.country.toUpperCase()===t.country.toUpperCase()){var a=Object.values(t.timeline.deaths)[Object.values(t.timeline.deaths).length-1],r=Object.values(t.timeline.cases)[Object.values(t.timeline.cases).length-1],n=Object.values(t.timeline.recovered)[Object.values(t.timeline.recovered).length-1];c=A(n,r,a),s=Math.abs(e.recoveredPercent-c)}})),r.push(Object(l.a)({},e,{historicalData:t[n],daysWithoutDeaths:i,recoveredYesterday:c,recoveredDifference:s}))})),r},G=function(e,t){var a=new Date(e.updated).toLocaleString("sv-SE"),r=A(e.recovered,e.cases,e.deaths),n=t.sort((function(e,t){return t.recoveredPercent-e.recoveredPercent})).slice(0,3),c=t.filter((function(e){return e.daysWithoutDeaths>0&&0===e.todayDeaths})),s=t.filter((function(e){return e.nonCriticalPercent>95})).length/t.length*100,i=t.filter((function(e){return e.recoveredYesterday>0&&e.recoveredYesterday!==e.recoveredPercent})).sort((function(e,t){return t.recoveredDifference-e.recoveredDifference}))[0];return Object(l.a)({},e,{recoveredPercent:r,updated:a,mostRecovered:n,noDeaths:c,criticalLessThanFive:s,recoveredMostDifference:i})},_=function(e){var t=[];return e.forEach((function(e){if(e.cases>1e3&&!e.country.includes("Hong")){var a=A(e.recovered,e.cases,e.deaths),r=A(e.critical,e.cases,e.deaths),n=100-r,c=A(e.active,e.cases,e.deaths);t.push(Object(l.a)({},e,{recoveredPercent:a,criticalPercent:r,nonCriticalPercent:n,activePercent:c}))}})),t};return n.a.createElement("div",{className:"container"},n.a.createElement(u,null),n.a.createElement(N,{countriesData:v,hideDeaths:C,globalData:a,error:j}),a&&n.a.createElement(y,{globalData:a,threshold:1e3}),v&&n.a.createElement(f,{countriesState:v,hide:x,hideDeaths:C,setFilter:R,sortCountriesData:p,activeFilter:W,threshold:1e3,setSearchFilter:function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);F(t)}}),v&&n.a.createElement("ul",{className:"list resetList componentSpacing"}," ",v.filter((function(e){return e.country.includes(S)})).map((function(e,t){return n.a.createElement(g,{itemData:e,activeFilter:W,hideDeaths:C,key:t})}))," "),n.a.createElement("div",{className:"listNotice"},n.a.createElement("a",{href:"https://github.com/NovelCOVID/API",target:"_blank",alt:"Link to Github",rel:"noopener noreferrer"},"Data sources")),n.a.createElement(b,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,a){e.exports=a(25)}},[[9,1,2]]]);
//# sourceMappingURL=main.2e2bf6ad.chunk.js.map