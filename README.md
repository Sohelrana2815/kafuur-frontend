# Kafuur — E-commerce Frontend

Kafuur is a modern e-commerce platform focused on helping customers discover and purchase premium fragrances through a fast, responsive, and intuitive shopping experience.

This repository contains the **frontend application** of Kafuur. It is built with **Next.js** and communicates with the Kafuur backend API for authentication, product management, cart operations, checkout, orders, payments, and other business operations.

## Overview

Kafuur is designed to provide a seamless online shopping experience for customers while offering a role-based dashboard for managing the platform.

The application supports two primary user roles:

* **CUSTOMER** — Browse products, manage cart items, place orders, manage payments, and update account information.
* **ADMIN** — Manage users, products, and orders through a dedicated administrative dashboard.

The frontend and backend are maintained as **separate repositories** and communicate through a REST API.

## Features

### Customer Features

* Browse premium fragrance products
* Search products
* Filter and sort products
* View detailed product information
* Add products to cart
* Increase or decrease cart item quantities
* Remove products from cart
* Select cart items for checkout
* View order summary
* Complete checkout
* Choose between:

  * Cash on Delivery (COD)
  * Online Payment
* View and manage personal orders (Currently Developing)
* View order details 
* Update profile information
* Responsive design across desktop, tablet, and mobile devices

### Admin Features

* Role-based administrative dashboard
* Manage all users 
* Manage products
* Manage orders (Currently Developing 40% already done.)
* View order details
* Update order information and status (Currently Developing)
* Monitor platform operations from a centralized dashboard

## Technology Stack

| Technology         | Purpose                                 |
| ------------------ | --------------------------------------- |
| **Next.js 16.2.7** | React framework and application routing |
| **React**          | Building interactive user interfaces    |
| **TypeScript**     | Type-safe development                   |
| **Tailwind CSS**   | Utility-first styling                   |
| **shadcn/ui**      | Reusable UI components                  |
| **Lucide React**   | Icons                                   |
| **REST API**       | Communication with the backend          |

## Architecture

The frontend follows a **modular architecture** to keep features organized, maintainable, and scalable.

```text
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── (shop)/
│   └── ...
│
├── components/
│   ├── shared/
│   ├── ui/
│   └── ...
│
├── modules/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   ├── users/
│   └── ...
│
├── actions/
│   └── ...
│
├── services/
│   └── ...
│
├── types/
│   └── ...
│
├── lib/
│   └── ...
│
└── ...
```

### Architectural Responsibilities

**`app/`**
Contains application routes, layouts, pages, loading states, and route-specific UI.

**`components/`**
Contains reusable UI and shared application components.

**`modules/`**
Organizes feature-specific components and logic into independent modules.

**`services/`**
Contains server actions and server-side application operations.

**`services/`**
Handles communication with the backend API and application-level service functions.

**`types/`**
Contains shared TypeScript interfaces, types, and application contracts.

**`lib/`**
Contains reusable utilities, configurations, helpers, and library-specific logic.

## Environment Variables

Create a `.env.local` file in the root directory.

```env
BACKEND_API_URL=""

ADMIN_EMAIL=""
ADMIN_PASSWORD=""

JWT_ACCESS_SECRET=""
```

> Never commit your `.env.local` file or expose sensitive credentials in the repository.

### Environment Variable Description

| Variable            | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `BACKEND_API_URL`   | Base URL of the Kafuur backend API                         |
| `ADMIN_EMAIL`       | Admin account email used by the frontend where required    |
| `ADMIN_PASSWORD`    | Admin account password used by the frontend where required |
| `JWT_ACCESS_SECRET` | Secret used for JWT-related authentication functionality   |

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* pnpm
* Git

### 1. Clone the Repository

```bash
git clone <FRONTEND_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd kafuur-frontend
```

### 2. Install Dependencies

Using pnpm:

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```bash
touch .env.local
```

Then add the required environment variables:

```env
BACKEND_API_URL=""

ADMIN_EMAIL=""
ADMIN_PASSWORD=""

JWT_ACCESS_SECRET=""
```

### 4. Start the Development Server

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

## Available Scripts

```bash
pnpm dev
```

Starts the development server.

```bash
pnpm build
```

Creates an optimized production build.

```bash
pnpm start
```

Starts the application in production mode.

```bash
pnpm lint
```

Runs the project's linting checks.

## Backend Dependency

This frontend application depends on the **Kafuur Backend API**.

The backend handles server-side business logic including:

* Authentication and authorization
* User management
* Product management
* Cart operations
* Order processing
* Payment processing
* Database operations
* Administrative functionality

The frontend communicates with the backend through its configured API URL.

### Backend Repository

**Kafuur Backend:**
[Backend Repository]([BACKEND_REPOSITORY_URL](https://github.com/Sohelrana2815/kafuur-backend)])

## Repository Structure

Kafuur is maintained using separate repositories:

```text
Kafuur
│
├── Frontend Repository
│   ├── Next.js
│   ├── React
│   ├── TypeScript
│   └── Tailwind CSS
│
└── Backend Repository
    ├── REST API
    ├── Business Logic
    ├── Database
    └── Authentication
```

### Related Repository

* **Frontend:** This repository
* **Backend:** [Kafuur Backend Repository](https://github.com/Sohelrana2815/kafuur-backend)

## Authentication & Authorization

Kafuur uses authentication and role-based authorization to provide different experiences for customers and administrators.

### User and Admin

Authenticated customers can:

* Manage their profile
* Browse products
* Manage their cart
* Place orders
* View their orders

### Admin

Administrators have access to protected dashboard functionality for:

* User management
* Product management
* Order management

## Payment Methods

Kafuur supports two checkout payment methods:

### Cash on Delivery

Customers can place an order and pay when the order is delivered.

### Online Payment (Stripe)

Customers can complete payment through the integrated online payment flow.

Payment processing and verification are handled through the backend API.

## Responsive Design

The frontend is designed to provide a consistent shopping experience across:

* Desktop
* Tablet
* Mobile devices

The UI is built using **Tailwind CSS** and reusable **shadcn/ui** components.

## Development Philosophy

The project follows a modular and maintainable approach with an emphasis on:

* Type-safe development
* Reusable components
* Separation of concerns
* Server/client responsibility boundaries
* Modular feature organization
* Maintainable API communication
* Responsive UI development
* Role-based application behavior

## Future Improvements

Planned improvements may include:

* Personalized fragrance recommendations
* Advanced product discovery
* AI-assisted fragrance recommendations
* Enhanced product filtering
* Customer reviews and ratings
* Improved analytics dashboards
* Additional payment methods

## Live Demo

**Frontend:** `https://kafuur.vercel.app`

**Backend API:** `https://kafuur-backend.vercel.app`


## Author

**MD. Sohel Rana Moon**

GitHub: `https://github.com/Sohelrana2815`
