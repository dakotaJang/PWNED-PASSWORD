import { get } from 'https';

/**
 * https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange
 * @param query first five characters of the sha1 hashed password
 */
export const requestPasswordRange = (query: string): Promise<{hash: string, count: number}[]> => new Promise((resolve) => {
  get(`https://api.pwnedpasswords.com/range/${query}`, res => {
    let payload = '';
    res.on('data', (data) => payload += data);
    res.on('end', () => {
      resolve(payload.split('\n').map(row => {
        const data = row.split(':');
        return {
          hash: data[0],
          count: Number(data[1]),
        }
      }))
    })
  })
});
