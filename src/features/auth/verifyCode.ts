const verifyCode = async (email: string, code: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/codeCheck`, {
    method: "POST",
    body: JSON.stringify({
      email,
      code,
    }),
  });

  if (!res.ok) {
    throw new Error("Fetch error");
  }

  const data = await res.json();

  if (!data.ok) {
    throw new Error("Code verification failed");
  }

  return data;
};

export default verifyCode;
