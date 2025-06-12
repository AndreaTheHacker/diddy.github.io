// nfc.js - NFC reading/writing and authentication

const nfcStatus = document.getElementById('nfc-status');

async function writeNFC(data) {
  if ('NDEFReader' in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.write(JSON.stringify(data));
      nfcStatus.textContent = '✅ NFC write successful!';
      nfcStatus.style.color = '#0f0';
    } catch (error) {
      nfcStatus.textContent = `❌ NFC write failed: ${error.message}`;
      nfcStatus.style.color = '#f00';
    }
  } else {
    nfcStatus.textContent = '⚠️ NFC not supported on this browser/device.';
    nfcStatus.style.color = '#ff0';
  }
}

async function readNFC(callback) {
  if ('NDEFReader' in window) {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      nfcStatus.textContent = '📡 NFC scanning...';

      ndef.onreadingerror = () => {
        nfcStatus.textContent = '❌ NFC reading error.';
        nfcStatus.style.color = '#f00';
      };

      ndef.onreading = event => {
        let message = '';
        for (const record of event.message.records) {
          const textDecoder = new TextDecoder(record.encoding || 'utf-8');
          message += textDecoder.decode(record.data);
        }
        nfcStatus.textContent = '✅ NFC read successful!';
        nfcStatus.style.color = '#0f0';
        callback(JSON.parse(message));
      };
    } catch (error) {
      nfcStatus.textContent = `❌ NFC scan failed: ${error.message}`;
      nfcStatus.style.color = '#f00';
    }
  } else {
    nfcStatus.textContent = '⚠️ NFC not supported on this browser/device.';
    nfcStatus.style.color = '#ff0';
  }
}

