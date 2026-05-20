function getUserInfo() {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
}

function logout() {
  localStorage.removeItem('userInfo');
  window.location.href = 'index.html';
}

function updateAuthUI() {
  const userInfo = getUserInfo();
  const authLink = document.getElementById('auth-link');
  
  if (authLink) {
    if (userInfo) {
      authLink.innerHTML = `
        <span style="color: var(--text-main); margin-right: 1rem;">Hi, ${userInfo.name}</span>
        <a href="#" onclick="logout()" style="cursor: pointer;">Logout</a>
      `;
    } else {
      authLink.innerHTML = `<a href="login.html">Login</a>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', updateAuthUI);
