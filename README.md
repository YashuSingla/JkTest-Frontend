# JkTestYashu

This project is a social post management application built with Angular. It includes features such as user authentication, post creation, post listing, and post detail views. The application uses Jest for unit testing and TailwindCSS for styling.

## Table of Contents

- [Features](#features)
- Authentication Flow & Token Usage
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Development Server](#development-server)
- [Building the Project](#building-the-project)
- [Running Tests](#running-tests)
- [Environment Configuration](#environment-configuration)
- [Technologies Used](#technologies-used)
- [Future Scopes](#future-scopes)
- [License](#license)

---

 ## Features

- **Authentication**: Google Sign-In and token-based authentication.
- **Post Management**:
  - Create new posts.
  - View a list of posts.
  - View detailed information about a specific post.
  - View your own posts via a protected route.
- **Unit Testing**: Comprehensive unit tests using Jest.
- **Lazy Loading**: Routes are lazy-loaded for better performance.
- **Token Handling**: JWT token is securely stored and used for accessing protected backend APIs.

---

## Authentication Flow & Token Usage

- **Google Sign-In Integration**:
  - The application uses `@abacritt/angularx-social-login` for seamless Google authentication.
  - On successful login, Google returns an `id_token`.

- **Token Transmission to Backend**:
  - The `id_token` is sent to the backend via a Post request to `/auth/google`.
  - The backend validates the Google token, extracts user data, and returns a JWT token.

- **JWT Token Storage**:
  - The frontend stores the returned JWT token securely in `localStorage`.

- **Using JWT in Protected Requests**:
  - All secure API calls (e.g., `GET /posts/my-posts`, `POST /posts`) include the token in the `Authorization` header as:
    ```
    Authorization: Bearer <JWT_TOKEN>
    ```

- **Fetching Posts**:
  - `GET /posts`: Public, fetches all posts.
  - `GET /posts/:id`: Public, fetches a single post by its ID.
  - `GET /posts/my-posts`: Protected, returns posts created by the authenticated user.
  - `POST /posts`: Protected, creates a new post linked to the authenticated user.
  - `PUT /posts/:id` and `DELETE /posts/:id`: Protected, available only for the owner of the post.

- **Token Attachment**:
  - An HTTP interceptor is used to automatically append the JWT token to outgoing requests if the user is logged in.

- **Debugging & Logging**:
  - Upon login, user details and token are logged to the console in development mode.
  - Failed requests (e.g., expired token) trigger logout or redirection to the login page.

---

## Project Structure

The project follows a modular structure for scalability and maintainability:

```
src/
├── app/
│   ├── core/                # Core services, guards, and interceptors
│   ├── features/            # Feature modules (e.g., posts, auth)
│   ├── common/              # Shared components (e.g., logout button)
│   ├── app.component.*      # Root component
│   ├── app.routes.ts        # Application routes
│   └── app.config.ts        # Application configuration
├── environments/            # Environment-specific configurations
├── styles.scss              # Global styles
├── main.ts                  # Application bootstrap
└── index.html               # Application entry point
```

---

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up TailwindCSS**:
   Initialize TailwindCSS if not already configured:
   ```bash
   npm run tailwind:init
   ```

4. **Environment Variables**:
   Update the `src/environments/environment.ts` file with your API base URL and authentication keys:
   ```ts
   export const environment = {
       production: false,
       apiBaseUrl: 'http://localhost:3000',
       googleClientId: 'your-google-client-id',
       facebookAppId: 'your-facebook-app-id',
   };
   ```

---

## Development Server

To start the development server, run:

```bash
npm start
```

The application will be available at `http://localhost:4200/`. The server will automatically reload when you make changes to the source files.

---

## Building the Project

To build the project for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. The production build is optimized for performance.

---

## Running Tests

### Unit Tests

Run unit tests using Jest:

```bash
npm test
```

### Test Coverage

To generate a test coverage report, use:

```bash
npm test -- --coverage
```

The coverage report will be available in the `coverage/` directory.

---

## Environment Configuration

The project uses environment-specific configurations located in the `src/environments/` directory. Update the `environment.ts` and `environment.prod.ts` files as needed.

---

## Technologies Used

- **Angular**: Framework for building the application.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Jest**: Testing framework for unit tests.
- **RxJS**: Reactive programming library for handling asynchronous data streams.
- **Zone.js**: Angular's execution context for change detection.
- **TypeScript**: Superset of JavaScript for type safety.

---

## Future Scopes

- **Role-Based Access Control (RBAC)**:
  - Implement user roles such as admin, editor, and viewer.
  - Restrict access to certain features based on roles.

- **Social Media Integration**:
  - Allow users to share posts directly to social media platforms like Facebook, Twitter, and LinkedIn.

- **Real-Time Notifications**:
  - Add WebSocket or Firebase-based real-time notifications for user interactions.

- **Resposivness**:
  - Implement styles for responsivness.

- **Enhanced Analytics**:
  - Provide detailed analytics for user engagement and post performance.

- **Dark Mode**:
  - Add a toggle for light and dark themes to improve user experience.

- **Mobile App**:
  - Extend the project to a mobile app using frameworks like Ionic or React Native.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.