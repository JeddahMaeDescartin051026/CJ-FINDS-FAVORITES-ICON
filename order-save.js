// Saves each order request to Firestore so it shows up in CJ Orders.
// Adds window.CJSaveOrder(order); checkout.html calls it next to Web3Forms.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

try {
  var db = getFirestore(initializeApp(firebaseConfig));
  window.CJSaveOrder = function (order) {
    return addDoc(collection(db, "orders"), {
      name: order.name,
      phone: order.phone,
      social: order.social,
      address: order.address,
      items: order.items,
      total: order.total,
      status: "NOT COMPLETED",
      note: "",
      createdAt: serverTimestamp()
    });
  };
} catch (e) {
  console.error("CJ Orders connection is not set up yet.", e);
}
