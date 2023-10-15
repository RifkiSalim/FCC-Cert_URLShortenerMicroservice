# URL Shortener Microservice API

The URL Shortener Microservice API is a service that allows you to shorten long URLs and provides a way to redirect users to the original URLs by using a short code.

## Tech Stack

- **Express.js**

- **Prisma ORM**

- **Sqlite**

## How it Works

This API can be accessed via HTTP requests to the following endpoints:

- To shorten a URL:

  ```
  POST /api/shorturl
  ```

- To access a shortened URL and get redirected to the original URL:
  ```
  GET /api/shorturl/:short_url
  ```

### Functionality

1. **Shortening URLs**:

   - You can POST a URL to `/api/shorturl` and receive a JSON response with the following properties:
     - `original_url`: The original long URL that you provided.
     - `short_url`: A short code that represents the original URL.

   Example:

   ```
   {
     "original_url": "https://example.com",
     "short_url": 1
   }
   ```

2. **Redirection to Original URL**:

   - When you visit `/api/shorturl/:short_url`, you will be redirected to the original URL associated with that short code.

3. **Invalid URL Handling**:

   - If you pass an invalid URL that doesn't follow the valid url format, the JSON response will contain:
     ```
     { "error": "invalid url" }
     ```

4. **DNS Validation**:
   - URLs are validated via DNS to ensure that they are valid and exist.

## Example Usage

- To shorten a URL:

  - `POST /api/shorturl`
  - Request Body:
    ```
    {
      "url": "https://example.com"
    }
    ```
  - Response (example):
    ```
    {
      "original_url": "https://example.com",
      "short_url": 1
    }
    ```

- To access the original URL:

  - Visit `/api/shorturl/1` (or the appropriate short URL).
  - You will be redirected to the original URL associated with that short code.

- For an invalid URL:
  - `POST /api/shorturl`
  - Request Body:
    ```
    {
      "url": "testing1"
    }
    ```
  - Response:
    ```
    {
      "error": "invalid url"
    }
    ```

## Getting Started

To run this API on your local machine, follow these steps:

1. Clone the repository.
2. Install the required dependencies using npm or yarn.
3. Start the server with your preferred Node.js runtime.
4. Access the API at `http://localhost:3000/api/shorturl`.

## Author

Rifki Salim

## License

This project is open-source and available under the [MIT License](LICENSE.md).
