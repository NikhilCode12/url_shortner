# URL Shortener API 
[Postman Documentation Link](https://web.postman.co/workspace/1df59fe9-cafa-4c07-8f65-d125e6cb3142/documentation/30132855-509bdaa1-c39b-41da-8cc4-82b5f5b82cd6)
[Docker Image Repo](https://hub.docker.com/r/nikhilcode12/url_shortener)

This is a simple URL shortener API that allows users to:
- Shorten a URL.
- Redirect to the original URL using the shortened link.
- Retrieve usage statistics for a shortened URL.

The API is built with Node.js, Express, and MongoDB.

## Deployment
The API is deployed at: [https://url-shortener-api-zw6x.onrender.com](https://url-shortener-api-zw6x.onrender.com)

## API Endpoints

### 1. Shorten a URL
**POST** `/shorten` : Accepts a URL and returns a shortened URL.

**Request Body**:
```json
{
  "originalUrl": "https://sharmanikhilportfolio3d.vercel.app/"
}
```
***Response (200 OK)***:
```json
{
    "shortUrl": "https://url-shortener-api-zw6x.onrender.com/G3UdS6w8o"
}
```

### 2. Retrieve Original URL
**GET** `/:shortId` : Redirects the user to the original URL when accessed with the shortId.

**Request URL**: https://url-shortener-api-zw6x.onrender.com/G3UdS6w8o

***Response (200 OK)***: Found. Redirecting to https://sharmanikhilportfolio3d.vercel.app/

### 3. Retrieve Statistics of URL
**GET** `/stats/:shortId` : Returns the usage statistics for a specific short URL, including:
- Total number of clicks.
- Timestamp of the last accessed time.

**Request**: https://url-shortener-api-zw6x.onrender.com/stats/G3UdS6w8o

***Response (200 OK)***:
```json
{
    "originalUrl": "https://sharmanikhilportfolio3d.vercel.app/",
    "clicks": 1,
    "lastAccessed": "2024-11-26T16:45:22.161Z"
}
```

### Rate Limitation (100 calls per minute)
If the client exceeds 100 requests per minute, the API responds with:
```json
{
    "status": 429,
    "message": "Too many requests, please try again later."
}
```

## **Deployment Instructions**

### **Steps to Deploy**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/NikhilCode12/url_shortner.git
   cd url_shortner
   ```
2. **Set Up Environment Variables**: Create a .env file with the required variables:
   ```plaintext
   BASE_URL=https://url-shortener-api-zw6x.onrender.com
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/url-shortener?retryWrites=true&w=majority
   PORT=5000
   ```
3. **Install Dependencies**: Run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```
5. **Deploy the Application**: Deploy the project to your chosen platform, In my case, I have deployed it on render as a web service. Some of those platforms are:
   - Railway
   - Render
   - Vercel
6. **Verify Deployment**:
   - Access your deployed URL.
   - Test the API endpoints using Postman or your browser.

## Testing Locally

### Steps to Test the Application Locally

**Run the Server**:
   Start the server by running the following command:
   ```bash
   npm start
   ```
## URL Validation Check
Response for a invalid url is given as follows:
![image](https://github.com/user-attachments/assets/9022ce45-6ba3-460f-916f-5bfc9b4aa9c1)

# **Unit Testing Documentation**

### **Overview**
The unit tests for the URL Shortener API are written using Jest and Supertest. They test the core functionality of the API endpoints to ensure that the application behaves as expected.

### **Test Files**
The test files are located in the `src/tests` directory.

### **Test Suite**
The test suite uses **Jest** for the test runner and **Supertest** to make HTTP requests to the API.

### **Test Scenarios**

1. **POST `/shorten`** - Tests the URL shortening functionality.
   - **Test 1**: Ensure the API returns a valid shortened URL when a valid URL is provided.
   - **Test 2**: Ensure the API returns a `400` error if the provided URL is invalid.

2. **GET `/:shortId`** - Tests the redirection functionality.
   - **Test 1**: Ensure that the short URL redirects to the original URL.

3. **GET `/stats/:shortId`** - Tests the retrieval of usage statistics.
   - **Test 1**: Ensure the API returns the correct usage statistics for a given short URL.

### **Running the Tests**

1. **Install Dependencies**: Make sure you have all the required dependencies installed:

    ```bash
    npm install
    ```

2. **Run the Tests**: Use the following command to run the tests:

    ```bash
    npm test
    ```

### **Sample Test Output**
When the tests pass, you should see an output similar to this:
```bash
PASS  src/tests/urlController.test.js
  POST /shorten
    ✓ should return a shortened URL (50 ms)
    ✓ should return 400 if URL is invalid (30 ms)
  GET /:shortId
    ✓ should redirect to the original URL (40 ms)
  GET /stats/:shortId
    ✓ should return URL statistics (35 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.4s
```

---

## **Docker Setup**

### **Overview**
Dockerizing the URL Shortener API allows you to run the application in an isolated container environment. This is useful for ensuring the app runs consistently across different environments.

### **Prerequisites**
Make sure you have Docker installed on your system. You can install it from [here](https://www.docker.com/get-started).

### **Steps to Dockerize the URL Shortener API**

1. **Create a `Dockerfile`**
   In the root directory of your project, create a file named `Dockerfile`:

    ```Dockerfile
    FROM node:16

    WORKDIR /app

    COPY package*.json ./

    RUN npm install
    
    COPY . .
    
    EXPOSE 3000
    
    CMD ["npm", "start"]
    ```

2. **Create a `.dockerignore` File**
   To avoid copying unnecessary files into the Docker image, create a `.dockerignore` file with the following content:

    ```txt
    node_modules
    npm-debug.log
    ```

3. **Build the Docker Image**

    Once your Dockerfile is ready, you can build the Docker image with the following command:

    ```bash
    docker build -t url-shortener-api .
    ```

4. **Run the Docker Container**

    After the image is built, you can run the container:

    ```bash
    docker run -p 5000:5000 url-shortener-api
    ```

    The application should now be running on `http://localhost:5000` inside the Docker container.

---
