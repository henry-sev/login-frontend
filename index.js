function getInputValue(inputId) {
  const input = document.querySelector(inputId);
  return input.value.trim();
}

function signIn() {
  if(isEmpty()) {
    checkAcount();
  } else {
    alert('请不要输入空值');
  }

}

//检查账户密码是否正确
function checkAcount() {
  let $name = getInputValue("#user-name");
  let $password = getInputValue("#user-password");
  let isName = false;
  let isPassword = false;
  fetch('http://127.0.0.1:3000')
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.forEach(item => {
        if (item['name'] === $name) {
          isName = true;
          if (item['password'] === $password) {
            isPassword = true;
          }
        }
      });
      if (isName && isPassword) {
        window.location.href="https://www.hackerstart.cn/";
        // alert('登录成功')
      } else if (isName && !isPassword) {
        alert('密码不正确');
      } else if (!isName) {
        alert('用户不存在');
      }
    })
}

function signUp() {
  let $name = getInputValue("#user-name");
  let $password = getInputValue("#user-password");
  let $email = getInputValue("#user-email");
  let $rePassword = getInputValue("#repeat-password");

  const newUser = {};
  newUser.name = $name;
  newUser.email = $email;
  newUser.password = $password;

  if (isEmpty()) {
    if ($password === $rePassword) {
      isExisting($name).then(result => {
        if (result) {
          postUser(newUser);
          window.location.href = "./index.html";
        }
      });
    } else {
      alert('两次密码输入不一致')
    }
  } else {
    alert('请不要输入空值');
  }
}

//判断输入是否为空
function isEmpty() {
  let result = true;
  let items = document.querySelectorAll('.is-empty');
  items.forEach(item => {
    if(!item.value) {
      result = false;
      item.classList.add('red-border');
    } else {
      item.classList.remove('red-border');
    }
  });
  return result;
}

//检查账户是否已存在
async function isExisting($name) {
  let result = true;
  await fetch('http://127.0.0.1:3000')
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.forEach(item => {
        if (item.name === $name) {
          alert('用户已存在');
          result = false;
        }
      });
    });
  return result;
}

//post新用户信息
function postUser(newUser) {

  fetch("http://127.0.0.1:3000", {
    method: "POST",
    body: JSON.stringify(newUser),
    // headers: new Headers({
    //   'Content-Type': 'application/json'
    // })
  })

  // let headers = new Headers();
  // headers.append('Content-Type', 'application/json');

  // let req = new Request("http://127.0.0.1:3000", {
  //   method: 'POST',
  //   // headers: headers,
  //   body: JSON.stringify(newUser)
  // });
  // fetch(req)
  //   .then(res => {
  //     // return res.json();
  //   })
  //   .catch(err => {
  //     console.log("请求失败");
  //   })
}
