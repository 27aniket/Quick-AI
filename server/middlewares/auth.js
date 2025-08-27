import { getAuth, clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId, sessionId } = getAuth(req);

    if (!userId || !sessionId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch user and session from Clerk
    const user = await clerkClient.users.getUser(userId);
    const session = await clerkClient.sessions.getSession(sessionId);

    // 🔍 Debug logs
    console.log("=== Clerk Debug ===");
    console.log("user.privateMetadata:", user.privateMetadata);
    console.log("session.claims:", session?.claims);

    // ✅ Premium check
    const hasPremiumPlan =
      user.privateMetadata?.plan === "premium" ||
      (session?.claims?.pla && session.claims.pla.includes("premium"));

    console.log("hasPremiumPlan:", hasPremiumPlan);

    if (hasPremiumPlan) {
      // 🚀 Premium user → skip free quota check
      req.plan = "premium";
      req.free_usage = null;
      req.userId = userId;
      return next();
    }

    // 🆓 Free user → apply usage limits
    const freeUsage = user.privateMetadata?.free_usage ?? 3; // default 3
    console.log("freeUsage remaining:", freeUsage);

    if (freeUsage > 0) {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: freeUsage - 1 },
      });
      req.free_usage = freeUsage - 1;
      req.plan = "free";
      req.userId = userId;
      return next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Free quota exhausted, upgrade to premium",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
