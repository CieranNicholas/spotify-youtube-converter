import axios from "axios";

export const isGoogleAccessTokenValid = async (
  access_token: string
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let result = "";
  if (hours > 0) result += `${hours}hr `;
  if (minutes > 0) result += `${minutes} min`;
  if (hours === 0) result += ` ${seconds} sec`;

  return result.trim();
}
