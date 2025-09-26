import httpService from "./httpService";

// ✅ Get latest group message by groupId
export const getUsersLatstMessage = async (userId) => {
  try {
    if (!userId) throw new Error("userId is required");

    // Call API
    const response = await httpService(`/personal-messages/conversations/${userId}`, "GET");

    // Assuming response.data contains an array of messages
    const messages = response?.data || [];

    console.log("vvvv",messages)

    if (!messages.length) return null;

    // Return the latest (last) message
    return messages[messages.length - 1];
  } catch (error) {
    console.error("❌ Failed to fetch latest group message:", error);
    return null;
  }
};
