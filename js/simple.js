

//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove,onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "#############################",
    authDomain: "#############################",
    databaseURL: "https://project-7378785780741724759-default-rtdb.firebaseio.com",
    projectId: "#############################",
    storageBucket: "#############################",
    messagingSenderId: "#############################",
    appId: "#############################"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// //この辺りに書く

// //ログイン処理（できたらやる）
// //##########################################
// $("#login").on("click",function(){
//     //Google認証完了後の処理
//     signInWithPopup(auth,provider).then((result) => {
//         //ログイン後のページ遷移
//         location.href="index.html"
//     }).catch((error) => {
//         //Handle Errors here
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         //The email of the user's account used.
//         const email = error.email;
//         //The AuthCredential type that was used
//         const credential = GoogleAuthProvider.credentialFromError(error);
//     });
// });


// //チャット処理
// //##########################################

const db = getDatabase(app);
const dbRef = ref(db,"1125");

// //送信処理を記述
// $("#send").on("click", function(){
//     //id = "text"の場所を取得します
//     const text = $("#text").val();
//     // console.log(text,"ss");

//     //取得できているか表示の確認
//     // alert(uname + text);

//     //データの塊を作る
//     //msg　という名前で塊を作る
//     //uname という鍵の名前
//     //text という鍵の名前
//     //作成したデータの塊をfirebaseに送信をする→これが保存になる


    // const msg = {
    //     text: text,
    // }
//     console.log(msg);

//     //保存のコード
//     const newPostRef = push(dbRef);
//     set(newPostRef,msg); //firebaseの登録できる場所に保存するイメージ

//     //送信後に入力欄を空にする
//     $("#text").val("");
    
//     //入力後、ID=unameにカーソルを自動フォーカス（移動）
//     $("#text").focus();

//     //send送信イベント この下消さない
// });


// $("#text").on("keydown",function(e){
//     console.log(e,"イベントのデータの塊");
// });


// //受信処理を記述
// onChildAdded(dbRef,function(data){
//     //ここからが受信処理が始まります

//     // 登録されたデータを取得する
//     const msg = data.val();
//     console.log(msg,"取得したデータの塊");
//     const key = data.key;
//     console.log(key,"データの塊にアクセス");


//     //es6のテンプレートリテラル
//     let h = `
//         <div class="msg">
//             <p>${msg.text}</p>
//             <img id="upimage">
//         </div>
//     `;
//     $("#output").append(h);
    
// });


//////////////////////////botのテスト領域///////////////////////
//ロボットの返答内容
const chat = [
    "こんちわ😇", //0
    "あんたの名前はなんだい？😡", //1
    "パンチ効いた名前だね✊", //2
    "ところでなんだが…", //3
    "住所はどこだい？👀", //4
    "ついでだから郵便番号も教えてくれよ？🔥", //5
    //6
    [
        "来年も一緒に桜を見れるといいね！",
        "お願いだから、もう、私に優しくしないで…",
        "桜の花の落ちるスピード。秒速5センチメートル",
        "時間ははっきりした悪意をもって、僕の上をゆっくりと流れていった。",
        "出す宛のないメールを打つくせがついたのは、いつからだろう…",
        "迷ってばかりなんだ、俺。できることをなんとかやってるだけ",
        "あなたのことは今でも好きです。",
        "僕はただ働き続け、気付けば、日々弾力を失っていく心がひたすら辛かった・・・",
        "その瞬間、永遠とか心とか魂とかいうものがどこにあるのか、わかった気がした",
        "かつてあれ程までに真剣で切実だった思いが、きれいに失われている事に僕は気づき、もう限界だと知った時、会社を辞めた。"
    ]
];

//botの返信回数
let chatCount = 0;

//テキスト入力と送信ボタンを宣言
const chatBtn = document.getElementById("send");
const inputText = document.getElementById("text");

