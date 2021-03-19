/*

    Copyright (c) 2021 CodingNeverEnds
    https://codingneverends.web.app

*/
var imp={
    async timer(ms){
        return new Promise(res=>setTimeout(res,ms));
    }
}
class Player{
    constructor(name,branch,mode,color,steps,board){
        this.name=name??"Anonymous";
        this.branch=branch??"cs";
        this.mode=mode??"viewer";//player,viewer,mentor
        this.board=board;
        this.marker=new Marker(steps,color,this.branch,0);
        this.rolling=false;
        this.pos=0;
        this.initialoffset=false;
    }
    roll(){
        if(this.mode=="player"){
            if(this.rolling)
                return;
            this.rolling=true;
            var val=this.board.random();
            if(this.pos==0 || this.pos>23)
                val=this.board.random(true);
            FireBase.dicevalpush(val);
        }
        else{
        }
    }
    accept(bool){
        if(this.mode=="mentor")
            FireBase.Accept(bool);
        else{
        }
    }
}
class Dice{
    constructor(id){
        this.id=id;
        this.ele=document.getElementById(id);
        if(!id){
            return;
        }
        this.blocks=this.getblocks();
        this.dices=this.ele.children;
        this.dices[0].style.transform="translateY(-50%) rotateX(-90deg)";
        this.dices[1].style.transform="translateX(-50%) rotateY(-90deg)";
        this.blocks[0].innerHTML=this.getblkhtml(3);
        this.blocks[1].innerHTML=this.getblkhtml(1);
        this.blocks[2].innerHTML=this.getblkhtml(5);
    }
    getblocks(){
        var blk=[];
        for(var i=0;i<this.ele.children.length;i++){
            blk.push(this.ele.children[i].children[0]);
        }
        return blk;
    }
    getblkhtml(num){
        var html="";
        if(num==1){
            html=`<div class="df">
                    <div class="cir"></div>
                </div>`;
        }
        if(num==2){
            html=`<div class="df">
                    <div class="cir"></div>
                </div>
                <div class="df">
                    <div class="cir"></div>
                </div>`;
        }
        if(num==3){
            html=`<div class="df">
                    <div class="cir"></div>
                </div>
                <div class="df">
                    <div class="cir"></div>
                </div>
                <div class="df">
                    <div class="cir"></div>
                </div>`;
        }
        if(num==4){
            html=`<div class="df">
                    <div class="cir" style="margin: 8px;"></div>
                    <div class="cir" style="margin: 8px;"></div>
                </div>
                <div class="df">
                    <div class="cir" style="margin: 8px;"></div>
                    <div class="cir" style="margin: 8px;"></div>
                </div>`;
        }
        if(num==5){
            html=`<div class="df">
                    <div class="cir" style="margin: 4px 7px;"></div>
                    <div class="cir" style="margin: 4px 7px;"></div>
                </div>
                <div class="df">
                    <div class="cir" style="margin: 4px 7px;"></div>
                </div>
                <div class="df">
                    <div class="cir" style="margin: 4px 7px;"></div>
                    <div class="cir" style="margin: 4px 7px;"></div>
                </div>`;
        }
        if(num==6){
            html=`<div class="df">
                    <div class="cir"></div>
                    <div class="cir"></div>
                </div>
                <div class="df">
                    <div class="cir"></div>
                    <div class="cir"></div>
                </div>
                <div class="df">
                    <div class="cir"></div>
                    <div class="cir"></div>
                </div>`;
        }
        return html;
    }
    async transition(dis=4,val=150){
        this.dices[1].style.transform="translate(0%) rotate(0deg)";
        this.dices[2].style.transform="translateX(50%) rotateY(90deg)";
        await imp.timer(val);
        this.blocks[0].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(this.random());
        this.dices[0].style.transform="translate(0%) rotate(0deg)";
        this.dices[1].style.transform="translateY(50%) rotateX(90deg)";
        await imp.timer(val);
        this.blocks[1].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(this.random());
        this.dices[0].style.transform="translateX(-50%) rotateY(-90deg)";
        this.dices[2].style.transform="translate(0%) rotate(0deg)";
        await imp.timer(val);
        this.blocks[0].innerHTML=this.getblkhtml(this.random());
        this.blocks[1].innerHTML=this.getblkhtml(this.random());
        this.dices[2].style.transform="translateY(-50%) rotateX(-90deg)";
        this.dices[1].style.transform="translate(0%) rotateX(0deg)";
        await imp.timer(val);
        this.blocks[0].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(this.random());
        this.dices[0].style.transform="translate(0%) rotate(0deg)";
        this.dices[1].style.transform="translateX(50%) rotateY(90deg)";
        await imp.timer(val);
        this.blocks[1].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(this.random());
        this.dices[0].style.transform="translateY(50%) rotateX(90deg)";
        this.dices[2].style.transform="translate(0%) rotateX(0deg)";
        await imp.timer(val);
        this.blocks[0].innerHTML=this.getblkhtml(this.random());
        this.blocks[1].innerHTML=this.getblkhtml(this.random());
        this.dices[1].style.transform="translate(0%) rotate(0deg)";
        this.dices[2].style.transform="translateX(-50%) rotateY(-90deg)";
        await imp.timer(val);
        this.blocks[0].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(this.random());
        this.dices[1].style.transform="translateY(-50%) rotateX(-90deg)";
        this.dices[0].style.transform="translate(0%) rotateX(0deg)";
        await imp.timer(val);
        this.blocks[1].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(this.random());
        this.dices[2].style.transform="translate(0%) rotate(0deg)";
        this.dices[0].style.transform="translateX(50%) rotateY(90deg)";
        await imp.timer(val);
        this.blocks[1].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(this.random());
        this.dices[2].style.transform="translateY(50%) rotateX(90deg)";
        this.dices[1].style.transform="translate(0%) rotateX(0deg)";
        await imp.timer(val);
        this.blocks[0].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(this.random());
        this.dices[0].style.transform="translate(0%) rotate(0deg)";
        this.dices[1].style.transform="translateX(-50%) rotateY(-90deg)";
        await imp.timer(val);
        this.blocks[0].innerHTML=this.getblkhtml(this.random());
        this.blocks[1].innerHTML=this.getblkhtml(this.random());
        this.blocks[2].innerHTML=this.getblkhtml(dis);
        this.dices[0].style.transform="translateY(-50%) rotateX(-90deg)";
        this.dices[2].style.transform="translate(0%) rotateX(0deg)";
        await imp.timer(val);
    }
    random(force=false){
        return Math.ceil(Math.random()*6);
    }
}
class Step{
    constructor(val){
        this.ele=document.getElementById("pos"+val);
        this.markers=[];
        this.val=val;
        this.setmarkers();
    }
    async clearfromall(_m){
        var steps=_m.steps;
        for(var i=0;i<steps.length;i++){
            var _marker=steps[i].markers.find(o=>(o.team==_m.team));
            if(_marker!=undefined){
                _m.steps[i].markers=steps[i].markers.filter(o=>(o.team!=_m.team));
                await _m.steps[i].setmarkers();
            }
        }
    }
    async addMarker(marker){
        await this.clearfromall(marker);
        for(var i=0;i<this.markers.length;i++){
            if(this.markers[i].team==marker.team){
                return;
            }
        }
        marker.pos=this.val;
        marker.curstep=this;
        this.markers.push(marker);
        await this.setmarkers();
    }
    async setmarkers(){
        this.ele.innerHTML=`${this.val}`;
        var ini=-1*35*(2+this.markers.length)/8;
        for(var i=0;i<this.markers.length;i++){
            this.ele.innerHTML+=`<i class="fa fa-map-marker" aria-hidden="true" 
                style="background: transparent;color: ${this.markers[i].color};
                position: absolute;font-size: 2.5rem;
                transform: translateY(${ini+7*(Math.floor(i/2))}px) translateX(${i%2==0?10:-10}px);">
                </i>`;
        }
        await imp.timer(200);
    }
}
class Marker{
    constructor(steps,color="#f0f",team="cs",pos=0){
        this.steps=steps;
        this.pos=pos;
        this.team=team;
        this.color=color;
        this.curstep="nil";
        if(pos!=0){
            this.steps[pos-1].addMarker(this);
        }
    }
    async initial(x){
        if(this.pos-1>=0)
            await this.removeMarker();
        await this.steps[x-1].addMarker(this);
        this.pos=x;
    }
    async translate(pos){
        if(pos>25 || pos<0)
            return;
        var ch=1;
        if(pos<this.pos){
            ch=-1;
        }
        for(var i=this.pos;i!=pos;i=i+ch){
            await this.steps[i-1+ch].addMarker(this);
            await imp.timer(300);
        }
    }
    async move(delta){
        if(delta==0){
            return;
        }
        await this.removeMarker();
        var pos=this.pos+delta;
        await this.translate(pos);
    }
    async rembysearch(){
        for(var i=0;i<this.steps.length;i++)
        {
            for(var j=0;j<this.steps[i].markers.length;j++){
                if(this.steps[i].marker[j].color==this.color)
                    await this.removeMarker();
            }
        }
    }
    async removeMarker(){
        var step=this.curstep;
        if(step=="nil")
            return;
        var _mks=[];
        for(var i=0;i<step.markers.length;i++)
            if(this.team!=step.markers[i].team)
                _mks.push(step.markers[i]);
        this.curstep.markers=_mks;
        await step.setmarkers();
        this.curstep="nil";
    }
}
class Board{
    constructor(name,branch,mode,color){
        this.dice=new Dice("dice");
        this.steps=[];
        for(var i=1;i<26;i++){
            this.steps.push(new Step(i));
        }
        this.player=new Player(name,branch,mode,color,this.steps,this);
    }
    async roll(val){
        await this.dice.transition(val);
        this.player.rolling=false;
        if(this.player.mode=="mentor"){
            FireBase.Accept(false);
        }
        if(this.player.initialoffset){
            this.player.initialoffset=false;
            return;
        }
        if(this.player.marker.pos==25){
            console.log("Game Over");
        }
        if(val+this.player.marker.pos>25){
            return;
        }
        if(this.player.marker.pos==0){
            if(val==6){
                if(data.mode=="player")
                    FireBase.updatepos(this.player.marker.pos+1);
                await this.player.marker.move(1);
                this.player.pos++;
            }
        }
        else{
            if(data.mode=="player")
                FireBase.updatepos(this.player.marker.pos+val);
            await this.player.marker.move(val);
            this.player.pos=this.player.pos+val;
        }
        FireBase.CallTask(this.player.marker.pos,this)
    }
    random(force=false){
        if(force){
            return Math.ceil(Math.random()*6);
        }
        else{
            return Math.ceil(3.5*Math.random()*Math.random()+2.5*Math.random());
        }
    }
    async setcol(col){
        this.player.marker.color=col;
        var pos=this.player.marker.pos-1;
        if(pos>=0 && pos <25)
        {
            await this.player.marker.removeMarker();
            await this.player.marker.steps[pos].addMarker(this.player.marker);
        }
    }
}

