export async function createSegment(formData) {
  return new Promise((resolve, reject) => {
    // need to make api call here
    resolve(formData);
  });
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
