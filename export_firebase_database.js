import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyDHup4M5P3z-fy9fVRElBx0hutREWZGSAM",
  authDomain: "anandhavruksham-3aa36.firebaseapp.com",
  projectId: "anandhavruksham-3aa36"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function exportData() {
    const collections = ["course", "students", "payments", "login"]; // your collections
    let exportData = {};

    for (let col of collections) {
        const snapshot = await getDocs(collection(db, col));
        exportData[col] = [];

        snapshot.forEach(doc => {
            exportData[col].push({
                id: doc.id,
                ...doc.data()
            });
        });
    }

    console.log(exportData);

    // download as JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "firebase-export.json";
    a.click();
}

exportData();
