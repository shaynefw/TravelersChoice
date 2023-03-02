// Get the review ID from the endpoint
const review_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];


// Create new post
const createReviewHandler = async (event) => {
  event.preventDefault();

  const country_id = document.querySelector('#input-country').value;
  const rating = document.querySelector('#input-rating').value;
  const content = document.querySelector('#input-review').value.trim();

  if (country_id && rating && content) {
    const response = await fetch('/api/review', {
      method: 'POST',
      body: JSON.stringify({ country_id, rating, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard'); // When successful, load the dashboard page
    } else {
      alert('Failed to create a new post.'); // When unsuccessful, show alert
    }
  }
};


// Update the post 
const updateReviewHandler = async (event) => {
  event.preventDefault();

  const country_id = document.querySelector('#input-country').value;
  const rating = document.querySelector('#input-rating').value;
  const content = document.querySelector('#input-review').value.trim();

  if (country_id && rating && content) {
    const response = await fetch(`/api/review/${review_id}`, {
      method: 'PUT',
      body: JSON.stringify({ country_id, rating, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard'); // When successful, load the dashboard page
    } else {
      alert('Failed to update a post.'); // When unsuccessful, show alert
    }
  }
};


// Delete the review
const deleteReviewHandler = async (event) => {
  event.preventDefault();
  console.log('Delete button');

  const response = await fetch(`/api/review/${review_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard'); // When successful, load the dashboard page
  } else {
    alert('Failed to delete a post.'); // When unsuccessful, show alert
  }
};

// Event listeners
document
  .querySelector('.create-form')
  .addEventListener('submit', createReviewHandler);

document
  .querySelector('.update-form')
  .addEventListener('submit', updateReviewHandler);

document
  .querySelector('.delete-form')
  .addEventListener('submit', deleteReviewHandler);
