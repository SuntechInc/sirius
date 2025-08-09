export type RefreshTokenResponse = {
  accessToken: string;
  expiresIn: number;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

/**
 * Refresh the access token using the refresh token
 * @param refreshToken - The refresh token to use
 * @returns Promise with new access token and expiration
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          errorData.error ||
          `Refresh failed with status: ${response.status}`
      );
    }

    const data: RefreshTokenResponse = await response.json();

    if (!data.accessToken || !data.expiresIn) {
      throw new Error("Invalid refresh response: missing required fields");
    }

    return data;
  } catch (error) {
    // Log error for debugging
    console.error("Refresh token service error:", error);

    // Re-throw with a consistent error format
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unknown error occurred during token refresh");
  }
}

/**
 * Validate if a refresh token request/response has required fields
 */
export function validateRefreshTokenData(
  data: unknown
): data is RefreshTokenResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "accessToken" in data &&
    "expiresIn" in data &&
    typeof (data as RefreshTokenResponse).accessToken === "string" &&
    typeof (data as RefreshTokenResponse).expiresIn === "number"
  );
}
