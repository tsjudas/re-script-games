(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{165:function(t,s,i){var a=i(168);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,i(10).default)("27cc3a1e",a,!0,{sourceMap:!1})},167:function(t,s,i){"use strict";var a=i(165);i.n(a).a},168:function(t,s,i){(t.exports=i(9)(!1)).push([t.i,"\n.game-field[data-v-3f52465a]{display:flex;justify-content:center;align-items:center\n}\n.scrollable-field[data-v-3f52465a]{margin:auto;max-height:100%;overflow:auto\n}",""])},171:function(t,s,i){"use strict";i.r(s);var a={x:6,y:6,bombs:10},e={x:12,y:8,bombs:20},n={x:15,y:10,bombs:30},l={data:function(){return{x:6,y:6,bombs:6,field:[],selectedLevel:"Easy",state:"normal",initializing:!1,isInitWarning:!1,timerId:null}},computed:{validation:function(){return this.validateX&&this.validateY&&this.validateBombs},validateX:function(){return/^\d+$/.test(this.x)},validateY:function(){return/^\d+$/.test(this.y)},validateBombs:function(){return/^\d+$/.test(this.bombs)}},methods:{prepareForInitGame:function(){this.x*this.y>5e4?this.isInitWarning=!0:(this.isInitWarning=!1,this.initGame())},initCansel:function(){this.isInitWarning=!1},forceInitGame:function(){this.isInitWarning=!1,this.initGame()},initGame:function(){this.initializing=!0,setTimeout(this.initField,100)},initField:function(){this.field=[];for(var t=0;t<this.y;t++){for(var s={id:t,cols:[]},i=0;i<this.x;i++)s.cols.push({id:t+i,num:0});this.field.push(s)}this.initializing=!1},selectEasy:function(){this.x=a.x,this.y=a.y,this.bombs=a.bombs,this.selectedLevel="Easy"},selectMedium:function(){this.x=e.x,this.y=e.y,this.bombs=e.bombs,this.selectedLevel="Medium"},selectHard:function(){this.x=n.x,this.y=n.y,this.bombs=n.bombs,this.selectedLevel="Hard"}}},c=(i(167),i(15)),o=Object(c.a)(l,function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"tile is-parent is-vertical"},[t._m(0),t._v(" "),i("div",{staticClass:"tile is-child is-vertical notification"},[i("p",{staticClass:"title"},[t._v("Configs")]),t._v(" "),i("div",{staticClass:"tabs is-boxed"},[i("ul",[i("li",{class:{"is-active":"Easy"===t.selectedLevel}},[i("a",{on:{click:function(s){t.selectEasy()}}},[i("span",[t._v("Easy")])])]),t._v(" "),i("li",{class:{"is-active":"Medium"===t.selectedLevel}},[i("a",{on:{click:function(s){t.selectMedium()}}},[i("span",[t._v("Medium")])])]),t._v(" "),i("li",{class:{"is-active":"Hard"===t.selectedLevel}},[i("a",{on:{click:function(s){t.selectHard()}}},[i("span",[t._v("Hard")])])])])]),t._v(" "),i("div",{staticClass:"columns is-desktop"},[i("div",{staticClass:"column"},[i("div",{staticClass:"field has-addons"},[t._m(1),t._v(" "),i("p",{staticClass:"control has-icons-left"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.x,expression:"x"}],staticClass:"input",attrs:{type:"tel"},domProps:{value:t.x},on:{input:function(s){s.target.composing||(t.x=s.target.value)}}}),t._v(" "),t._m(2)])]),t._v(" "),i("p",{staticClass:"help is-danger",style:{display:t.validateX?"none":""}},[t._v("number only!")])]),t._v(" "),i("div",{staticClass:"column"},[i("div",{staticClass:"field has-addons"},[t._m(3),t._v(" "),i("p",{staticClass:"control has-icons-left"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.y,expression:"y"}],staticClass:"input",attrs:{type:"tel"},domProps:{value:t.y},on:{input:function(s){s.target.composing||(t.y=s.target.value)}}}),t._v(" "),t._m(4)])]),t._v(" "),i("p",{staticClass:"help is-danger",style:{display:t.validateY?"none":""}},[t._v("number only!")])]),t._v(" "),i("div",{staticClass:"column"},[i("div",{staticClass:"field has-addons"},[t._m(5),t._v(" "),i("p",{staticClass:"control has-icons-left"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.bombs,expression:"bombs"}],staticClass:"input",attrs:{type:"tel"},domProps:{value:t.bombs},on:{input:function(s){s.target.composing||(t.bombs=s.target.value)}}}),t._v(" "),t._m(6)])]),t._v(" "),i("p",{staticClass:"help is-danger",style:{display:t.validateBombs?"none":""}},[t._v("number only!")])])])]),t._v(" "),i("div",{staticClass:"tile is-child is-vertical"},[i("button",{staticClass:"button is-primary is-rounded",class:{"is-loading":t.initializing},attrs:{disabled:!t.validation||t.initializing},on:{click:function(s){t.prepareForInitGame()}}},[t._v("Init game")])]),t._v(" "),i("div",{staticClass:"tile is-child is-vertical notification"},[i("div",{staticClass:"game-field"},[i("div",{staticClass:"scrollable-field"},[i("table",{staticClass:"table is-bordered is-hoverable",staticStyle:{margin:"auto"}},[i("tbody",t._l(t.field,function(s){return i("tr",{key:s.id},t._l(s.cols,function(s){return i("td",{key:s.id},[i("div",[t._v(t._s(s.num))])])}))}))])])])]),t._v(" "),i("div",{staticClass:"modal",class:{"is-active":t.isInitWarning}},[i("div",{staticClass:"modal-background"}),t._v(" "),i("div",{staticClass:"modal-card"},[i("header",{staticClass:"modal-card-head"},[i("p",{staticClass:"modal-card-title"},[t._v("Warning")]),t._v(" "),i("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(s){t.initCansel()}}})]),t._v(" "),t._m(7),t._v(" "),i("footer",{staticClass:"modal-card-foot"},[i("button",{staticClass:"button is-success",on:{click:function(s){t.forceInitGame()}}},[t._v("Agree")]),t._v(" "),i("button",{staticClass:"button",on:{click:function(s){t.initCansel()}}},[t._v("Cancel")])])])])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"tile is-child is-vertical"},[s("p",{staticClass:"title"},[this._v("Mine Sweeper")]),this._v(" "),s("p",{staticClass:"subtitle"},[this._v("\n      マインスイーパ\n    ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticClass:"control"},[s("a",{staticClass:"button is-static"},[this._v("\n              x\n            ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("span",{staticClass:"icon is-small is-left"},[s("i",{staticClass:"fas fa-arrows-alt-h"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticClass:"control"},[s("a",{staticClass:"button is-static"},[this._v("\n              y\n            ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("span",{staticClass:"icon is-small is-left"},[s("i",{staticClass:"fas fa-arrows-alt-v"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticClass:"control"},[s("a",{staticClass:"button is-static"},[this._v("\n              bombs\n            ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("span",{staticClass:"icon is-small is-left"},[s("i",{staticClass:"fas fa-list-ol"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("section",{staticClass:"modal-card-body"},[s("p",[this._v("CPUに高負荷がかかる可能性があります。")])])}],!1,null,"3f52465a",null);o.options.__file="mine.vue";s.default=o.exports}}]);