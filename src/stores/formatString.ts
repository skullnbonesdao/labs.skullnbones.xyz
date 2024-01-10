export function u8Array2String(array: [] | undefined) {
  if (array)
    return array
      .filter((byte) => byte !== 0)
      .map((byte) => String.fromCharCode(byte))
      .join("");
}

export function getJoinedElements(row: any, n: number): string {
  if (row) {
    // Convert the uint array to string
    const convertedString = u8Array2String(row.data._data.name);

    // Split the string into an array of words, then take the first n elements and join them back into a string
    return convertedString.split(" ").slice(0, n).join(" ");
  }
}

export function factionType2String(type: number) {
  switch (type) {
    case 1:
      return "MUD";
    case 2:
      return "ONI";
    case 3:
      return "UST";
  }
}
