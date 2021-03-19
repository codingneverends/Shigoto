/*

    Copyright (c) 2021 CodingNeverEnds
    https://codingneverends.web.app

*/ 
//Firebase base path
var path="Shigoto/DnDGame/";
//Teams
var teamvals=["cs","ec","eee","civil","mech","chempro","pamp"];
var Markers=[];
/*
cs
Ec
Eee
Civil
Mech
Chempro
Pamb
*/
var Team=[];
class TeamData{
    constructor(){
        this.batch="nil";
        this.col="#fff";
        this.pos=0;
        this.task="nil";
        this.taskcompletd=true;
    }
};
var colormanage={
    init(){
        this.mgref=firebase.database().ref(path+"cols/").on('value',(shot)=>{
            cols=shot.val();
            selcol.generatecols(-1);
        });      
    },
    findIndex(col){
        if(col=="#f0f")
            return 0;
        if(col=="#0ff")
            return 1;
        if(col=="#f55")
            return 2;
        if(col=="#c0f")
            return 3;
        if(col=="#af0")
            return 4;
        if(col=="#fc0")
            return 5;
        if(col=="#9a0")
            return 6;
        if(col=="#0aa")
            return 7;
        if(col=="#0fa")
            return 8;
        return -1;
    }
}
colormanage.init();
var board;
var USERS_ONLINE=[];
var game={
    async init(){
        document.getElementById("enter").style.zIndex=-100;
        game.removeandadd(data.batch);
        msg.close();
        board=new Board(data.name,data.batch,data.mode,data.color);
        firebase.database().ref(path+data.batch+"/color/").on('value',(ss)=>{
            data.color=ss.val();
            board.setcol(ss.val());
        });
        var metadata={
            player : data.name,
            mode : data.mode ,
            batch : data.batch
        };
        var con=firebase.database().ref(path+"users/").push(metadata);
        con.onDisconnect().remove();
        firebase.database().ref(path+"users/").on('value',(shot)=>{
            var _users=[];
            shot.forEach((childsnap) => {
                _users.push(childsnap.val());
            });
            USERS_ONLINE=_users;
            Details.move(Details.slider.curpos);
        });
        if(data.mode=="player"){
            var lastseen=new Date().getTime();
            firebase.database().ref(path+data.batch+"/player/").set({
                lastseen : lastseen
            });
            setInterval(()=>{
                var lastseen=new Date().getTime();
                firebase.database().ref(path+data.batch+"/player/").update({
                    lastseen : lastseen
                });
            },25000);
        }
        Details.init();
        FireBase.init();
    },
    valiadteandinit(){
        firebase.database().ref(path+data.batch+"/player/").once('value',(shot)=>{
            var val=shot.val();
            if(shot.val()==null)
                game.initgame();
            else
            {
                var lastseen=new Date().getTime();
                if(lastseen-shot.val().lastseen>1000*30){
                    game.initgame();
                }
                else{
                    msg.showmsg("One Player is already in Game or Wait for 30 s.",30000);
                }
            }
            
        });
    },
    async initgame(){
        await firebase.database().ref(path+data.batch+"/color/").once('value',(ss)=>{
            var color=ss.val();
            var index=colormanage.findIndex(color);
            if(index!=-1){
                firebase.database().ref(path+"cols/"+index).once('value',(_ss)=>{
                    if(_ss.val().picked){
                        firebase.database().ref(path+"cols/"+index).update({
                            picked :false
                         });
                    }
                 });
            }
        });
        firebase.database().ref(path+"cols/"+data.color).update({
            picked :true
         });
         firebase.database().ref(path+data.batch+"/").update({
             color :cols[data.color].val
          });
         data.color=cols[data.color].val;
         game.init();
    },
    removeandadd(){
        var ref1=firebase.database().ref(path+"/users/");
        ref1.on('child_added',(shot)=>{
            msg.showmsg(shot.val().player+"("+shot.val().batch+")"+" Joined As "+shot.val().mode,1000);
        });
        ref1.on('child_removed',(shot)=>{
            msg.showmsg(shot.val().mode+" "+shot.val().player+"("+shot.val().batch+")"+" Left",1000);
        });
    }
}
var FireBase={
    init(){
        firebase.database().ref(path+"ginfo/gameover").on('value',(shot)=>{
            console.log(shot.val());
            if(shot.val()==true)
                {
                    firebase.database().ref(path+"ginfo/wininfo").once('value',(shot)=>{
                        var eles=[];
                        shot.forEach((cshot)=>{
                            var val=cshot.val();
                            if(val=="nil")
                                return;
                            var ele=[];
                            ele["batch"]=cshot.key;
                            ele["time"]=cshot.val();
                            eles.push(ele);
                        });
                        eles.sort((a,b)=>{if(a.time<b.time)return -1;return 1});
                        var _eles=[];
                        for(var i=0;i<eles.length;i++){
                            var ele=[];
                            ele["batch"]=eles[i].batch;
                            ele["time"]=eles[i].time;
                            ele["pos"]=FireBase.position(i+1);
                            _eles.push(ele);
                        }
                        eles=_eles;
                        console.log(eles);
                        FireBase.finish(eles);
                    });
                }
        });
        firebase.database().ref(path+"ginfo/wininfo/"+data.batch+"/").on('value',(shot)=>{
            if(shot.val()!="nil"){
                firebase.database().ref(path+"ginfo/wininfo/").once('value',(shot)=>{
                    var pos=0;
                    var _time=new Date().getTime();
                    if(shot[data.batch]!="nil");
                        _time=shot.val()[data.batch];
                    shot.forEach((cshot)=>{
                        if(cshot.val()!="nil" && cshot.val()<=_time)
                            pos++;
                    });
                    task=new Task(25,board,"Nil",0,"task");
                    task.go(FireBase.position(pos));
                    if(data.mode=="player"){
                        if(pos==7){
                            firebase.database().ref(path+"ginfo/gameover/").set(true);
                        }
                    }
                });
            }
        })
        firebase.database().ref(path+data.batch+"/roll/").on('value',(shot)=>{
            if(shot.val()==null)
                return;
            var val=shot.val().val;
            if(val>0 && val<7)
                board.roll(val);
        });
        firebase.database().ref(path+data.batch+"/pos/").once('value',(shot)=>{
            var val=shot.val();
            if(val>0 && val<26){
                board.player.initialoffset=true;
                board.player.marker.initial(val);
                board.player.pos=val;
                firebase.database().ref(path+data.batch+"/taskcompleted/").once('value',(shot)=>{
                    if(shot.val()==null)
                        return;
                    if(shot.val().bool==false)
                        FireBase.GetAndCallTask();
                });
            }
        });
        firebase.database().ref(path+data.batch+"/taskcompleted/").on('value',(shot)=>{
            if(shot.val()==null)
                return;
            if(shot.val().bool==true){
                if(task){
                    task.complete();
                    if(data.mode=="player" && task.board.player.marker.pos>=25)
                        FireBase.GameOver();
                }
            }
            if(shot.val().bool=="over"){
                task.incomplete();
            }
        });
        FireBase.InsMarkers();
        FireBase.chatinit();
    },
    dicevalpush(val){
        firebase.database().ref(path+data.batch+"/roll/").update( { val : val ,time : new Date().getTime()} );
    },
    updatepos(val){
        firebase.database().ref(path+data.batch+"/").update( { pos : val } );
    },
    async CallTask(val,board){
        val--;
        if(val<0 || val>24)
            return;
        firebase.database().ref(path+"tasks/"+val+"/").once('value',(ss)=>{
            calltask(val,board,ss.val());
        });
    },
    GetAndCallTask(){
        firebase.database().ref(path+data.batch+"/pos/").once('value',(shot)=>{
            var val=shot.val();
            FireBase.CallTask(val,board);
        });
    },
    Accept(val){
        if(val){
            var pos=board.player.marker.pos+task.delta;
            firebase.database().ref(path+data.batch+"/pos/").set(pos);
        }
        if(val==-1){
            firebase.database().ref(path+data.batch+"/taskcompleted/").set({
                bool : val
            });
            return;
        }
        if(data.mode=="mentor")
            firebase.database().ref(path+data.batch+"/taskcompleted/").set({
                bool : val
            });
    },
    InsMarkers(){
        for(var i=0;i<teamvals.length;i++){
            var _team=teamvals[i];
            var _teamdata=new TeamData();
            Team.push(_teamdata);
            _teamdata.batch=_team;
            FireBase.InsTeam(_team);
            if(data.batch==_team)
                continue;
            var _marker=new Marker(board.steps,"#fff",_team,0);
            Markers.push(_marker);
            firebase.database().ref(path+_team+"/").once('value',(shot)=>{
                if(shot.val()!=null)
                {
                    var _marker=Markers.find(a=>(a.team===shot.key));
                    _marker.pos=shot.val().pos;
                    _marker.color=shot.val().color;
                    _marker.initial(shot.val().pos);
                    firebase.database().ref(path+shot.key+"/").on('value',(_shot)=>{
                        var val=_shot.val();
                        if(val==null)
                            return;
                        if(val.pos>25 && val.pos<0)return;
                        var _marker=Markers.find(a=>(a.team===_shot.key));
                        _marker.color=val.color;
                        _marker.translate(val.pos);
                    
                    });
                }
            });
        }
    },
    InsTeam(_team){
        firebase.database().ref(path+_team+"/pos/").on('value',(shot)=>{
            console.log(_team+"pos "+shot.val());
            Team[FireBase.getTeamData(_team)].pos=shot.val()??-1;
            if(shot.val()==null)
                return;
            firebase.database().ref(path+"/tasks/"+(shot.val()-1)).on('value',(shot)=>{
                Team[FireBase.getTeamData(_team)].task=shot.val().val;
                Details.Inject_TeamDetails();
            });
        });
        firebase.database().ref(path+_team+"/color/").on('value',(shot)=>{
            Team[FireBase.getTeamData(_team)].col=shot.val();
            Details.Inject_TeamDetails();
        });
        firebase.database().ref(path+_team+"/taskcompleted/").on('value',(shot)=>{
            Team[FireBase.getTeamData(_team)].taskcompletd=shot.val()?.bool??true;
            Details.Inject_TeamDetails();
        });
    },
    getTeamData(_team){
        for(var i=0;i<Team.length;i++){
            if(_team==Team[i].batch)
                return i;
        }
    },
    chatinit(){
        var _path=path+"chats/chats/";
        var b_path=path+"chats/"+data.batch+"/";
        firebase.database().ref(_path).on('value',(ss)=>{
            var ele=document.getElementById("global-chat");
            ele.innerHTML="";
            ss.forEach((childsnap) => {
                var ele=document.getElementById("global-chat");
                ele.innerHTML+=FireBase.chathtml(childsnap.val(),true);
            });
        });
        firebase.database().ref(b_path).on('value',(ss)=>{
            var ele=document.getElementById("team-chat");
            ele.innerHTML="";
            ss.forEach((childsnap) => {
                var ele=document.getElementById("team-chat");
                ele.innerHTML+=FireBase.chathtml(childsnap.val(),false);
            });
        });
    },
    chathtml(_data,showbatch=false){
        if(_data==null)
            return
        if(!_data.time)
            return;
        var html=`
                    <div class="msg-ele">
                        <div class="msg-df">
                            <div class="elee g1">${_data.name} ${showbatch?`(${_data.branch.toUpperCase()})`:``}</div>
                            <div class="elee">${_data.mode}</div>
                            <div class="elee dm">${FireBase.convert(_data.time)}</div>
                        </div>
                        <div class="elee g1">
                            ${_data.msg}
                        </div>
                    </div>
        `;
        return html;
    },
    convert(time){
        var _time=new Date(time).toLocaleString();
        var f=_time.split(" ")[1].split(":")[0];
            if(f<10)f="0"+f;
        var s=_time.split(" ")[1].split(":")[0];
            if(s<10)s="0"+s;
        _time=f+":"+s+" "+_time.split(" ")[2];
        return _time;
    },
    GameOver(){
        firebase.database().ref(path+"ginfo/wininfo/"+data.batch+"/").set(new Date().getTime());
    },
    position(x){
        if(x==1)
            return "First";
        if(x==2)
            return "Second";
        if(x==3)
            return "Third";
        if(x==4)
            return "Fourth";
        if(x==5)
            return "Fivth";
        if(x==6)
            return "Sixth";
        if(x==7)
            return "Last";
    },
    finish(eles){
        if(task)
            task.complete();
        var html=`<div style="padding: 20px;">
            <h1 style="font-size: 3rem;font-weight: bold;color:#f00;">Game Over</h1>`;
        for(var i=0;i<eles.length;i++)
        {
            var boo=(data.batch.toLowerCase()==eles[i].batch.toLowerCase());
            html+=   `<div style="display: flex;align-items: center;font-size: 2rem;">
                        <div style="flex: 1;direction: rtl;margin: 10px;${boo?"color:#0f0;":""}">${eles[i].batch.toUpperCase()}</div>
                        <div style="flex: 1;margin: 10px;${boo?"color:#0f0":""}">${eles[i].pos.toUpperCase()}</div>
                    </div>`
        }
        html+=`</div>`;
        var tdiv=document.getElementById("task");
        tdiv.innerHTML=html;
        tdiv.style.zIndex=200;
        tdiv.style.background="#0000009f";
    }
}
var Details={
    init(){
        this.slider=new Nexter("slider");
        this.hidden=true;
        this.sliderInternal=false;
        message.init();
        this.ismoving=false;
    },
    async move(num,internal=false){
        if(Details.ismoving)return;
        Details.ismoving=true;
        message.inputdiv(true);
        if(Details.hidden && num!=Details.slider.curpos){
            document.getElementById("mslider").style.transform="translateY(-50%)";
            Details.hidden=false;
            message.inputdiv(false);
        }
        if(num==2){
            Details.Inject_TeamDetails();
            message.inputdiv(false);
        }
        if(num==1){
            message.global=false;
        }
        if(num==0){
            message.global=true;
        }
        if(!(Details.sliderInternal && !internal)){
            if(num>Details.slider.curpos){
                await Details.slider.next();
                await Details.move(num,true);
            }
            if(num<Details.slider.curpos){
                await Details.slider.next(true);
                await Details.move(num,true);
            }
        }
        if(internal==false){
            Details.sliderInternal=true;
        }
        Details.sliderInternal=false;
        var val=["Global Chat","Team Chat","Game Info"];
        val[0]=val[0]+" : online "+USERS_ONLINE.length;
        //team_=USERS_ONLINE.filter((a)=>{return a.batch==data.batch})
        val[1]=val[1]+" : online "+USERS_ONLINE.filter((a)=>{return a.batch==data.batch}).length;
        var font_a=["globe","users","list"];
        document.getElementById("mainhead").innerHTML=`<i class="fa fa-${font_a[num]}" aria-hidden="true" style="background: transparent;"></i> ${val[num]}`;
        Details.ismoving=false;
    },
    hideslider(){
        document.getElementById("mslider").style.transform="translateY(100%)";
        Details.hidden=true;
        message.inputdiv(false);
    },
    Inject_TeamDetails(){
        var _data=Team.sort((a,b)=>{return (a.pos>b.pos)?-1:1});
        Details.slider.eles[2].innerHTML='';
        for(var i=0;i<_data.length;i++)
        {
        Details.slider.eles[2].innerHTML+=`
        <div class="team">
            <div class="team-df">
                <div class="team-ele">
                    <div class="team-df">
                        <div class="team-ele">Team : ${_data[i].batch.toUpperCase()}</div>
                        <div class="team-ele">Cur Position : ${_data[i].pos}</div>
                    </div>
                    <div class="team-ele">
                        ${_data[i].pos==-1?`Task : No task`:`Task ${_data[i].pos} : ${_data[i].taskcompletd?`Completed`:`${_data[i].task}`}`}
                    </div>
                </div>
                <div class="team-ele col">
                    <div class="team-col" style="background:${_data[i].col==null?"#fff":`${_data[i].col}`}">
                        col
                    </div>
                </div>
            </div>
        </div>`;
        }   
    }
}
var message={
    init(){
        this.ele=document.getElementById("msgsend");
        this.global=false;
        this.name=board.player.name;
        this.msgdiv=document.getElementById("msg");
        this.ele.style.height="0px";
    },
    send(){
        var msg=message.msgdiv.value.trim();
        if(msg.length>0){
            var _data={
                time : new Date().getTime(),
                msg : msg,
                name : data.name,
                mode : data.mode,
                branch : data.batch 
            }
            var _path=path+"chats/chats/";
            if(!message.global){
                _path=path+"chats/"+data.batch+"/";
            }
            firebase.database().ref(_path).push(_data);
            message.msgdiv.value="";
        }
    },
    inputdiv(show=false){
        if(show)
            message.ele.style.height="auto";
        else
            message.ele.style.height="0px";
    }
}
