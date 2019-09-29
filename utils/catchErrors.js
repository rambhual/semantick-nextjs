function catchError(error, displayError) {
  let errorMsg = "";
  if (error.response) {
    errorMsg = error.response.data;
    console.error("Error response", errorMsg);
    // for cloudinary error message
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    errorMsg = error.request;
    console.error("error request", errorMsg);
  } else {
    errorMsg = error.message;
    console.error("Error message!", errorMsg);
  }
  displayError(errorMsg);
}

export default catchError;
