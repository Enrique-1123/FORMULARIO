import{B as c,l as g,o as e,c as t,k as i,n as o,O as l,e as s,m as d,b as p,t as u}from"./index-Bh0rnSp-.js";var $=({dt:n})=>`
.p-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${n("tag.primary.background")};
    color: ${n("tag.primary.color")};
    font-size: ${n("tag.font.size")};
    font-weight: ${n("tag.font.weight")};
    padding: ${n("tag.padding")};
    border-radius: ${n("tag.border.radius")};
    gap: ${n("tag.gap")};
}

.p-tag-icon {
    font-size: ${n("tag.icon.size")};
    width: ${n("tag.icon.size")};
    height:${n("tag.icon.size")};
}

.p-tag-rounded {
    border-radius: ${n("tag.rounded.border.radius")};
}

.p-tag-success {
    background: ${n("tag.success.background")};
    color: ${n("tag.success.color")};
}

.p-tag-info {
    background: ${n("tag.info.background")};
    color: ${n("tag.info.color")};
}

.p-tag-warn {
    background: ${n("tag.warn.background")};
    color: ${n("tag.warn.color")};
}

.p-tag-danger {
    background: ${n("tag.danger.background")};
    color: ${n("tag.danger.color")};
}

.p-tag-secondary {
    background: ${n("tag.secondary.background")};
    color: ${n("tag.secondary.color")};
}

.p-tag-contrast {
    background: ${n("tag.contrast.background")};
    color: ${n("tag.contrast.color")};
}
`,y={root:function(r){var a=r.props;return["p-tag p-component",{"p-tag-info":a.severity==="info","p-tag-success":a.severity==="success","p-tag-warn":a.severity==="warn","p-tag-danger":a.severity==="danger","p-tag-secondary":a.severity==="secondary","p-tag-contrast":a.severity==="contrast","p-tag-rounded":a.rounded}]},icon:"p-tag-icon",label:"p-tag-label"},b=c.extend({name:"tag",style:$,classes:y}),k={name:"BaseTag",extends:g,props:{value:null,severity:null,rounded:Boolean,icon:String},style:b,provide:function(){return{$pcTag:this,$parentInstance:this}}},f={name:"Tag",extends:k,inheritAttrs:!1};function m(n,r,a,v,h,w){return e(),t("span",o({class:n.cx("root")},n.ptmi("root")),[n.$slots.icon?(e(),i(l(n.$slots.icon),o({key:0,class:n.cx("icon")},n.ptm("icon")),null,16,["class"])):n.icon?(e(),t("span",o({key:1,class:[n.cx("icon"),n.icon]},n.ptm("icon")),null,16)):s("",!0),n.value!=null||n.$slots.default?d(n.$slots,"default",{key:2},function(){return[p("span",o({class:n.cx("label")},n.ptm("label")),u(n.value),17)]}):s("",!0)],16)}f.render=m;export{f as s};
