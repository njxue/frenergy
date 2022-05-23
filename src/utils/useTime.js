export function useTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hour = today.getHours();
    const min = today.getMinutes();
  
    return `${date}/${month}/${year}, ${hour}:${min}`;
  }
  