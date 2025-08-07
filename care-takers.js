document.addEventListener('DOMContentLoaded', () => {
  const addCaretakerForm = document.getElementById('addCaretakerForm');
  const caretakersList = document.getElementById('caretakersList');
  const caretakerLoadingSpinner = document.getElementById('caretakerLoadingSpinner');
  const noCaretakersMessage = caretakersList ? caretakersList.querySelector('.no-caretakers-message') : null;

  // Mock data for caretakers (replace with real data from backend/Firestore later)
  let mockCaretakers = [
    { id: '1', name: 'Alice Smith', contact: 'alice.s@example.com', specialty: 'Elderly Care' },
    { id: '2', name: 'Bob Johnson', contact: '+1-555-123-4567', specialty: 'Post-Operative Recovery' },
  ];

  // Function to display caretakers
  const displayCaretakers = () => {
    caretakersList.innerHTML = ''; // Clear existing
    if (mockCaretakers.length === 0) {
      if (noCaretakersMessage) {
        noCaretakersMessage.style.display = 'block';
      } else {
        caretakersList.innerHTML = '<p class="no-caretakers-message">No caretakers added yet. Add one above!</p>';
      }
      return;
    } else {
      if (noCaretakersMessage) {
        noCaretakersMessage.style.display = 'none';
      }
    }

    mockCaretakers.forEach(caretaker => {
      const caretakerCard = document.createElement('div');
      caretakerCard.classList.add('caretaker-card');
      caretakerCard.dataset.id = caretaker.id; // Store ID for deletion

      caretakerCard.innerHTML = `
        <h4>${caretaker.name}</h4>
        <p><strong>Specialty:</strong> ${caretaker.specialty}</p>
        <p class="contact-info"><strong>Contact:</strong> ${caretaker.contact}</p>
        <div class="actions">
          <button class="btn-secondary edit-caretaker-btn" data-id="${caretaker.id}"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn-danger delete-caretaker-btn" data-id="${caretaker.id}"><i class="fas fa-trash-alt"></i> Delete</button>
        </div>
      `;
      caretakersList.appendChild(caretakerCard);
    });

    // Add event listeners for new buttons
    document.querySelectorAll('.delete-caretaker-btn').forEach(button => {
      button.addEventListener('click', (e) => deleteCaretaker(e.target.dataset.id));
    });
    document.querySelectorAll('.edit-caretaker-btn').forEach(button => {
      button.addEventListener('click', (e) => editCaretaker(e.target.dataset.id));
    });
  };

  // Function to add a new caretaker
  if (addCaretakerForm) {
    addCaretakerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('caretakerName').value;
      const contact = document.getElementById('caretakerContact').value;
      const specialty = document.getElementById('caretakerSpecialty').value;

      const newCaretaker = {
        id: String(mockCaretakers.length + 1), // Simple ID generation
        name,
        contact,
        specialty
      };

      caretakerLoadingSpinner.classList.remove('hidden');
      setTimeout(() => { // Simulate API call
        mockCaretakers.push(newCaretaker);
        addCaretakerForm.reset(); // Clear form
        displayCaretakers();
        caretakerLoadingSpinner.classList.add('hidden');
        console.log('Caretaker added:', newCaretaker);
      }, 500);
    });
  }

  // Function to delete a caretaker
  const deleteCaretaker = (id) => {
    // In a real app, you'd show a confirmation modal here
    if (confirm('Are you sure you want to delete this caretaker?')) {
      caretakerLoadingSpinner.classList.remove('hidden');
      setTimeout(() => { // Simulate API call
        mockCaretakers = mockCaretakers.filter(c => c.id !== id);
        displayCaretakers();
        caretakerLoadingSpinner.classList.add('hidden');
        console.log('Caretaker deleted:', id);
      }, 500);
    }
  };

  // Function to edit a caretaker (placeholder for now)
  const editCaretaker = (id) => {
    const caretakerToEdit = mockCaretakers.find(c => c.id === id);
    if (caretakerToEdit) {
      // In a real application, you'd populate a modal form with this data
      // For now, we'll just log it and simulate an update
      console.log('Editing caretaker:', caretakerToEdit);
      const newName = prompt(`Edit name for ${caretakerToEdit.name}:`, caretakerToEdit.name);
      if (newName !== null) {
        caretakerLoadingSpinner.classList.remove('hidden');
        setTimeout(() => {
          caretakerToEdit.name = newName;
          displayCaretakers();
          caretakerLoadingSpinner.classList.add('hidden');
          console.log('Caretaker updated:', caretakerToEdit);
        }, 500);
      }
    }
  };

  // Initial display of caretakers when the page loads
  if (document.getElementById('care-taker-content')) { // Only run if the section exists
    displayCaretakers();
  }
});
