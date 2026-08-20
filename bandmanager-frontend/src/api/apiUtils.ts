export const handleApiResponse = async (
  response: Response,
): Promise<void> => {
  if (response.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }

  if (response.status === 403) {
    throw new Error(
      'You do not have permission to perform this action',
    )
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`

    try {
      const errorData = await response.json()

      if (typeof errorData.message === 'string') {
        message = errorData.message
      }
    } catch {
      // Keep the fallback message
    }

    throw new Error(message)
  }
}