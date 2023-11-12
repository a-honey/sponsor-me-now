export const createUploadUrl = async (imageUrl: string): Promise<string> => {
  const webFriendlyUrl: string = imageUrl.replace(/\\/g, "/");

  const serverUrl: string = (process.env.SERVER_URL || "").replace(/\/$/, "");

  return `${serverUrl}${webFriendlyUrl.startsWith("/") ? "" : "/"}${webFriendlyUrl}`;
};
