# URL Shortener API 
[Postman Documentation Link](https://web.postman.co/workspace/1df59fe9-cafa-4c07-8f65-d125e6cb3142/documentation/30132855-509bdaa1-c39b-41da-8cc4-82b5f5b82cd6)

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
