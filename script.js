// script.js

// Example unlock code to decrypt card numbers or perform unlock
const UNLOCK_PASSWORD = 'DEEZNUTZ';

// Dummy encryption/decryption functions (simple XOR with password char codes)
function xorEncryptDecrypt(input, key) {
  const keyCodes = [...key].map(c => c.charCodeAt(0));
  const inputCodes = [...input].map(c => c.charCodeAt(0));
  return inputCodes.map((code, i) => 
    String.fromCharCode(code ^ keyCodes[i % keyCodes.length])
  ).join('');
}

// Validate card number format (e.g. "CNL-XXXX-XXXX-XXXX")
function validateCardNumber(cardNum) {
  const regex = /^CNL(-[A-F0-9]{4}){3}$/;
  return regex.test(cardNum);
}

// Show animated notification
function showNotification(message, isError = false) {
  const notif = document.createElement('div');
  notif.textContent = message;
  notif.style.position = 'fixed';
  notif.style.top = '20px';
  notif.style.right = '20px';
  notif.style.padding = '15px 25px';
  notif.style.background = isError ? '#f00' : '#0f0';
  notif.style.color = '#000';
  notif.style.fontWeight = 'bold';
  notif.style.borderRadius = '8px';
  notif.style.boxShadow = '0 0 15px #0f0';
  notif.style.zIndex = '1000';
  notif.style.opacity = '1';
  notif.style.transition = 'opacity 0.8s ease-out';
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => document.body.removeChild(notif), 900);
  }, 3000);
}

// Unlock card - checks unlock code and returns decrypted card data or error
function unlockCard(cardNumInput, unlockCodeInput) {
  if (!validateCardNumber(cardNumInput)) {
    showNotification('❌ Invalid card number format!', true);
    return null;
  }

  if (unlockCodeInput !== UNLOCK_PASSWORD) {
    showNotification('❌ Wrong unlock code!', true);
    return null;
  }

  // For demo, decrypt dummy encrypted card data:
  // In real use, you'd fetch encrypted card data associated with the cardNumInput
  const encryptedCardData = xorEncryptDecrypt(cardNumInput, UNLOCK_PASSWORD); // just example

  showNotification('✅ Card unlocked successfully!');

  return encryptedCardData;
}

// Attach events for form buttons
document.addEventListener('DOMContentLoaded', () => {
  const unlockForm = document.getElementById('unlockForm');
  if (unlockForm) {
    unlockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cardNum = document.getElementById('cardNumber').value.trim();
      const unlockCode = document.getElementById('unlockCode').value.trim();
      const result = unlockCard(cardNum, unlockCode);
      if(result) {
        // Display or process unlocked card data here
        console.log('Unlocked Card Data:', result);
      }
    });
  }
});

