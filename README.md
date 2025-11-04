
## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ashwinbiju09/technical-assessment.git
cd technical-assessment
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Environment variables (.env)

Create a `.env` file in the backend folder with the following contents:

```bash
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
AWS_ACCESS_KEY_ID=<your_aws_access_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
AWS_REGION=<your_aws_region>
AWS_BUCKET_NAME=<your_bucket_name>
```

Create a `.env` file in the frontend folder as well with the below content:
```bash
VITE_WEATHER_API_KEY=<your_openweathermap_api_key>
```

### 5. Run the backend server

```bash
cd backend
npm run dev
```


### 6. Run the frontend

```bash
cd frontend
npm run dev
```


### 7. Access the app

```bash
Open your browser and go to:  
`http://localhost:5173`
```
---


## Screenshots

### AWS S3 Bucket Setup


![External Image](https://private-user-images.githubusercontent.com/81153696/509292259-ab6bcffa-4d73-4342-9f34-ac829e81fe72.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjIyMjYxNjYsIm5iZiI6MTc2MjIyNTg2NiwicGF0aCI6Ii84MTE1MzY5Ni81MDkyOTIyNTktYWI2YmNmZmEtNGQ3My00MzQyLTlmMzQtYWM4MjllODFmZTcyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTA0VDAzMTEwNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZjZGM3NWQwNzRmN2Y2YTMzYTU2NWJlNzBiNjcyNDEzMzQzM2RhZDQwMDUzZWNhNzE5NTA5ODY4ZDI3ZjUxZTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.7d2OMuTSIzZjCjQvfLvGpPeuxygORECQPm4uuN1Vus8)

![External Image](https://private-user-images.githubusercontent.com/81153696/509293180-44135432-648b-4e44-a621-ad5d71bf46b0.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjIyMjYzODEsIm5iZiI6MTc2MjIyNjA4MSwicGF0aCI6Ii84MTE1MzY5Ni81MDkyOTMxODAtNDQxMzU0MzItNjQ4Yi00ZTQ0LWE2MjEtYWQ1ZDcxYmY0NmIwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTA0VDAzMTQ0MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTM5ZjBkODY5MDAyMThhY2YxNDkzYTAxZjc1NGQ1NDcxNTBmMTdiMDk0MmVmZjNkNzU0Mzg0YTk2OWNhNDY3ZTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Jneyql0ai06_6WjDhSUSNK_-hIfBlgPp62FIbJWAQ48)

![External Image](https://private-user-images.githubusercontent.com/81153696/509293562-303e3be8-b20c-461c-b864-14a2712ff2a9.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjIyMjY0NDMsIm5iZiI6MTc2MjIyNjE0MywicGF0aCI6Ii84MTE1MzY5Ni81MDkyOTM1NjItMzAzZTNiZTgtYjIwYy00NjFjLWI4NjQtMTRhMjcxMmZmMmE5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTA0VDAzMTU0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTk5M2RlY2MzNDFmMDc2OTc5ODc2YzQ4OGFiMDJmYjdkMzU2OTQyNDIyMmU2ZjNkZTVhMTFkODg5YjdmYWZmZmEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.IFV_gmLeWAN21VVqNhgkqhyHrl5OkqtlzCVZI3QO8I8)


### Application Screenshot

![External Image](https://private-user-images.githubusercontent.com/81153696/509295961-55917ed6-8dad-45a3-85b9-c9f0b6d30825.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjIyMjY5MDUsIm5iZiI6MTc2MjIyNjYwNSwicGF0aCI6Ii84MTE1MzY5Ni81MDkyOTU5NjEtNTU5MTdlZDYtOGRhZC00NWEzLTg1YjktYzlmMGI2ZDMwODI1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTExMDQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTA0VDAzMjMyNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTkzNmY2ZDllMjMyMGY3OTgxZWRmY2VkYTk2YzkwNGRhN2IyNDZkYWUyYWU4OTA3M2E2N2UzZDVhOGFkNDViZGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.eaR1B3tbvlkhGnYbgcLaQ3m7PYE1ttbGozHgu3gny6U)
---

## Implementation Details

### Authentication
- JWT-based authentication  
- Protected backend routes: `/api/weather/save` and `/api/weather/history`  
- Dashboard route protected on frontend  

### Weather API Integration
- Uses **OpenWeatherMap API** to fetch current weather data  
- Weather data includes: city, temperature, description, humidity, wind speed  

### MongoDB
- Stores weather data associated with user ID  
- Schema includes: city, temperature, humidity, wind speed, description, screenshot URL  

### AWS S3
- Weather screenshots saved as base64 images  
- Uploaded to a public S3 bucket with CORS enabled for frontend access  

### Frontend
- Built with React + Vite  
- Styled with Tailwind CSS for clean, responsive UI  

---

## Notable Decisions
- Chose **JWT** for simplicity and stateless authentication  
- Used **dom-to-image-more** to capture screenshots. 
- Protected frontend routes with token checks.  
---

## AI Assistance
- Used AI guidance initially for generating unit tests and UI templates.  
- Leveraged AI for AWS S3 setup, screenshot capture, and debugging.   

---

## Thought Process

I started by planning the app structure to ensure a functional, secure, and user-friendly weather application. First, I built the **login and signup UI** using React (Vite) and Tailwind CSS, leveraging AI-generated templates for speed while customizing them for real functionality.  

Next, I implemented **backend authentication** with Node.js, Express, MongoDB, and JWT, adding middleware to protect routes. Then, I developed the **dashboard** and integrated the **OpenWeatherMap API** to fetch live weather data.  

I implemented saving functionality to **store metadata in MongoDB** and **upload screenshots to AWS S3** using `dom-to-image-more`. Routes were protected, and the dashboard refreshes automatically after saving new entries.  

Due to time constraints, I couldn’t fully implement testing or integrate CI via GitHub Actions, as I prioritized completing the core functionality on time. API endpoints were tested using Postman, and other UI components and functionalities were verified manually to ensure correct behavior.


And yes, I accidentally pushed the `.env` file once 😅— nothing to worry, fixed it.




---
