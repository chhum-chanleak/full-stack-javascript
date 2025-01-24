# working-with-apis

1. APIs
  APIs (Application Programming Interfaces) are often accessed via URLs (Uniform Resource Locators). In this context, an API is a set of rules and protocols that allow one software application to interact with another.

  APIs act as the connection (interface or bridge) between clients and servers.

  An API "endpoint" is a specific path (URL) where a client can send requests to access resources from a server. You can picture an API as a bridge and an 'endpoint' is the end of the bridge.
  Example: GET https://api.example.com/users/123  (endpoint)

2. Fetching data
  fetch() is used for HTTP request.

  Example: 
  <!-- 
    fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=key_value'
    )
    .then(result => console.log(result))
    .catch(error => console.log(error));
  -->

  The Response object in TypeScript (from fetch()) is closely related to a URL, but it does not represent a URL itself. Instead, it represents the HTTP response received from a request to a URL.

  The URL object in TypeScript provides a powerful way to parse, construct, and manipulate URLs.

  The Request object typically provides information about the HTTP request, such as parameters, body, headers, and more.
  In the context of web development, request objects are typically created by the client-side when making HTTP requests to a server.

3. CORS (Cross-Origin Resource Sharing)

  CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to prevent potentially malicious websites from making unauthorized requests to a different domain (or origin) than the one from which the website was loaded.

  What is Cross-Origin?
  Origin refers to the combination of the protocol (http or https), domain (example.com), and port (if specified).
  Cross-Origin means trying to access a resource (like an API or an image) from a different origin than the one your application is running on.

  For example:
  Origin 1: https://yourwebsite.com
  Origin 2: https://api.example.com
  If https://yourwebsite.com tries to make a request to https://api.example.com, it is considered a cross-origin request.

  Why CORS?
  CORS is implemented to protect users from Cross-Site Request Forgery (CSRF) and Cross-Site Scripting (XSS) attacks, which are ways malicious websites could trick browsers into making unauthorized requests on behalf of the user.

  How does CORS work?
  When a web application (running on Origin A) makes a request to a resource on a different origin (Origin B), the browser will send a 'preflight' request (HTTP OPTIONS request) to the target server. The server will respond with headers indicating whether the actual request is allowed.