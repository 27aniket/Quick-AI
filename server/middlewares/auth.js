import { getAuth } from '@clerk/express';
import { clerkClient } from '@clerk/express';

export const auth = async (req, res, next) => {
  try {
    const { userId, sessionId, getToken, has } = getAuth(req);  

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const hasPremiumPlan = await has({ plan: 'premium' });  

    const user = await clerkClient.users.getUser(userId);

    if (!hasPremiumPlan && user.privateMetadata?.free_usage !== undefined) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? 'premium' : 'free';
    req.userId = userId; 
    next();
  } catch (error) {
    
    return res.status(500).json({ success: false, message: error.message });
  }
};
