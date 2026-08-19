type JwtPayload = {
  sub?: string
  exp?: number
}

export const getEmailFromToken = (
  token: string,
): string | null => {
  try {
    const payload = token.split('.')[1]

    if (!payload) {
      return null
    }

    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
    ) as JwtPayload

    return decodedPayload.sub ?? null
  } catch {
    return null
  }
}