// Function to handle user login
function loginUser() {
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem(nickname);
    
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        // Check if the password matches
        if (userData.password === password) {
            alert("로그인 성공!");
            localStorage.setItem('loggedInUser', nickname); // Store logged-in user's nickname
            window.location.href = 'message.html'; // Redirect to message.html
        } else {
            alert("비밀번호가 올바르지 않습니다.");
        }
    } else {
        alert("닉네임이 올바르지 않습니다.");
    }
}

// Function to handle user registration
function registerUser() {
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;

    // Create user data object
    const userData = { name, studentId, nickname, password };
    
    // Store user data in localStorage
    localStorage.setItem(nickname, JSON.stringify(userData));

    alert("회원가입이 완료되었습니다!");
    window.location.href = 'login.html'; // Redirect to login.html
}

// Function to send a message
function sendMessage() {
    const recipient = document.getElementById('recipientNickname').value;
    const content = document.getElementById('messageContent').value;
    const sender = localStorage.getItem('loggedInUser') || 'Unknown User'; // Get the logged-in user

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ sender, recipient, content });

    localStorage.setItem('messages', JSON.stringify(messages));

    document.getElementById('recipientNickname').value = '';
    document.getElementById('messageContent').value = '';

    alert("쪽지가 발송되었습니다!");
}

// Function to display messages for the logged-in user
function showMessages() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const messageDisplay = document.getElementById('messageDisplay');
    const messageText = document.getElementById('messageText');

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const userMessages = messages.filter(msg => msg.recipient === loggedInUser);

    if (userMessages.length > 0) {
        messageText.innerHTML = userMessages.map(msg => `
            <strong>보낸 사람:</strong> ${msg.sender}<br>
            <strong>내용:</strong> ${msg.content}
        `).join('<br><br>');
        messageDisplay.style.display = 'block';
    } else {
        messageDisplay.style.display = 'none';
    }
}

// Event listener to initialize the message display on page load
document.addEventListener('DOMContentLoaded', showMessages);
