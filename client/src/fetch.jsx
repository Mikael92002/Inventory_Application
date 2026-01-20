export async function getAllData() {
  try {
    const response = await fetch(`/api`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error(err);
  }
}
