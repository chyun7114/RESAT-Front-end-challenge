const idInput = document.getElementById('login-id');
const pwdInput = document.getElementById('login-pwd');
const loginBtn = document.querySelector('.login-button');
const loginCheck = document.querySelector('.login-check');

const userInfo ={
    id : 'test',
    pwd : '1234'
};


loginBtn.addEventListener('click', () => {
    // console.log('로그인 버튼 클릭됨')
    let userId = idInput.value;
    let userPwd = pwdInput.value;
    
    console.log(userId, userPwd);
    console.log((userInfo.id + userInfo.pwd));
    if((userInfo.id === userId) && (userInfo.pwd === userPwd)){
        loginCheck.style.display = "flex"; 
        loginCheck.textContent = "로그인 성공!!"
    }else if((userInfo.id !== userId)){
        loginCheck.style.display = "flex";
        loginCheck.style.backgroundColor = "rgba(216, 103, 103, 0.5)";
        loginCheck.style.border = "rgb(216, 103, 103) 2px solid";
        loginCheck.textContent = "아이디가 틀렸습니다!"
    }
    else if((userInfo.id === userId) && (userInfo.pwd !== userPwd)){
        loginCheck.style.display = "flex";
        loginCheck.style.backgroundColor = "rgba(216, 103, 103, 0.5)";
        loginCheck.style.border = "rgb(216, 103, 103) 2px solid";
        loginCheck.textContent = "비밀번호가 틀렸습니다!"
    }
});
