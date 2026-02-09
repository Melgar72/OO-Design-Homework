export function spinWords(words: string): string {
  let finalString: string = ""
  let wordArr: string[] = words.split(" ");
  for (let word of wordArr){
    if (word.length > 4){
      finalString += word.split('').reverse().join('');
    } else {
      finalString += word;
    }
    finalString += " ";
  }
  
  return finalString.trim();
}