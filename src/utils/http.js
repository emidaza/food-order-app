export async function postOrder(jsonData) {
  const res = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  });
  const response = await res.json();
  if (res.status !== 201) throw new Error(response.message);

  return response;
}
