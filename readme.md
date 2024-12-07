# ITIS-6177 Final Project - Azure AI Speech (STE) API

System Integration (ITIS-6177) Final Project - Simple Text Extraction (Fall 2025)

### Table of Contents

- [Why?](#why)
- [Built Using](#built-using)
- [Endpoints](#endpoints)
- [Response Codes](#response-codes)
- [Limitations](#limitations)
- [Thank you!](#thank-you)

## Why?

The goal of this project is to develop a simplified REST API for Simple Text Extraction using [Azure AI Speech](https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence/) service. This API aims to provide an accessible and easy-to-use interface for Simple Text Extarction functionality into various applications.

## Built Using

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

### Installation

1. Clone the repository:  
   ```bash
   cd ITIS6177-FinalProject
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Configure environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:  
   ```bash
   node app.js
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable           | Description                              |
|--------------------|------------------------------------------|
| `PORT`             | Port for the server to run (default: 3000) |
| `DOCUMENT_INTELLIGENCE_API_KEY`   | API subscription key                    |
| `DOCUMENT_INTELLIGENCE_ENDPOINT` | Base endpoint for Text Extraction API |
| `DOCUMENT_INTELLIGENCE_LOCATION` | Region for the Text Extraction API         |




## Getting Started

Let's get started with Simple-Text-Extraction!

[Swagger UI Azure STS](http://134.122.5.204:3000/api-docs) documentation has been set up for this project and can be used to explore the API endpoints.

###Steps

1.Open the endpoint and check it is working or not.

2.Then enter the url for the png image which you want to extract the text.

3. Then enter execute on the screen and we can observe the Text is being Extracted.


- [Postman](https://www.postman.com/) or any similar API testing tool.

### Steps

1. Open Postman and create a new request.


2. Enter the base URL along with the desired [endpoint](#endpoints). Change the request type to POST.


3. Navigate to the Header section and add a header key "Content-Type" with value as "application/json" as shown below.


4. Navigate to Body section and select _raw_ format. Then, enter the text you want to convert to speech in JSON format. (Enter the text in the below format with text as the key and the text you want to convert in the form of value to the key "text")


5. Click Send and wait for the response.

6. You'll receive a Text from the png.




## Sample Response

The response will be an file having Text extracted from the .png file.


## Note

- Ensure your `.env` file is properly configured with valid credentials.  
-  Check Input .png file location is entered correctly or not.  


## Limitations

-API Rate Limits: If you exceed the API rate limit, you may receive a 429 Too Many Requests error. Consider batching requests or waiting before retrying.
-Document Formatting Issues: If the text extraction quality is poor (e.g., due to unusual layouts), consider preprocessing the document or using OCR (Optical Character Recognition) tools in combination with the API.
-API Key Issues: If you encounter authentication errors, double-check that your API key is correct and properly configured.

## Thank You
