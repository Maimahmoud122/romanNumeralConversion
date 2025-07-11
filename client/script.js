document.getElementById('convertForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent page reload

  const roman = document.getElementById('romanInput').value.trim();
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch('http://localhost:8000/to-decimal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roman })
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Show conversion result
      resultDiv.textContent = `Roman: ${data.roman} → Decimal: ${data.decimal}`;
      resultDiv.style.color = 'green';
    } else {
      // ❌ Show error message
      resultDiv.textContent = data.error;
      resultDiv.style.color = 'red';
    }
  } catch (error) {
    resultDiv.textContent = 'Error connecting to the server.';
    resultDiv.style.color = 'red';
  }
});

async function fetchConversions() {
  try {
    const response = await fetch('http://localhost:8000/conversions');
    if (!response.ok) {
      throw new Error('Failed to load conversions');
    }

    const data = await response.json();
    const list = document.getElementById('conversionList');
    list.innerHTML = ''; // Clear current list

    data.conversions.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.input} → ${item.output} `;
      list.appendChild(li);
    });
  } catch (err) {
    alert('Error loading conversions: ' + err.message);
  }
}




window.onload = loadConversions;


