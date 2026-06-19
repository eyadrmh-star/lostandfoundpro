// firebase-auth.js
// تسجيل الدخول والخروج - Lost & Found Pro

// تسجيل دخول
async function firebaseLogin(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.error("Login error:", error.message);
    return false;
  }
}

// تسجيل مستخدم جديد
async function firebaseRegister(name, email, password) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName: name });
    await db.collection("users").doc(result.user.uid).set({
      name: name,
      email: email,
      role: "user",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Register error:", error.message);
    return false;
  }
}

// تسجيل منظمة
async function firebaseRegisterOrg(orgName, orgType, email, phone, password) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName: orgName });
    await db.collection("organizations").doc(result.user.uid).set({
      orgName: orgName,
      orgType: orgType,
      email: email,
      phone: phone,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Org register error:", error.message);
    return false;
  }
}

// تسجيل خروج
async function firebaseLogout() {
  await auth.signOut();
}

// مراقبة حالة المستخدم
auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log("✅ مستخدم مسجل:", user.email);
  } else {
    console.log("👋 لا يوجد مستخدم");
  }
});
// تسجيل دخول بـ Google (للجوال)
async function firebaseGoogleLogin() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    // استخدم redirect بدل popup للجوال
    await auth.signInWithRedirect(provider);
  } catch (error) {
    console.error("Google login error:", error.message);
  }
}

// معالجة نتيجة redirect
auth.getRedirectResult().then(function(result) {
  if (result.user) {
    console.log("✅ Google login:", result.user.email);
    db.collection("users").doc(result.user.uid).set({
      name: result.user.displayName || result.user.email,
      email: result.user.email,
      role: "user",
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }
}).catch(function(error) {
  console.error("Redirect error:", error.message);
});