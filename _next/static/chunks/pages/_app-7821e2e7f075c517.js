(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{3837:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return a(8344)}])},985:function(e,t){"use strict";t.Z={src:"/DSVI_Tool_v3/_next/static/media/logo-sdg-ai-lab-black-alpha.dbfcb0bf.png",height:400,width:400,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA60lEQVR42nWOQUrDQBiFH0Yoxo5C/pn5DaaZzmRSbR1iRaQIZmMRixZcaRe6dSsIHsADuBA8gngEz+EBvIyTA/g2b/Ee33vw3gv8I+tsH865Sim1KooiZ+YryuhMWmPVjn4YDYeHsNaWWuvTGGpJNBMsDzSgCb0lMlF3hIKILiNF7k7GrAE6//zy329PF89zN+0IjpmXeZ67eVMRgOzn43H/9/1lcX93ewxjTB1CSBDFpBil2r4GNk+AIwCmm/Dxw42UMom+YqUXes+VfebXsatGXYGFEFtpmm60bbs2CWF91jTJtPa9YjDI/wBzHSC6kzpNbwAAAABJRU5ErkJggg=="}},3819:function(e,t,a){"use strict";a.d(t,{f:function(){return c},h:function(){return u}});var r=a(5893),n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),r.forEach((function(t){i(e,t,a[t])}))}return e}var s={show_data:!1,show_sidebar_data:!1,show_infoBox_data:!1,show_sidebar:!0,level:1,show_area_of_interest:!1,socioeconomic:{status:!1,data:[{id:1,slug:"se_social_vulnerability",title:"Social Vulnerability",data:[{id:1.1,slug:"se_random_forest",title:"SV: Random Forest",status:!1,value:70},{id:1.2,slug:"se_xgboost",title:"SV: XGBoost",status:!1,value:70}]},{id:2,slug:"se_drive_time",title:"Drive Time",data:[{id:2.1,slug:"se_education_facility",title:"DT: Education Facility",status:!1,value:70},{id:2.2,slug:"se_health_institution",title:"DT: Health Institution",status:!1,value:70},{id:2.3,slug:"se_financial_service",title:"DT: Financial Service",status:!1,value:70}]},{id:3,slug:"se_socio_economic",title:"Socio Economic",data:[{id:3.1,slug:"se_population_counts",title:"Population Counts",status:!1,value:70},{id:3.2,slug:"se_celltowers",title:"Celltowers",status:!1,value:70},{id:3.3,slug:"se_nightlight_intensity",title:"Nightlight Intensity",status:!1,value:70},{id:3.4,slug:"se_relative_wealth",title:"Relative Wealth",status:!1,value:70},{id:3.5,slug:"se_GDP",title:"GDP",status:!1,value:70}]},{id:4,slug:"se_bio_physical",title:"Bio-Physical",data:[{id:4.1,slug:"se_plant_health",title:"Plant Health",status:!1,value:70},{id:4.2,slug:"se_temperature_max",title:"Temperature (Max)",status:!1,value:70},{id:4.3,slug:"se_land_use_class",title:"Land Use Class",status:!1,value:70},{id:4.4,slug:"se_elevation",title:"Elevation",status:!1,value:70}]}]},geodata:{status:!1,data:[{id:1,slug:"social_vulnerability",title:"Social Vulnerability",data:[{id:1.1,slug:"sv_linear_model",title:"SV: Linear Model",status:!1,value:70,layer:"sdg-ai-lab:Linear_SV"},{id:1.2,slug:"sv_xgboost",title:"SV: XG Boost",status:!1,value:70,layer:"sdg-ai-lab:XGBoost_tuned_scaled_clipped_final"},{id:1.3,slug:"sv_random_forest",title:"SV: Random Forest",status:!1,value:70,layer:"sdg-ai-lab:Random_Forest_tuned_scaled_clp_final"}]},{id:2,slug:"distance_maps",title:"Distance Maps",data:[{id:2.1,slug:"distance_to_healthcare",title:"Distance to Healthcare",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_health_dd_spd_10k"},{id:2.2,slug:"distance_to_finance",title:"Distance to Finance",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_finan_dd_spd_10k_4326"},{id:2.3,slug:"distance_to_edu",title:"Distance to Education",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_edu_dd_spd_10k_4326"}]},{id:3,slug:"bio_physical",title:"Bio Physical Layers",data:[{id:3.1,slug:"elevation",title:"Elevation in meters",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_DEM_Large"},{id:3.2,slug:"slope",title:"Slope in degrees",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_slope"},{id:3.3,slug:"max_temp",title:"Max Temp Winter",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_maxtemp_feb"},{id:3.4,slug:"plant_health",title:"Plant Health (NDVI)",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_NDVI"},{id:3.5,slug:"precipitation",title:"Rainfall",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_precip"}]},{id:4,slug:"socio_economic",title:"Socio Economic",data:[{id:4.1,slug:"nightlight_intensity",title:"Nightlight Intensity",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_NTL"},{id:4.2,slug:"pop_density",title:"Population Density",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_pop"},{id:4.3,slug:"celltower",title:"Celltower Density",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_cellt"},{id:4.4,slug:"road_density",title:"Road Density",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_road_density"},{id:4.5,slug:"relative_wealth",title:"Relative Wealth",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_rwi_heatmap_filled_final"},{id:4.6,slug:"gdp",title:"Gross Domestic Product",status:!1,value:70,layer:"sdg-ai-lab:scaled_r_norm_GDP_2015_intp"}]}]},vulnerability:!1,csv_data_vulnerability:[],categories:[{id:1,title:"Very Low",slug:"very_low",color:"rgb(59 130 246)",status:!0},{id:2,title:"Low",slug:"low",color:"rgb(34 197 94)",status:!0},{id:3,title:"Medium",slug:"medium",color:"rgb(234 179 8)",status:!0},{id:4,title:"High",slug:"high",color:"rgb(249 115 22)",status:!0},{id:5,title:"Very High",slug:"very_high",color:"rgb(239 68 68)",status:!0}],dsv_indicator:!1,data_column:[{id:0,slug:"select_none",title:"SELECT_NONE",status:!1},{id:1,slug:"Main floor material",title:"Main floor material",status:!1},{id:2,slug:"Number of household members (listed)",title:"Number of household members (listed)",status:!1},{id:3,slug:"Frequency of listening to radio",title:"Frequency of listening to radio",status:!1},{id:4,slug:"Age of household head",title:"Age of household head",status:!1},{id:5,slug:"Time to get to water source",title:"Time to get to water source",status:!1},{id:6,slug:"Beating justified if wife goes out without telling husband",title:"Beating justified if wife goes out without telling husband",status:!1},{id:7,slug:"Getting medical help for self: distance to health facility",title:"Getting medical help for self: distance to health facility",status:!1},{id:8,slug:"Wealth index combined",title:"Wealth index combined",status:!1},{id:9,slug:"How often uses internet",title:"How often uses internet",status:!1},{id:10,slug:"Annual_Precipitation_2000",title:"Annual_Precipitation_2000",status:!1},{id:11,slug:"Aridity_2000",title:"Aridity_2000",status:!1},{id:12,slug:"BUILT_Population_1990",title:"BUILT_Population_1990",status:!1},{id:13,slug:"Annual_Precipitation_2010",title:"Annual_Precipitation_2010",status:!1},{id:14,slug:"BUILT_Population_2014",title:"BUILT_Population_2014",status:!1},{id:15,slug:"Day_Land_Surface_Temp_2015",title:"Day_Land_Surface_Temp_2015",status:!1},{id:16,slug:"Day_Land_Surface_Temp_2005",title:"Day_Land_Surface_Temp_2005",status:!1}],selected_data_column:"0",dhs_indicator:!1,dhs_data_column:[],selected_dhs_data_column:"0",draw_area_of_interest:!1,statistics:!1,csv_data:[],on_homepage:!1},l=function(e,t){switch(t.type){case"TOGGLE_SHOW_DATA":return o({},e,{show_data:!e.show_data});case"TOGGLE_SIDEBAR_DATA":return o({},e,{show_sidebar_data:!e.show_sidebar_data});case"TOGGLE_INFOBOX_DATA":return o({},e,{show_infoBox_data:!e.show_infoBox_data});case"TOGGLE_SIDEBAR":return o({},e,{show_sidebar:!e.show_sidebar});case"CHANGE_LEVEL":return console.log("payload"+JSON.stringify(t.payload)),o({},e,{level:t.payload.level});case"TOGGLE_AREA_OF_INTEREST":return o({},e,{show_area_of_interest:!e.show_area_of_interest});case"TOGGLE_SOCIOECONOMIC":return o({},e,{socioeconomic:{status:!e.socioeconomic.status,data:e.socioeconomic.data}});case"CHANGE_SOCIOECONOMIC":return o({},e,{socioeconomic:{status:e.socioeconomic.status,data:t.payload}});case"TOGGLE_GEODATA":return o({},e,{geodata:{status:!e.geodata.status,data:e.geodata.data}});case"CHANGE_GEODATA":return o({},e,{geodata:{status:e.geodata.status,data:t.payload}});case"TOGGLE_VULNERABILITY":return o({},e,{vulnerability:!e.vulnerability});case"FETCH_CSV_DATA_VULNERABILITY":return o({},e,{csv_data_vulnerability:t.payload});case"CHANGE_CATEGORIES":return o({},e,{categories:t.payload});case"TOGGLE_DSV_INDICATOR":return o({},e,{dsv_indicator:!e.dsv_indicator});case"SELECT_DATA_COLUMN":return o({},e,{selected_data_column:t.payload});case"TOGGLE_DHS_INDICATOR":return o({},e,{dhs_indicator:!e.dhs_indicator});case"SELECT_DHS_DATA_COLUMN":return o({},e,{selected_dhs_data_column:t.payload});case"TOGGLE_DRAW_OF_INTEREST":return o({},e,{draw_area_of_interest:!e.draw_area_of_interest});case"TOGGLE_STATISTICS":return o({},e,{show_statistics:!e.show_statistics});case"FETCH_CSV_DATA":return o({},e,{csv_data:t.payload});case"FETCH_DHS_COLUMN":return o({},e,{dhs_data_column:t.payload});case"QUIT_HOMEPAGE":return o({},e,{on_homepage:t.payload});default:return e}},c=n.createContext(),u=function(e){var t=e.children,a=(0,n.useReducer)(l,s),i=a[0],o=a[1];return(0,r.jsx)(c.Provider,{value:{state:i,dispatch:o},children:t})}},3483:function(e,t,a){"use strict";a.d(t,{v:function(){return c},A:function(){return u}});var r=a(5893),n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),r.forEach((function(t){i(e,t,a[t])}))}return e}var s={title:"",description:"",data:[]},l=function(e,t){switch(t.type){case"CHANGE_ALL_DATA":return o({},e,{title:t.payload.title,description:t.payload.description,data:t.payload.data});case"RESET_DATA":return{title:"",description:"",data:[]};case"TOGGLE_SHOW_DATA":return o({},e,{show_data:!e.show_data});case"TOGGLE_SIDEBAR_DATA":return o({},e,{show_sidebar_data:!e.show_sidebar_data});case"TOGGLE_SIDEBAR":return o({},e,{show_sidebar:!e.show_sidebar});case"TOGGLE_AREA_OF_INTEREST":return o({},e,{show_area_of_interest:!e.show_area_of_interest});case"TOGGLE_SOCIOECONOMIC":return o({},e,{socioeconomic:{status:!e.socioeconomic.status,data:e.socioeconomic.data}});case"CHANGE_SOCIOECONOMIC":return o({},e,{socioeconomic:{status:e.socioeconomic.status,data:t.payload}});case"TOGGLE_GEODATA":return o({},e,{geodata:{status:!e.geodata.status,data:e.geodata.data}});case"CHANGE_GEODATA":return o({},e,{geodata:{status:e.geodata.status,data:t.payload}});case"TOGGLE_VULNERABILITY":return o({},e,{vulnerability:!e.vulnerability});case"CHANGE_CATEGORIES":return o({},e,{categories:t.payload});case"TOGGLE_DSV_INDICATOR":return o({},e,{dsv_indicator:!e.dsv_indicator});case"SELECT_DATA_COLUMN":return o({},e,{selected_data_column:t.payload});case"TOGGLE_DRAW_OF_INTEREST":return o({},e,{draw_area_of_interest:!e.draw_area_of_interest});case"TOGGLE_STATISTICS":return o({},e,{show_statistics:!e.show_statistics});default:return e}},c=n.createContext(),u=function(e){var t=e.children,a=(0,n.useReducer)(l,s),i=a[0],o=a[1];return(0,r.jsx)(c.Provider,{value:{legendData:i,dispatch:o},children:t})}},9749:function(e,t,a){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,i=[],o=!0,s=!1;try{for(a=a.call(e);!(o=(r=a.next()).done)&&(i.push(r.value),!t||i.length!==t);o=!0);}catch(l){s=!0,n=l}finally{try{o||null==a.return||a.return()}finally{if(s)throw n}}return i}}(e,t)||s(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||s(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){if(e){if("string"===typeof e)return r(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?r(e,t):void 0}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.src,a=e.sizes,r=e.unoptimized,s=void 0!==r&&r,l=e.priority,c=void 0!==l&&l,p=e.loading,m=e.lazyRoot,w=void 0===m?null:m,S=e.lazyBoundary,C=void 0===S?"200px":S,T=e.className,I=e.quality,D=e.width,N=e.height,G=e.style,k=e.objectFit,R=e.objectPosition,M=e.onLoadingComplete,P=e.placeholder,z=void 0===P?"empty":P,B=e.blurDataURL,V=y(e,["src","sizes","unoptimized","priority","loading","lazyRoot","lazyBoundary","className","quality","width","height","style","objectFit","objectPosition","onLoadingComplete","placeholder","blurDataURL"]),U=u.useContext(g.ImageConfigContext),H=u.useMemo((function(){var e=b||U||f.imageConfigDefault,t=o(e.deviceSizes).concat(o(e.imageSizes)).sort((function(e,t){return e-t})),a=e.deviceSizes.sort((function(e,t){return e-t}));return _({},e,{allSizes:t,deviceSizes:a})}),[U]),F=V,W=a?"responsive":"intrinsic";"layout"in F&&(F.layout&&(W=F.layout),delete F.layout);var Y=E;if("loader"in F){if(F.loader){var Z=F.loader;Y=function(e){e.config;var t=y(e,["config"]);return Z(t)}}delete F.loader}var q="";if(function(e){return"object"===typeof e&&(x(e)||function(e){return void 0!==e.src}(e))}(t)){var X=x(t)?t.default:t;if(!X.src)throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(X)));if(B=B||X.blurDataURL,q=X.src,(!W||"fill"!==W)&&(N=N||X.height,D=D||X.width,!X.height||!X.width))throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(X)))}t="string"===typeof t?t:q;var J=O(D),Q=O(N),K=O(I),$=!c&&("lazy"===p||"undefined"===typeof p);(t.startsWith("data:")||t.startsWith("blob:"))&&(s=!0,$=!1);v.has(t)&&($=!1);var ee,te=i(u.useState(!1),2),ae=te[0],re=te[1],ne=i(h.useIntersection({rootRef:w,rootMargin:C,disabled:!$}),3),ie=ne[0],oe=ne[1],se=ne[2],le=!$||oe,ce={boxSizing:"border-box",display:"block",overflow:"hidden",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},ue={boxSizing:"border-box",display:"block",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},de=!1,fe={position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",padding:0,border:"none",margin:"auto",display:"block",width:0,height:0,minWidth:"100%",maxWidth:"100%",minHeight:"100%",maxHeight:"100%",objectFit:k,objectPosition:R};0;0;var he=Object.assign({},G,"raw"===W?{}:fe),ge="blur"!==z||ae?{}:{filter:"blur(20px)",backgroundSize:k||"cover",backgroundImage:'url("'.concat(B,'")'),backgroundPosition:R||"0% 0%"};if("fill"===W)ce.display="block",ce.position="absolute",ce.top=0,ce.left=0,ce.bottom=0,ce.right=0;else if("undefined"!==typeof J&&"undefined"!==typeof Q){var pe=Q/J,me=isNaN(pe)?"100%":"".concat(100*pe,"%");"responsive"===W?(ce.display="block",ce.position="relative",de=!0,ue.paddingTop=me):"intrinsic"===W?(ce.display="inline-block",ce.position="relative",ce.maxWidth="100%",de=!0,ue.maxWidth="100%",ee="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27".concat(J,"%27%20height=%27").concat(Q,"%27/%3e")):"fixed"===W&&(ce.display="inline-block",ce.position="relative",ce.width=J,ce.height=Q)}else 0;var _e={src:A,srcSet:void 0,sizes:void 0};le&&(_e=j({config:H,src:t,unoptimized:s,layout:W,width:J,quality:K,sizes:a,loader:Y}));var ye=t;0;var be;0;var ve=(n(be={},"imagesrcset",_e.srcSet),n(be,"imagesizes",_e.sizes),be),Ae=u.default.useLayoutEffect,we=u.useRef(M),xe=u.useRef(t);u.useEffect((function(){we.current=M}),[M]),Ae((function(){xe.current!==t&&(se(),xe.current=t)}),[se,t]);var je=_({isLazy:$,imgAttributes:_e,heightInt:Q,widthInt:J,qualityInt:K,layout:W,className:T,imgStyle:he,blurStyle:ge,loading:p,config:H,unoptimized:s,placeholder:z,loader:Y,srcString:ye,onLoadingCompleteRef:we,setBlurComplete:re,setIntersection:ie,isVisible:le},F);return u.default.createElement(u.default.Fragment,null,"raw"===W?u.default.createElement(L,Object.assign({},je)):u.default.createElement("span",{style:ce},de?u.default.createElement("span",{style:ue},ee?u.default.createElement("img",{style:{display:"block",maxWidth:"100%",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},alt:"","aria-hidden":!0,src:ee}):null):null,u.default.createElement(L,Object.assign({},je))),c?u.default.createElement(d.default,null,u.default.createElement("link",Object.assign({key:"__nimg-"+_e.src+_e.srcSet+_e.sizes,rel:"preload",as:"image",href:_e.srcSet?void 0:_e.src},ve))):null)};var l,c,u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,a):{};r.get||r.set?Object.defineProperty(t,a,r):t[a]=e[a]}return t.default=e,t}(a(7294)),d=(l=a(3121))&&l.__esModule?l:{default:l},f=a(139),h=a(9246),g=a(8730),p=(a(670),a(2700));function m(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _(e){for(var t=arguments,a=function(a){var r=null!=t[a]?t[a]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){m(e,t,r[t])}))},r=1;r<arguments.length;r++)a(r);return e}function y(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}c={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"",loader:"akamai",experimentalLayoutRaw:!1};var b={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"",loader:"akamai",experimentalLayoutRaw:!1},v=new Set,A=(new Map,"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");var w=new Map([["default",function(e){var t=e.config,a=e.src,r=e.width,n=e.quality;0;if(a.endsWith(".svg")&&!t.dangerouslyAllowSVG)return a;return"".concat(p.normalizePathTrailingSlash(t.path),"?url=").concat(encodeURIComponent(a),"&w=").concat(r,"&q=").concat(n||75)}],["imgix",function(e){var t=e.config,a=e.src,r=e.width,n=e.quality,i=new URL("".concat(t.path).concat(C(a))),o=i.searchParams;o.set("auto",o.get("auto")||"format"),o.set("fit",o.get("fit")||"max"),o.set("w",o.get("w")||r.toString()),n&&o.set("q",n.toString());return i.href}],["cloudinary",function(e){var t=e.config,a=e.src,r=e.width,n=e.quality,i=["f_auto","c_limit","w_"+r,"q_"+(n||"auto")].join(",")+"/";return"".concat(t.path).concat(i).concat(C(a))}],["akamai",function(e){var t=e.config,a=e.src,r=e.width;return"".concat(t.path).concat(C(a),"?imwidth=").concat(r)}],["custom",function(e){var t=e.src;throw new Error('Image with src "'.concat(t,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}]]);function x(e){return void 0!==e.default}function j(e){var t=e.config,a=e.src,r=e.unoptimized,n=e.layout,i=e.width,s=e.quality,l=e.sizes,c=e.loader;if(r)return{src:a,srcSet:void 0,sizes:void 0};var u=function(e,t,a,r){var n=e.deviceSizes,i=e.allSizes;if(r&&("fill"===a||"responsive"===a||"raw"===a)){for(var s,l=/(^|\s)(1?\d?\d)vw/g,c=[];s=l.exec(r);s)c.push(parseInt(s[2]));if(c.length){var u,d=.01*(u=Math).min.apply(u,o(c));return{widths:i.filter((function(e){return e>=n[0]*d})),kind:"w"}}return{widths:i,kind:"w"}}return"number"!==typeof t||"fill"===a||"responsive"===a?{widths:n,kind:"w"}:{widths:o(new Set([t,2*t].map((function(e){return i.find((function(t){return t>=e}))||i[i.length-1]})))),kind:"x"}}(t,i,n,l),d=u.widths,f=u.kind,h=d.length-1;return{sizes:l||"w"!==f?l:"100vw",srcSet:d.map((function(e,r){return"".concat(c({config:t,src:a,quality:s,width:e})," ").concat("w"===f?e:r+1).concat(f)})).join(", "),src:c({config:t,src:a,quality:s,width:d[h]})}}function O(e){return"number"===typeof e?e:"string"===typeof e?parseInt(e,10):void 0}function E(e){var t,a=(null===(t=e.config)||void 0===t?void 0:t.loader)||"default",r=w.get(a);if(r)return r(e);throw new Error('Unknown "loader" found in "next.config.js". Expected: '.concat(f.VALID_LOADERS.join(", "),". Received: ").concat(a))}function S(e,t,a,r,n,i){e&&e.src!==A&&e["data-loaded-src"]!==t&&(e["data-loaded-src"]=t,("decode"in e?e.decode():Promise.resolve()).catch((function(){})).then((function(){if(e.parentNode&&(v.add(t),"blur"===r&&i(!0),null===n||void 0===n?void 0:n.current)){var a=e.naturalWidth,o=e.naturalHeight;n.current({naturalWidth:a,naturalHeight:o})}})))}var L=function(e){var t=e.imgAttributes,a=e.heightInt,r=e.widthInt,n=e.qualityInt,i=e.layout,o=e.className,s=e.imgStyle,l=e.blurStyle,c=e.isLazy,d=e.placeholder,f=e.loading,h=e.srcString,g=e.config,p=e.unoptimized,m=e.loader,b=e.onLoadingCompleteRef,v=e.setBlurComplete,A=e.setIntersection,w=e.onLoad,x=e.onError,O=(e.isVisible,y(e,["imgAttributes","heightInt","widthInt","qualityInt","layout","className","imgStyle","blurStyle","isLazy","placeholder","loading","srcString","config","unoptimized","loader","onLoadingCompleteRef","setBlurComplete","setIntersection","onLoad","onError","isVisible"]));return u.default.createElement(u.default.Fragment,null,u.default.createElement("img",Object.assign({},O,t,"raw"===i?{height:a,width:r}:{},{decoding:"async","data-nimg":i,className:o,style:_({},s,l),ref:u.useCallback((function(e){A(e),(null===e||void 0===e?void 0:e.complete)&&S(e,h,0,d,b,v)}),[A,h,i,d,b,v]),onLoad:function(e){S(e.currentTarget,h,0,d,b,v),w&&w(e)},onError:function(e){"blur"===d&&v(!0),x&&x(e)}})),(c||"blur"===d)&&u.default.createElement("noscript",null,u.default.createElement("img",Object.assign({},O,j({config:g,src:h,unoptimized:p,layout:i,width:r,quality:n,sizes:t.sizes,loader:m}),"raw"===i?{height:a,width:r}:{},{decoding:"async","data-nimg":i,style:s,className:o,loading:f||"lazy"}))))};function C(e){return"/"===e[0]?e.slice(1):e}("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},1551:function(e,t,a){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,i=[],o=!0,s=!1;try{for(a=a.call(e);!(o=(r=a.next()).done)&&(i.push(r.value),!t||i.length!==t);o=!0);}catch(l){s=!0,n=l}finally{try{o||null==a.return||a.return()}finally{if(s)throw n}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(a);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,o=(i=a(7294))&&i.__esModule?i:{default:i},s=a(1003),l=a(880),c=a(9246);function u(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var d={};function f(e,t,a,r){if(e&&s.isLocalURL(t)){e.prefetch(t,a,r).catch((function(e){0}));var n=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;d[t+"%"+a+(n?"%"+n:"")]=!0}}var h=o.default.forwardRef((function(e,t){var a,r=e.legacyBehavior,i=void 0===r?!0!==Boolean(!1):r,h=e.href,g=e.as,p=e.children,m=e.prefetch,_=e.passHref,y=e.replace,b=e.shallow,v=e.scroll,A=e.locale,w=e.onClick,x=e.onMouseEnter,j=u(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter"]);a=p,i&&"string"===typeof a&&(a=o.default.createElement("a",null,a));var O,E=!1!==m,S=l.useRouter(),L=o.default.useMemo((function(){var e=n(s.resolveHref(S,h,!0),2),t=e[0],a=e[1];return{href:t,as:g?s.resolveHref(S,g):a||t}}),[S,h,g]),C=L.href,T=L.as,I=o.default.useRef(C),D=o.default.useRef(T);i&&(O=o.default.Children.only(a));var N=i?O&&"object"===typeof O&&O.ref:t,G=n(c.useIntersection({rootMargin:"200px"}),3),k=G[0],R=G[1],M=G[2],P=o.default.useCallback((function(e){D.current===T&&I.current===C||(M(),D.current=T,I.current=C),k(e),N&&("function"===typeof N?N(e):"object"===typeof N&&(N.current=e))}),[T,N,C,M,k]);o.default.useEffect((function(){var e=R&&E&&s.isLocalURL(C),t="undefined"!==typeof A?A:S&&S.locale,a=d[C+"%"+T+(t?"%"+t:"")];e&&!a&&f(S,C,T,{locale:t})}),[T,C,R,A,E,S]);var z={ref:P,onClick:function(e){i||"function"!==typeof w||w(e),i&&O.props&&"function"===typeof O.props.onClick&&O.props.onClick(e),e.defaultPrevented||function(e,t,a,r,n,i,o,l){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&s.isLocalURL(a))&&(e.preventDefault(),t[n?"replace":"push"](a,r,{shallow:i,locale:l,scroll:o}))}(e,S,C,T,y,b,v,A)},onMouseEnter:function(e){i||"function"!==typeof x||x(e),i&&O.props&&"function"===typeof O.props.onMouseEnter&&O.props.onMouseEnter(e),s.isLocalURL(C)&&f(S,C,T,{priority:!0})}};if(!i||_||"a"===O.type&&!("href"in O.props)){var B="undefined"!==typeof A?A:S&&S.locale,V=S&&S.isLocaleDomain&&s.getDomainLocale(T,B,S&&S.locales,S&&S.domainLocales);z.href=V||s.addBasePath(s.addLocale(T,B,S&&S.defaultLocale))}return i?o.default.cloneElement(O,z):o.default.createElement("a",Object.assign({},j,z),a)}));t.default=h,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,a){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,i=[],o=!0,s=!1;try{for(a=a.call(e);!(o=(r=a.next()).done)&&(i.push(r.value),!t||i.length!==t);o=!0);}catch(l){s=!0,n=l}finally{try{o||null==a.return||a.return()}finally{if(s)throw n}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(a);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,a=e.rootMargin,r=e.disabled||!s,u=i.useRef(),d=n(i.useState(!1),2),f=d[0],h=d[1],g=n(i.useState(t?t.current:null),2),p=g[0],m=g[1],_=i.useCallback((function(e){u.current&&(u.current(),u.current=void 0),r||f||e&&e.tagName&&(u.current=function(e,t,a){var r=function(e){var t,a={root:e.root||null,margin:e.rootMargin||""},r=c.find((function(e){return e.root===a.root&&e.margin===a.margin}));r?t=l.get(r):(t=l.get(a),c.push(a));if(t)return t;var n=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=n.get(e.target),a=e.isIntersecting||e.intersectionRatio>0;t&&a&&t(a)}))}),e);return l.set(a,t={id:a,observer:i,elements:n}),t}(a),n=r.id,i=r.observer,o=r.elements;return o.set(e,t),i.observe(e),function(){if(o.delete(e),i.unobserve(e),0===o.size){i.disconnect(),l.delete(n);var t=c.findIndex((function(e){return e.root===n.root&&e.margin===n.margin}));t>-1&&c.splice(t,1)}}}(e,(function(e){return e&&h(e)}),{root:p,rootMargin:a}))}),[r,p,a,f]),y=i.useCallback((function(){h(!1)}),[]);return i.useEffect((function(){if(!s&&!f){var e=o.requestIdleCallback((function(){return h(!0)}));return function(){return o.cancelIdleCallback(e)}}}),[f]),i.useEffect((function(){t&&m(t.current)}),[t]),[_,f,y]};var i=a(7294),o=a(4686),s="undefined"!==typeof IntersectionObserver;var l=new Map,c=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},8344:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return j}});var r=a(5893),n=(a(6774),a(7294)),i=a(9008),o=a.n(i),s=a(5675),l=a.n(s),c=a(985),u={src:"/DSVI_Tool_v3/_next/static/media/logo-undp-alpha.496c0995.png",height:540,width:342,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAYAAAAx8TU7AAAApklEQVR42mNksJt2TEaAVYSNiYHj3sc/ZxkYGAJZCl2kNO1M5QWYmRgZth68+5EBCFh4udl+S0vwM/z6/ZeBlZXpD1iwaffjz7cefeT49ecf57obn76ABXPNRbnffPj5WUOOn6FchpcBBJjYWJj/83Gz/v32489foLn/QGazsLMxs377+YfxPwMD+8cvv1nB2oES75kZGX+///Tzx6sPP98xMDAwAACZnzlo/quHXgAAAABJRU5ErkJggg=="},d={src:"/DSVI_Tool_v3/_next/static/media/logo-sdg-alpha.4af6a7ba.png",height:512,width:512,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA8ElEQVR42mOAgDecDB5NJWrmqTueMxjtuNeiXvr/FAM3AwMDA8Pq/wycYWu9FzFEdt7XMcpa+VRfb/nVORoPixc5LmK4l8PFINOxszBofc2D0NVBYQxQUL7IOTSm3ePBKj/rYgax8oWbGQrWr2NAA/cZGNbcEFTcyhBfwbyppY5hAwMaOFQyYe2rYN9NDOd7TPNuT9R9+G2eVAIDFPzerhdftuXYfYYNj/MZGBjWMv1czDD3dU7Wg/eueVsOuklvOlSueP//Xob5DAz/mRkYGBgY/v9nYLrF0JfzMSZs3d0k0XWpDM45//8nMTEwMDAAAL1kWmsAhx6HAAAAAElFTkSuQmCC"},f=a(1664),h=a.n(f),g=a(1163),p=function(){var e=(0,g.useRouter)(),t=1===e.pathname.length&&"/"===e.pathname?e.pathname:e.pathname.substring(1);return(0,r.jsxs)("nav",{className:"align-bottom mb-2 flex items-end font-bold",children:[(0,r.jsx)(h(),{href:"/",as:"/",children:(0,r.jsxs)("a",{className:"mr-5 hover:text-gray-900 px-2 flex",children:[(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"map1"===t?"stroke-blue-700 h-6 w-6":"h-6 w-6 stroke-slate-700",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",children:[(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]}),(0,r.jsx)("span",{className:"/"===t?"text-lg font-bold text-blue-700 pl-1":"pl-1",children:"Map Window"})]})}),(0,r.jsx)(h(),{href:"/about",children:(0,r.jsxs)("a",{className:"mr-5 hover:text-gray-900 px-2 flex font-bold",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"about"===t?"font-bold stroke-blue-700 h-6 w-6":"h-6 w-6 stroke-slate-700",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"})}),(0,r.jsx)("span",{className:"about"===t?"text-lg font-bold text-blue-700 pl-1":"pl-1",children:"About us"})]})})]})},m=function(){return(0,r.jsx)("header",{className:"bg-white text-gray-800 body-font",children:(0,r.jsx)("nav",{children:(0,r.jsxs)("ul",{className:"h-35 flex justify-between px-3",children:[(0,r.jsxs)("li",{className:"flex items-center",children:[(0,r.jsx)("a",{className:"flex items-center",children:(0,r.jsx)(l(),{src:d,alt:"SDG LOGO",width:"40px",height:"40px",layout:"intrinsic",className:"rounded-full"})}),(0,r.jsx)("a",{className:"text-center flex pl-3 text-align: center",children:(0,r.jsx)("p",{className:"text-2xl font-bold",children:"DSVI Tajikistan Tool"})})]}),(0,r.jsx)("li",{className:"flex items-end",children:(0,r.jsx)(p,{})}),(0,r.jsxs)("li",{className:"flex items-center justify-end",children:[(0,r.jsx)("a",{className:"flex items-center",children:(0,r.jsx)(l(),{src:c.Z,alt:"circular",width:"70px",height:"70px",layout:"intrinsic"})}),(0,r.jsx)("a",{className:"flex items-center pl-5",children:(0,r.jsx)(l(),{src:u,alt:"undp logo",width:"40px",height:"60px",layout:"intrinsic"})})]})]})})})};var _=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o(),{children:[(0,r.jsx)("meta",{charSet:"UTF-8"}),(0,r.jsx)("title",{children:"SDG AI Lab | DSVI Tool"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,r.jsx)("meta",{name:"description",content:"Social Vulnerability Tajikistan developed at SDG AI Lab"}),(0,r.jsx)("meta",{name:"keywords",content:"map,earthquake,social vulnerable"}),(0,r.jsx)("meta",{content:"SDG AI LAB",name:"author"})]}),(0,r.jsx)(m,{})]})},y=function(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("footer",{className:"bg-white text-gray-600 body-font",children:(0,r.jsxs)("ul",{className:"flex items-center px-5",children:[(0,r.jsx)("li",{children:(0,r.jsxs)("a",{className:"flex title-font font-medium items-center text-gray-900 w-44",children:[(0,r.jsx)(l(),{src:c.Z,alt:"SDG LOGO",width:"100px",height:"100px",layout:"intrinsic",className:""}),(0,r.jsx)("p",{className:"text-[12px] w-13 text-blue-600 pl-2",children:"DSVI Tajikistan Development Tool"})]})},"1"),(0,r.jsxs)("li",{className:"text-sm text-gray-500 flex justify-self-center m-auto",children:[(0,r.jsx)("a",{href:"https://sdgailab.org/",className:"text-gray-600 items-center m-auto",rel:"noopener noreferrer",target:"_blank",children:"\xa9 2022 \u2014 @SDG AI LAB"}),(0,r.jsx)("a",{className:"ml-3 text-gray-500",href:"https://twitter.com/sdgailab",children:(0,r.jsx)("svg",{fill:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",className:"w-5 h-5 drop-shadow-lg hover:drop-shadow-2xl hover:w-8 hover:h-8 hover:text-blue-400",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{d:"M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"})})}),(0,r.jsx)("a",{className:"ml-3 text-gray-500",href:"https://sdgailab.org/",children:(0,r.jsx)("svg",{fill:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"5",className:"w-5 h-5 drop-shadow-lg hover:drop-shadow-2xl hover:w-8 hover:h-8 hover:text-purple-800",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{d:"M3.51211712,15 L8.17190229,15 C8.05949197,14.0523506 8,13.0444554 8,12 C8,10.9555446 8.05949197,9.94764942 8.17190229,9 L3.51211712,9 C3.18046266,9.93833678 3,10.9480937 3,12 C3,13.0519063 3.18046266,14.0616632 3.51211712,15 L3.51211712,15 Z M3.93551965,16 C5.12590433,18.3953444 7.35207678,20.1851177 10.0280093,20.783292 C9.24889451,19.7227751 8.65216136,18.0371362 8.31375067,16 L3.93551965,16 L3.93551965,16 Z M20.4878829,15 C20.8195373,14.0616632 21,13.0519063 21,12 C21,10.9480937 20.8195373,9.93833678 20.4878829,9 L15.8280977,9 C15.940508,9.94764942 16,10.9555446 16,12 C16,13.0444554 15.940508,14.0523506 15.8280977,15 L20.4878829,15 L20.4878829,15 Z M20.0644804,16 L15.6862493,16 C15.3478386,18.0371362 14.7511055,19.7227751 13.9719907,20.783292 C16.6479232,20.1851177 18.8740957,18.3953444 20.0644804,16 L20.0644804,16 Z M9.18440269,15 L14.8155973,15 C14.9340177,14.0623882 15,13.0528256 15,12 C15,10.9471744 14.9340177,9.93761183 14.8155973,9 L9.18440269,9 C9.06598229,9.93761183 9,10.9471744 9,12 C9,13.0528256 9.06598229,14.0623882 9.18440269,15 L9.18440269,15 Z M9.3349823,16 C9.85717082,18.9678295 10.9180729,21 12,21 C13.0819271,21 14.1428292,18.9678295 14.6650177,16 L9.3349823,16 L9.3349823,16 Z M3.93551965,8 L8.31375067,8 C8.65216136,5.96286383 9.24889451,4.27722486 10.0280093,3.21670804 C7.35207678,3.81488234 5.12590433,5.60465556 3.93551965,8 L3.93551965,8 Z M20.0644804,8 C18.8740957,5.60465556 16.6479232,3.81488234 13.9719907,3.21670804 C14.7511055,4.27722486 15.3478386,5.96286383 15.6862493,8 L20.0644804,8 L20.0644804,8 Z M9.3349823,8 L14.6650177,8 C14.1428292,5.03217048 13.0819271,3 12,3 C10.9180729,3 9.85717082,5.03217048 9.3349823,8 L9.3349823,8 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z"})})})]},"2"),(0,r.jsx)("li",{children:(0,r.jsx)("a",{className:"flex items-center w-44 justify-end",children:(0,r.jsx)(l(),{src:u,alt:"undp logo",width:"40px",height:"60px",layout:"intrinsic",className:""})})},"3")]})})})},b=a(3819),v=function(e){var t=e.children,a=(0,n.useContext)(b.f),i=a.state,o=(a.dispatch,i.on_homepage);return(0,r.jsxs)("div",{className:"min-h-screen bg-slate-200",children:[!o&&(0,r.jsx)(_,{}),t,!o&&(0,r.jsx)(y,{})]})},A=a(3483);function w(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function x(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),r.forEach((function(t){w(e,t,a[t])}))}return e}var j=function(e){var t=e.Component,a=e.pageProps;return(0,r.jsx)(b.h,{children:(0,r.jsx)(A.A,{children:(0,r.jsx)(v,{children:(0,r.jsx)(t,x({},a))})})})}},6774:function(){},9008:function(e,t,a){e.exports=a(3121)},5675:function(e,t,a){e.exports=a(9749)},1664:function(e,t,a){e.exports=a(1551)},1163:function(e,t,a){e.exports=a(880)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(3837),t(880)}));var a=e.O();_N_E=a}]);