# HandyConnect – Home Services Booking Platform

## Description
**HandyConnect** is a full-stack web platform built using the **MERN stack** that connects users with nearby home service professionals such as plumbers, electricians, carpenters, and painters.  
The platform streamlines service discovery, booking, and management through role-based access for customers and workers, providing a scalable and user-friendly solution for on-demand home services.

## Features
- **User Authentication**
  - Secure signup and login for customers and service providers
  - Role-based access control using JWT

- **Service Booking**
  - Browse available services
  - Book services in real time
  - Track booking status

- **Worker Profiles**
  - Service provider profile creation
  - Upload profile photo and identity proof
  - Manage availability and service details

- **Customer Dashboard**
  - View booked services
  - Manage profile information
  - Track service history

- **Admin / Platform Control**
  - Manage users and service providers
  - Monitor bookings and platform usage

- **Secure Data Storage**
  - User and booking data securely stored in MongoDB
  - Image uploads handled via Cloudinary

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Cloud Services**: Cloudinary (image uploads)
- **API Testing**: Postman

## Getting Started
Follow the steps below to run the project locally.

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas account
- Git installed

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Prescripto-Hospital_Management_System.git
   cd Prescripto-Hospital_Management_System

## Install dependencies

1. **Install admin dependencies**
   ```bash
   cd admin
   npm install
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret


4. **Start Backend server:**
   ```bash
   cd backend
   npm run server
   ```

5. **Start Frontend Panel:**
   ```bash
   cd frontend
   npm run dev
   ```





