# **Health Log Web App**

A modern, secure, and user-friendly **Personal Health Record (PHR)** system built with React.
This project helps users store, manage, and access their essential medical information in one place, safely and conveniently.

---

## 🚀 **Project Overview/Summary**

The Health Log web app allows users to:

- Upload medical documents from different hospitals and clinics
- Store key health information such as allergies, medications and conditions
- View all their uploads and entries on a **unified chronological timeline**
- Access quick critical info through a **dashboard-style overview**
- Manage their health data securely with user authentication (localStorage)

The goal is to provide a simple digital solution for people who often lose track of scattered medical documents and need a unified place to manage them.

---

## 🎯 **Features**

### 🔐 **User Authentication**

- Secure login and signup
- Basic session handling

### 📄 **Secure Document Upload**

- Upload PDFs, images, or medical documents
- Drag-and-drop upload support

### 📝 **Manual Medical Data Entry**

- Add details such as:

  - Medications
  - Conditions
  - Allergies
  - Doctor visits

- Tag uploaded documents to each record

### 🗂️ **Unified Chronological Timeline**

- Displays all data entries and documents in a single timeline view
- Sorted by date for easy tracking

### ⚠️ **Critical Information Dashboard**

Shows essential health information at a glance:

- Allergies
- Emergency contacts
- Current medications

---

## 🛠️ **Tech Stack**

- **React (Vite)**
- **CSS**
- **React Router** (for navigation)
- **LocalStorage** (for MVP data persistence)
- **Context API** (for state management)

---

## 🧪 **How to Run Locally**

```bash
# Clone the repository
git clone https://github.com/abnakore/eHA-capstone-project.git

# Navigate into project
cd eHA-capstone-project

# Install dependencies
npm install

# Start development server
npm run dev
```

---

### Test Login Instructions

This project uses localStorage for saving user accounts.  
Because of this, each reviewer needs to create their own login.

1. Click “New User? Sign Up” on the login page.
2. Create a new account.
3. Your account will be stored in your browser using localStorage.
4. After signup, you can log in anytime with the same details.

No pre-created test account is required.

---

## 🌐 **Live Demo**

🔗 *https://myhealthlog.netlify.app/*

---

## 🔮 **Future Improvements**

- Full backend integration
- Role-based access (e.g., giving doctors temporary access)
- Multi-language support
- Mobile app

---

## 🤝 **Contributing**

Contributions, issues, and feature requests are welcome.
Feel free to fork the repo and submit a pull request.

---

## 🙏 Acknowledgements
This project was developed as part of the eHealth Africa React Training Program.  
The UI design and color inspiration were derived from eHealth Africa’s branding style to maintain a clean, health-focused user experience.

---

## 📄 **License**

This project is open-source and available for educational use.