var taskcompleted=false;
var task="";
async function calltask(val,board,taskinfo){
    if(taskcompleted){
        taskcompleted=false;
        return;
    }
    task=new Task(val,board,taskinfo.val,taskinfo.delta);
}
class Task{
    constructor(val,board,taskinfo,delta,taskdiv="task"){
        this.taskinfo=taskinfo;
        this.taskno=val;
        this.board=board;
        this.delta=delta;
        this.ele=document.getElementById(taskdiv);
        this.show(val);
    }
    show(){
        this.ele.innerHTML=
        `<div class="task-box">
            <div class="no">Task ${this.taskno+1}</div>
            <div class="info">${this.taskinfo}</div>
            ${board.player.mode=="mentor"?
            `<div class="df">
                <div class="ele g" onclick='board.player.accept(${true})'>Accept</div>
                <div class="ele r" onclick='board.player.accept(${false})'>Reject</div>
            </div>`:""}
        </div>
        `;
        this.ele.style.zIndex=8;
    }
    go(pos="Nil"){
        this.ele.innerHTML=
        `<div class="task-box">
            <div class="no">Game Over</div>
            <div class="info">Your position is ${pos}</div>
            <div class="info">Your can still view others playing.</div>
            <div class="df">
                <div class="ele g" onclick='task.hide()'>Continue</div>
            </div>
        </div>
        `;
        this.ele.style.zIndex=8;
        this.board.player.rolling=true;
    }
    hide(){
        this.ele.innerHTML="";
        this.ele.style.zIndex=-100;
    }
    complete(){
        this.board.player.rolling=false;
        this.ele.innerHTML="";
        this.ele.style.zIndex=-100;
        this.board.player.marker.move(this.delta);
    }
    incomplete(){
        this.board.player.rolling=false;
        this.ele.innerHTML=`<div class="task-box">
                <div class="no">Game Over</div>
                </div>`;

    }
}