import { jwtDecode } from "jwt-decode";

export function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp > now; // Check if the token is still valid
  } catch (error) {
    return false; // If decoding fails, consider the token invalid
  }
}
