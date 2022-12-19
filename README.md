# Login-Signup-Form-Firebase

- This app consists of total 4 webpages i.e. (Login page, Register Page, Form/Home Page, Profile Page).
- For the frontend, I have used React.js with Tailwind CSS, react-icons, react-router-dom for navigating between the pages and react-toastify for notification pop-ups.
- For the backend (authentication and database), I have used Firebase Authentication(google auth provider, github auth provider and email & password auth) and Firebase Firestore for storing the details of the user & storage for storing the profile pictures of the user.

## Functionalities

- When user go to the website, user will be redirected to login page first where user can login if have account registered or if not user can go to the registeration page where user can create his/her account. User can also login or register either using Google Account or Github Account.
- Once a user get registered or logged in, user will be redirected to the home page(form page) where he/she can fill the form to create their profile. Here the submit button is disabled until the user uploads his/her profile picture. Once the user fills all the details and uploads the picture, a notification pops with "profile picture uploaded successfully" and button becomes enabled. Once the user click on it all the data gets stored in the firebase firestore and a custom modal shows up displaying message "Congratulations username, You have successfully submitted the form and will be directed to the profile page" and then user will be navigated to the profile page.
- State of the app is managed using react-firebase-hooks so only if user is logged in then only the home page and profile page is accessible or else will be redirected to login page.
- All components and pages are responsive i.e. works well on all the devices.
- Form Validation and error handling is implemented i.e. you can only submit the form if all the input fields are filled, validate whether the email is registered or not, whether the password is correct or not. If any error occured during storing data or authentication it will be displayed using notification pop-ups.

## Test Credentials
- Name - Unknown 
- Email - unknown@gmail.com
- Password - unknown@123
- First Name - Unknown
- Last Name - Sharma
- Profession - Student
- Age - 25
- Address - Haridwar
- Profile - Upload any random image to test

## Login Page

#### Laptop Screen
---
![IMG_20221219_105300](https://user-images.githubusercontent.com/100989693/208362963-9786fb9f-f229-4b35-b8b1-d11bd81cec46.png)

#### Nest Hub Screen
---
![Screenshot (144)](https://user-images.githubusercontent.com/100989693/208364002-285d1563-92e6-4fd1-ab2d-a8ddc4d3673a.png)

#### Pixel 5 Mobile Screen
---
![IMG_20221219_120943](https://user-images.githubusercontent.com/100989693/208364333-50a70031-2731-49bd-9ecc-c0b47e38c960.png)

## Register Page

#### Laptop Screen
---
![IMG_20221219_105245](https://user-images.githubusercontent.com/100989693/208365175-1b1e91d8-d467-45e0-9050-03faebcd841e.png)

#### Nest Hub Screen
---
![Screenshot (143)](https://user-images.githubusercontent.com/100989693/208364917-03deaab6-55e4-4bcc-85da-c540e23dc325.png)

#### Pixel 5 Mobile Screen
---
![IMG_20221219_120918](https://user-images.githubusercontent.com/100989693/208365004-83a48c67-412b-4a9e-8e4f-10b4be296367.png)

## Home Page (Form Page)

#### Laptop Screen
---
![IMG_20221219_105409](https://user-images.githubusercontent.com/100989693/208366388-b07260a4-7a62-4a22-9929-e1f3da8df6ff.png)

#### Nest Hub Screen
---

![IMG_20221219_104517](https://user-images.githubusercontent.com/100989693/208366507-222872c6-c5a0-401c-9c65-5a63d3e990a8.png)

#### Pixel 5 Mobile Screen
---
![IMG_20221219_104758](https://user-images.githubusercontent.com/100989693/208366224-4efaa8bb-1ff4-404a-bd45-7f246a310146.png)

## Profile Page

#### Laptop Screen
---
![Screenshot (146)](https://user-images.githubusercontent.com/100989693/208367311-760330ce-0ddc-43a2-a92f-fc0f316c4124.png)

#### Nest Hub Screen
---
![IMG_20221219_105809](https://user-images.githubusercontent.com/100989693/208367082-5ed053ea-0ee8-4f27-a20d-8c0acc391983.png)

#### Pixel 5 Mobile Screen
---
![IMG_20221219_105024](https://user-images.githubusercontent.com/100989693/208366777-ef33b9ca-19ff-4f36-826c-9de511456fae.png)

## Modal and Notification Pop-ups

![IMG_20221219_105710](https://user-images.githubusercontent.com/100989693/208367733-e4599a4d-8132-4f19-bcd9-68f9d9ecd760.png)
![IMG_20221219_105651](https://user-images.githubusercontent.com/100989693/208368084-fb8b7524-9b43-44f4-9c95-8faa08861b8b.png)
![IMG_20221219_105528](https://user-images.githubusercontent.com/100989693/208368008-b69878c4-109c-4a8e-8384-932ff8d1926d.png)
![IMG_20221219_105739](https://user-images.githubusercontent.com/100989693/208367809-3877d8fb-1fdd-4ce3-b87d-fbe698618f0f.png)
![IMG_20221219_104921](https://user-images.githubusercontent.com/100989693/208367882-65df5386-17d3-4bba-8cd9-b428c580f1c8.png)

