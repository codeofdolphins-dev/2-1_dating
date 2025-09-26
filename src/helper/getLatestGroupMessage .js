import httpService from "./httpService";

// ✅ Get latest group message by groupId
export const getLatestGroupMessage = async (groupId) => {
  try {
    if (!groupId) throw new Error("GroupId is required");

    // Call API
    const response = await httpService(`/group-messages/${groupId}`, "GET");

    // Assuming response.data contains an array of messages
    const messages = response?.data || [];

    if (!messages.length) return null;

    // Return the latest (last) message
    return messages[messages.length - 1];
  } catch (error) {
    console.error("❌ Failed to fetch latest group message:", error);
    return null;
  }
};
