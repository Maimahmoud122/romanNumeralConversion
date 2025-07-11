// ✅ Convert Roman → Decimal
document.getElementById('convertForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent page reload

  const roman = document.getElementById('romanInput').value.trim();
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch('http://localhost:8000/to-decimal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roman }),
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.textContent = `✅ Roman: ${data.roman} → Decimal: ${data.decimal}`;
      resultDiv.style.color = 'green';

      // Optional: Refresh the list automatically after a new conversion
      // fetchConversions();
    } else {
      resultDiv.textContent = `❌ ${data.error}`;
      resultDiv.style.color = 'red';
    }
  } catch (error) {
    resultDiv.textContent = '❌ Error connecting to the server.';
    resultDiv.style.color = 'red';
  }
});

// ✅ Fetch All Conversions (when you click "Refresh List")
async function fetchConversions() {
  try {
    const response = await fetch('http://localhost:8000/conversions');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to load conversions.');
    }

    const list = document.getElementById('conversionList');
    list.innerHTML = ''; // Clear old list

    data.conversions.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item._id} ${item.input} → ${item.output}`;
      list.appendChild(li);
    });
  } catch (err) {
    alert('❌ Error loading conversions: ' + err.message);
  }
}

// ✅ Get Conversion by ID
document.getElementById('getByIdForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('conversionIdInput').value.trim();
  const singleResultDiv = document.getElementById('singleResult');

  if (!id) {
    singleResultDiv.textContent = '❌ Please enter an ID.';
    singleResultDiv.style.color = 'red';
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/conversions/${id}`);
    const data = await response.json();

    if (response.ok && data.conversion) {
      singleResultDiv.textContent = `✅ ID: ${data.conversion._id} | ${data.conversion.input} → ${data.conversion.output}`;
      singleResultDiv.style.color = 'green';
    } else {
      singleResultDiv.textContent = data.error || '❌ Conversion not found.';
      singleResultDiv.style.color = 'red';
    }
  } catch (err) {
    singleResultDiv.textContent = '❌ Error fetching conversion.';
    singleResultDiv.style.color = 'red';
  }
});
// update conversion
document.getElementById('UpdateConversion').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('updateConversionIdInput').value.trim();
  const newValue = document.getElementById('conversionNewValue').value.trim();

  try {
    const response = await fetch(`http://localhost:8000/conversions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: newValue }),
    });

    const data = await response.json();



    if (response.ok) {
      alert(`✅ Updated successfully: ${data.updatedConversion.input} → ${data.updatedConversion.output}`);
      fetchConversions(); // Refresh list
    } else {
      alert(`❌ Update failed: ${data.error}`);
    }
  } catch (err) {
    alert('❌ Error updating conversion: ' + err.message);
  }
});


document.getElementById('deleteByIdForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('deleteConversionIdInput').value.trim();

  try {
    const response = await fetch(`http://localhost:8000/conversions/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Deleted successfully.');
      fetchConversions(); // Refresh list
    } else {
      alert(`❌ Delete failed: ${data.error}`);
    }
  } catch (err) {
    alert('❌ Error deleting conversion: ' + err.message);
  }
});

// Utility: Clear inputs of a form
function clearForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => (input.value = ''));
}

// Get all form IDs
const formIds = ['convertForm', 'getByIdForm', 'UpdateConversion', 'deleteByIdForm'];

// Add input listener to each form
formIds.forEach((activeFormId) => {
  const form = document.getElementById(activeFormId);
  if (!form) return;

  const inputs = form.querySelectorAll('input');

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      formIds
        .filter((id) => id !== activeFormId) // skip current form
        .forEach((otherFormId) => clearForm(otherFormId));
    });
  });
});





