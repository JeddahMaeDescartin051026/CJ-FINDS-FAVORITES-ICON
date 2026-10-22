// Saves each order request to Firestore so it shows up in CJ Orders.
// Adds window.CJSaveOrder(order); checkout.html calls it next to Web3Forms.
// Only customers with a verified email can save an order (also enforced by firestore.rules).
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app, auth } from "./auth.js";

try {
  var db = getFirestore(app);
  window.CJSaveOrder = async function (order) {
    await auth.authStateReady();
    var user = auth.currentUser;
    if (!user || !user.emailVerified) {
      throw new Error("Please log in and verify your email before ordering.");
    }
    // Make sure the token carries the verified flag (it can lag right after verifying)
    var token = await user.getIdTokenResult();
    if (!token.claims.email_verified) await user.getIdToken(true);

    return addDoc(collection(db, "orders"), {
      uid: user.uid,
      email: user.email,
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