//valはメッセージ内容、personは誰が話しているか
function output(val,person){
    const area = document.getElementById("chat_area");

    const ul = document.getElementById("chat-ul");
    const li = document.createElement("li");
    //このdivにテキストを指定
    const wrap = document.createElement("div")
    const div = document.createElement("div");
    const icon = document.createElement('li');

    //メッセージ内容に反映
    div.textContent = val;

    if(person === "me"){ //チャットが自分の時の処理
        div.classList.add("chat-right"); //右側クラス名を付与
        li.classList.add("right");
        ul.appendChild(li);
        li.appendChild(div);
    } else if (person === "robot"){ //チャットがbotの処理
        //連続で自分が送信できないようにする
        chatBtn.disabled = true; //ボタン押下をできないように指定
        setTimeout(function(){
            chatBtn.disabled = false;
            wrap.classList.add("wrap");
            icon.classList.add("icon");
            div.classList.add("chat-left");
            li.classList.add("left");
            ul.appendChild(wrap);
            wrap.appendChild(icon);
            wrap.appendChild(li);
            li.appendChild(div);
            //botのトーク回数の値を＋１する
            chatCount++;
        },2000);
    }
}

//受信処理を記述
onChildAdded(dbRef,function(data){
    //ここからが受信処理が始まります

    // 登録されたデータを取得する
    const msg = data.val();
    console.log(msg,"取得したデータの塊");
    const key = data.key;
    console.log(key,"データの塊にアクセス");


    // //es6のテンプレートリテラル
    // let h = `
    //     <div class="msg">
    //         <p>${msg.text}</p>
    //         <img id="upimage">
    //     </div>
    // `;
    // $("#output").append(h);
    
});

//最初にbotから話しかけられるように
output(chat[0],"robot");

setTimeout(function(){
    output(chat[1],"robot");
},2000);

//送信ボタンを押した時の処理
$("#send").click(function(){
    const text = $("#text").val();
    const msg = {
        text: text,
    }
    const newPostRef = push(dbRef);
    set(newPostRef,msg); //firebaseの登録できる場所に保存するイメージ


    //空の値を送信できないようにする
    if(!inputText.value) return false;
    //自分のテキストを送信
    output(inputText.value,"me");
    //入力内容を空欄に
    setTimeout(function(){
        inputText.value="";
    }, 1);

    //botのトーク数に応じて返信内容を指定
    switch(chatCount){
        //もしbotのトーク数が2個の時に押されたら
        case 2:
            output(inputText.value + "っていうのか！","robot");
            //3つ目の返信を連続で行う
            setTimeout(function(){
                output(chat[2],"robot");
            },2000);
            break;
        //もしbotのトーク数が4個の時に送信ボタンが押されたら
        //chat配列の4個目(chat[3])が返信
        case 4:
            output(chat[3],"robot");
            setTimeout(function(){
                output(chat[4],"robot");
            },2000);
            break;

        case 6:
            output(inputText.value + "？どこだそりゃ👀","robot");
            setTimeout(function(){
                output(chat[5],"robot");
            },2000);
            break;
        
        case 8:
            output("(簡単に情報渡してくれるな…)","robot");
            setTimeout(function(){
                output("(こいつチョロいぜ🤗)","robot");
            },2000);
            setTimeout(function(){
                output("(ここから先、秒速5センチの名言が飛び出す)","robot");
            },2000);
            break;

        //それ以降はおうむ返し
        default:
            output(chat[6][Math.floor(Math.random()* chat[6].length)],"robot");
            break;

    }

});


//チャット内容が枠外に出たら最新の内容を表示（時間あればやる）
// let target = document.getElementById("chat_area");
// target.scrollIntoView(false);



//////////////////////////画像送信のテスト領域///////////////////////
let imgInput = $(function(){
        $("#file").change(function(e){
            let file = e.target.files[0];
            let reader = new FileReader();
            if(file.type.indexOf("image")<0){
                alert("画像ファイルを指定してください");
                return false;
            }
            reader.onload = (function(file){
                return function(e){
                    $("#upimage").attr("src",e.target.result);
                    $("#upimage").attr("title",file.name);
                };
            })(file);
            reader.readAsDataURL(file);
        });
    });

// $("#output").append(imgInput);

///////////////////テストここまで////////////////////////////