/*

    Copyright (c) 2021 CodingNeverEnds
    https://codingneverends.web.app

*/ 
console.log(`%cCopyright (c) 2021 CodingNeverEnds`,"color:#0f0;font-size:1rem;");
console.log(`%chttps://codingneverends.web.app`,"font-size:1.2rem");
console.warn(`%cInspecting this site is strictly prohibited`,"color:#f00;font-size:1.8rem;");
class Header{
    constructor(headerid){
        this.element=document.getElementById(headerid);
        this.height=this.element.offsetHeight;
        this.element.style.transition="all 0.5s";
        this.scrollY=window.scrollY;
        this.element.style.position="fixed";
        this.element.style.top="0px";
        window.onscroll=this.onscroll;
        var body=document.body;
        if(body.style.marginTop<this.height){
            body.style.marginTop=(body.style.marginTop+this.height)+"px";
        }
    }
    onscroll(){
        var tran=0;
        if(window.scrollY>header.scrollY){
            tran=-100;
        }
        else{
            tran=0;
        }
        header.element.style.transform=`translateY(${tran}%)`;
        header.scrollY=window.scrollY;
    }
}
var header=new Header("header");
class Nexter{
    constructor(nexterid){
        this.element=document.getElementById(nexterid);
        this.eles=this.element.children;
        for(var i=1;i<this.eles.length;i++){
            this.eles[i].style.transform="translateX(100%)";
        }
        this.curpos=0;
    }
    async next(pre=false){
        if(pre) 
            this.curpos--;
        else
            this.curpos++;
        if(this.curpos<0)this.curpos=0;
        if(this.curpos>this.eles.length-1)this.curpos=this.eles.length-1;
        for(var i=0;i<this.eles.length;i++){
            var tran=0;
            if(this.curpos<i)
                tran=100;
            if(this.curpos>i)
                tran=-100;
            this.eles[i].style.transform=`translateX(${tran}%)`;
        }
        await imp.timer(500);
    }
}
var nexter=new Nexter("nexter");
class Data{
    constructor(){
        this.name="Haya";
        this.batch="CS";
        this.mode="viewer";
        this.color="nil";
    }
}
var data=new Data();
var cols=[
    {
        picked : false,
        val : "#f0f"
    },
    {
        picked : false,
        val : "#0ff"
    },
    {
        picked : false,
        val : "#f55"
    },
    {
        picked : false,
        val : "#c0f"
    },
    {
        picked : false,
        val : "#af0"
    },
    {
        picked : false,
        val : "#fc0"
    },
    {
        picked : false,
        val : "#9a0"
    },
    {
        picked : false,
        val : "#0aa"
    },
    {
        picked : false,
        val : "#0fa"
    }
];
var selcol={
    generatecols(j=-1){
        var html=`<div class="df">`;
        for(var i=0;i<9;i++){
            if(i%3==0)
                html+=`</div><div class="df">`;
            html+=`<div class="colele ${i==j?"a":""}" style="background:${cols[i].val}" ${cols[i].picked?"":`onclick="selcol.mark(${i})"`}>
                ${cols[i].picked?'<i class="fa fa-times" aria-hidden="true"></i>':''}
            </div>`;
        }
        html+=`</div>`;
        return html;
    },
    mark(i){
        if(cols[i].picked){
            document.getElementById("col").innerHTML=selcol.generatecols(-1);
        }
        else{
            document.getElementById("col").innerHTML=selcol.generatecols(i);
            data.color=i;
        }
    }
}

