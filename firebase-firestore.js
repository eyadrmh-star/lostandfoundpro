// firebase-firestore.js
// قاعدة البيانات - Lost & Found Pro

async function firebaseSaveLost(data) {
  try {
    const user = auth.currentUser;
    if (!user) return false;
    
    await db.collection("reports").add({
      type: "lost",
      userId: user.uid,
      desc: data.desc || "",
      city: data.city || "",
      date: data.date || "",
      name: data.name || "",
      phone: data.phone || "",
      lat: data.lat || null,
      lng: data.lng || null,
      images: data.images || [],
      status: "open",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Save lost error:", error.message);
    return false;
  }
}
// حفظ بلاغ موجود
async function firebaseSaveFound(data) {
  try {
    const user = auth.currentUser;
    if (!user) return false;
    
    await db.collection("reports").add({
      type: "found",
      userId: user.uid,
      desc: data.desc,
      city: data.city,
      date: data.date,
      name: data.name,
      phone: data.phone || "",
      lat: data.lat || null,
      lng: data.lng || null,
      images: data.images || [],
      status: "open",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Save found error:", error.message);
    return false;
  }
}

// جلب كل البلاغات المفقودة
async function firebaseGetLost() {
  try {
    const snapshot = await db.collection("reports")
      .where("type", "==", "lost")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();
    
    const items = [];
    snapshot.forEach(function(doc) {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error("Get lost error:", error.message);
    return [];
  }
}

// جلب كل البلاغات الموجودة
async function firebaseGetFound() {
  try {
    const snapshot = await db.collection("reports")
      .where("type", "==", "found")
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();
    
    const items = [];
    snapshot.forEach(function(doc) {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error("Get found error:", error.message);
    return [];
  }
}

// تحديث حالة بلاغ
async function firebaseUpdateStatus(reportId, newStatus) {
  try {
    await db.collection("reports").doc(reportId).update({
      status: newStatus
    });
    return true;
  } catch (error) {
    console.error("Update status error:", error.message);
    return false;
  }
}

// حذف بلاغ
async function firebaseDeleteReport(reportId) {
  try {
    await db.collection("reports").doc(reportId).delete();
    return true;
  } catch (error) {
    console.error("Delete error:", error.message);
    return false;
  }
}

// جلب إحصائيات
async function firebaseGetStats() {
  try {
    const lostSnapshot = await db.collection("reports").where("type", "==", "lost").get();
    const foundSnapshot = await db.collection("reports").where("type", "==", "found").get();
    
    return {
      lostCount: lostSnapshot.size,
      foundCount: foundSnapshot.size
    };
  } catch (error) {
    console.error("Stats error:", error.message);
    return { lostCount: 0, foundCount: 0 };
  }
}

console.log("✅ Firestore جاهز");