class CustomError extends Error {
    constructor(message, status, statusText) {
      super(message); 
      this.response = {
        status: status,
        statusText: statusText,
      };
    }
  }
  
  module.exports = CustomError;