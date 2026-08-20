export const handleApiResponse = async (
  response: Response,
): Promise<void> => {
  if (response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}`,
    )
  }
}