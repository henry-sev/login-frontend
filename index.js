// window.onload = function() {
//   fetch('http://127.0.0.1:3000')
//     .then(res => {
//       // console.log(res);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//     })
// }


function getName() {
  const userName = document.querySelector('#user-name');
  return userName.value.trim();
}

function getPassword() {
  const userPassward = document.querySelector('#user-password');
  return userPassward.value.trim();
}

function checkAccount() {
  let $name = getName();
  let $password = getPassword();
  let $result = false;
  fetch('http://127.0.0.1:3000')
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.forEach(item => {
        if (item['name'] === $name && item['password'] === $password) {
          $result = true;
        } 
      });
      if ($result) {
        // window.location.href="https://www.hackerstart.cn/";
        alert('登录成功')
      } else {
        alert('账户不存在，请注册')
        window.location.href="./sign-up.html"
      };
    })
}

// async function logIn() {
//   if (await checkAccount()) {
//     console.log('账户存在，已登录');
//   }
//   else {
//     console.log('账户不存在，请注册');
//   }
// }

// function goToSignUp() {
//   const loginBtn = document.querySelector('#login-btn');
//   let signUp = document.createElement('a');
//   signUp.setAttribute('href', './sign-up.html');
//   signUp.textContent = 'Log in';
// }

