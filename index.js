const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const DocumentIntelligence = require('@azure-rest/ai-document-intelligence').default;
const { getLongRunningPoller, isUnexpected } = require('@azure-rest/ai-document-intelligence');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    info: {
      title: 'Document Text Extraction API',
      version: '1.0.0',
      description: 'This API extracts text content from a document using Azure Document Intelligence.'
    },
    host: 'localhost:3000',
    basePath: '/',
  },
  apis: ['./index.js'],
  explorer: true,
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * @swagger
 * /extract-text:
 *    post:
 *      description: A wrapper API for extracting text content from a document.
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: Input
 *            description: The JSON for text extraction, provide the document URL.
 *            schema:
 *              type: object
 *              required:
 *                - url
 *              properties:
 *                url:
 *                  type: string
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Extracted text content
 */

// API endpoint
app.post('/extract-text', async (req, res) => {
  const { url } = req.body;

  try {
    const client = DocumentIntelligence(
      process.env.DOCUMENT_INTELLIGENCE_ENDPOINT,
      { key: process.env.DOCUMENT_INTELLIGENCE_API_KEY }
    );

    const initialResponse = await client
      .path("/documentModels/prebuilt-read:analyze")
      .post({
        contentType: "application/json",
        body: {
          urlSource: url
        }
      });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const poller = await getLongRunningPoller(client, initialResponse);
    const analyzeResult = (await poller.pollUntilDone()).body.analyzeResult;

    // Process the analyzeResult and return the desired information
    res.json(analyzeResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to extract text' });
  }
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