var msg={
    init(){
        this.ele=document.getElementById("noti");
    },
    close(){
        msg.ele.style.zIndex=-100;
    },
    show(){
        msg.ele.style.zIndex=150;
    },
    changemsg(val){
        msg.ele.children[0].children[0].innerHTML=val;
    },
    async showmsg(val,ms){
        msg.changemsg(val);
        msg.show();
        await imp.timer(ms);
        msg.close();
    }
}
//
//var teamvals=["cs","ec","eee","civil","mech","chempro","pamp"];
var entry={
    mode(val){
        if(val==-1){
            document.getElementById("f_enter").style.zIndex=-100;
            nexter.element.innerHTML=
            `<div class="enter">
                <div class="blk">
                    <div class="blk-head">Nickname</div>
                    <input type="text" placeholder="Enter your name" id="name">
                    <div class="df">
                        <div class="next" onclick="entry.show()"> Pre</div>
                        <div class="next" onclick="entry.name()">Next</div>
                    </div>
                </div>
            </div>
            <div class="enter">
                <div class="blk">
                    <div class="blk-head">Batch</div>
                    <select id="batch">
                        <option value="cs">CS</option>
                        <option value="ec">ECE</option>
                        <option value="chempro">ChemPro</option>
                        <option value="eee">EEE</option>
                        <option value="mech">Mech</option>
                        <option value="pamp">PAMP</option>
                        <option value="civil">Civil</option>
                    </select>
                    <div class="df">
                        <div class="next" onclick="nexter.next(true)"> Pre</div>
                        <div class="next" onclick="entry.batch()">Next</div>
                    </div>
                </div>
            </div>`;
            if(data.mode=="player"){
                nexter.element.innerHTML+=`
                <div class="enter">
                    <div class="blk">
                        <div class="blk-head">Select Color</div>
                        <div id="col">
                            ${selcol.generatecols()}
                        </div>
                        <div class="df">
                            <div class="next" onclick="nexter.next(true)"> Pre</div>
                            <div class="next" onclick="entry.col()">Next</div>
                        </div>
                    </div>
                </div>
                `;
            }
            if(data.mode!="viewer"){
                nexter.element.innerHTML+=`
                    <div class="enter">
                        <div class="blk">
                            <input type="text" placeholder="Username" id="user">
                            <input type="password" placeholder="Password" id="pass">
                            <div class="df">
                                <div class="next" onclick="nexter.next(true)"> Pre</div>
                                <div class="next" onclick="entry.auth()">Next</div>
                            </div>
                        </div>
                    </div>`;
            }
            nexter.element.innerHTML+=`
            <div class="enter">
                <div class="blk">
                    <div class="next" onclick="entry.enter(true)">Start</div>
                </div>
            </div>`;
            nexter=new Nexter("nexter");
            return ;
        }
        var modes=["player","viewer","mentor"];
        data.mode=modes[val];
        var modeelement=document.getElementById("mode");
        for(var i=0;i<3;i++)
            modeelement.children[i].classList="ele";
        modeelement.children[val].classList="ele a";
    },
    auth(){
        var user=document.getElementById("user").value;
        var pass=document.getElementById("pass").value;
        var mail=user+"@dice.in";
        if(data.mode=="player"){
            if(user.split("_")[1].toLocaleLowerCase().slice(0,2)!=data.batch.toLocaleLowerCase().slice(0,2)){
                msg.showmsg("Mismatch player and brach",4000);
                return;
            }
        }
        if(data.mode=="mentor"){
            if(user.split("_")[1].toLocaleLowerCase()!="moderator"){
                msg.showmsg("Use moderator username and password.",5000);
                return;
            }
        }
        msg.showmsg("Bad net will cause some time for logging in ",10000);
        firebase.auth().signInWithEmailAndPassword(mail, pass)
        .then((userCredential) => {
            msg.showmsg("Logged in sucessfully",2000);
            nexter.next();
        })
        .catch((error) => {
            msg.showmsg(error,5000);
        });
    },
    show(){
        document.getElementById("f_enter").style.zIndex=30;
    },
    name(){
        var div=document.getElementById("name");
        var val=div.value;
        val=val.trim();
        if(val.length<5){
            msg.showmsg("Name should be of minimum length 5",2000);
            return;
        }
        var regex=/^[a-zA-Z0-9]+(?:_[A-Za-z0-9]+)*$/;
        if(!val.match(regex)){
            if(val.match(" ")){
                msg.showmsg("Space is not valid",3000);
            }
            else
                msg.showmsg("The entered name is not valid",3000);
            return;
        }
        data.name=val;
        nexter.next();
    },
    batch(){
        var div=document.getElementById("batch");
        var val=div.value;
        data.batch=val;
        nexter.next();
    },
    col(){
        if(data.color=="nil"){
            msg.showmsg("Select a color.",3000);
            return;
        }
        nexter.next();
    },
    enter(){
        if(data.mode=="player")
            game.valiadteandinit();
        else
            game.init();
        msg.changemsg("Please wait ...");
        msg.show();
    }
}
msg.init();